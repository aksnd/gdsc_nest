import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { DictService } from './dict.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDictDto } from './dto/req/createDict.dto';

@Controller('api/dict')
export class DictController {
  appService: any;
  constructor(private readonly dictService: DictService) {}

  @Get()
  async getDict(@Query('id') userId: string, @Res() res: Response) {
    try {
      let user = await this.dictService.findUserById(userId);

      // 2. 사용자 존재하지 않으면 새로 생성
      if (!user) {
        user = await this.dictService.createUser(userId);
      }

      const result = await this.dictService.getDictData(userId);
      const formattedResult = result.map((mountain) => ({
        name: mountain.name,
        level: mountain.level,
        conquerDate:
          mountain.conquerInfo.length > 0
            ? mountain.conquerInfo[0].conquerDate
            : null,
        conquered: mountain.conquerInfo.length > 0,
        imageLink: mountain.conquerInfo.length > 0 ? mountain.conquerInfo[0].imageLink :
          mountain.imageLink ? mountain.imageLink
          : `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.DEFAULT_IMAGE}`,
      }));
      res.json({
        type: 'success',
        errorMessage: '',
        result: formattedResult,
      });
    } catch (error) {
      res.json({
        type: 'fail',
        errorMessage: error.message,
        result: [],
      });
    }
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createDict(
    @Query() query: CreateDictDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.dictService.create(file, query);
  }
}
