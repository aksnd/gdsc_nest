import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidateGpsDto } from './dto/req/validateGps.dto';

@Injectable()
export class GpsService {
  constructor(private prisma: PrismaService) {}

  async validate({ latitude, longitude }: ValidateGpsDto) {
    const range: number = parseFloat(process.env.RANGE);
    return this.prisma.mountain.findFirst({
      where: {
        latitude: {
          lte: latitude + range,
          gte: latitude - range,
        },
        longitude: {
          lte: longitude + range,
          gte: longitude - range,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
