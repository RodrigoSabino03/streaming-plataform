import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ModulesController],
  providers: [ModulesService, PrismaService]
})
export class ModulesModule {}
