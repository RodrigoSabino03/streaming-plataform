import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [AuthModule, UserModule, ModulesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
