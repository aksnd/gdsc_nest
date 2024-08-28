import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { NotFound, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { CreateDictDto } from './dto/req/createDict.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class DictService {
  s3Client: S3Client;

  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      },
    });
  }

  async getDictData(userId: string) {
    return this.prisma.mountain.findMany({
      include: {
        conquerInfo: {
          where: {
            userId: userId,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async create(
    file: Express.Multer.File,
    { userId, mountainId }: CreateDictDto,
  ) {
    const fileName: string = `${mountainId}_${userId}_${Date.now()}.jpg`;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: `image/jpg`,
    });
    await this.s3Client.send(command);
    const imageLink: string = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    return this.prisma.conquerInfo
      .upsert({
        where: {
          userId_mountainId: {
            userId,
            mountainId,
          },
        },
        create: {
          userId,
          mountainId,
          imageLink,
        },
        update: {
          userId,
          mountainId,
          imageLink,
        },
      })
      .catch((err) => {
        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code === 'P2025') throw new NotFoundException('invalid id');
          throw new InternalServerErrorException('unexpected database error');
        }
        throw new InternalServerErrorException('unexpected server error');
      });
  }
  // 사용자 조회
  async findUserById(userId: string) {
    return this.prisma.users.findUnique({
      where: { id: userId },
    });
  }

  // 사용자 생성
  async createUser(userId: string) {
    return this.prisma.users.create({
      data: {
        id: userId,
        nickname: '.',
      },
    });
  }
}
