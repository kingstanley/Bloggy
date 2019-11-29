import { Controller, Get, Res, Param } from '@nestjs/common';
import * as os from 'os';

@Controller('api/upload')
export class UploadController {
  @Get(':id')
  sendFile(@Param("id") id: string, @Res() res) {
        return   res.sendFile(`${id}`, { root: 'upload' });
  }
}
