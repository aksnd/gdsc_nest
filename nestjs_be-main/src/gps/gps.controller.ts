import { Controller, Post, Query } from '@nestjs/common';
import { ValidateGpsDto } from './dto/req/validateGps.dto';
import { GpsService } from './gps.service';

@Controller('api/gps')
export class GpsController {
  constructor(private gpsService: GpsService) {}

  @Post('validate')
  async validateGps(@Query() query: ValidateGpsDto) {
    return this.gpsService.validate(query);
  }
}
