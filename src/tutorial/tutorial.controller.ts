import { Controller, Get, Render } from '@nestjs/common';

@Controller('courses')
export class TutorialController {
    @Get()
    @Render("tutorial/index")
async  findAll(){
return;
    }
}
