import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModuleDeleteDTO, ModuleDTO, ModuleUpdateDTO } from './dtos/module';

@Controller('modules')
export class ModulesController {
    constructor(private modulesService: ModulesService) { }

    @Get('get-all')
    async getAllModules() {
        return await this.modulesService.getAllModules();
    }
    @Post('create')
    async createModule(@Body() data: ModuleDTO) {
        console.log(data);
        return await this.modulesService.createModule(data);
    }
    @Put('update')
    async updateModule(@Body() data: ModuleUpdateDTO) {
        return await this.modulesService.updateModule(data);
    }
    @Delete('delete')
    async deleteModule(@Body() data: ModuleDeleteDTO) {
        return await this.modulesService.deleteModule(data);
    }
}
