import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ModuleDeleteDTO, ModuleDTO, ModuleUpdateDTO } from './dtos/module';

@Injectable()
export class ModulesService {
    constructor(private prismaService: PrismaService) { }

    async getAllModules() {
        const modules = await this.prismaService.module.findMany();

        if (!modules) {
            throw new UnauthorizedException('No modules found');
        }

        return modules
    }

    async createModule(data: ModuleDTO) {
        console.log(data);

        const moduleAlreadyExists = await this.prismaService.module.findFirst({ where: { name: data.name } });

        if (moduleAlreadyExists) {
            throw new UnauthorizedException('Module already exists');
        }


        const module = await this.prismaService.module.create({ data });
        return { module };
    }

    async updateModule(data: ModuleUpdateDTO) {
        const module = await this.prismaService.module.findFirst({ where: { name: data.name } });

        if (!module) {
            throw new UnauthorizedException('Module not found');
        }

        const updateData: { description?: string; name?: string; image?: string } = {};
        if (data.newDescription) updateData.description = data.newDescription;
        if (data.newName) updateData.name = data.newName;
        if (data.newImage) updateData.image = data.newImage;


        await this.prismaService.module.update({ where: { id: module.id }, data: updateData });

        return { message: 'Module updated successfully' };
    }

    async deleteModule(data: ModuleDeleteDTO) {

        const module = await this.prismaService.module.findFirst({ where: { name: data.name } });

        if (!module) {
            throw new UnauthorizedException('Module not found');
        }

        await this.prismaService.module.delete({ where: { id: module.id } });

        return { message: 'Module deleted successfully' };
    }
}
