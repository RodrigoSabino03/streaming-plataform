import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDTO, UpdateUserRoleDTO, UserDeleteDTO, UserNewPasswordDTO } from './dtos/user';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async deleteUserByEmail(data: UserDeleteDTO): Promise<boolean> {

        const userAlreadyExists = await this.prismaService.user.findUnique({
            where: { email: data.email }
        });


        if (!userAlreadyExists) {
            throw new UnauthorizedException('User not found');
        }

        const res = await this.prismaService.user.delete({ where: { email: data.email } });

        if (!res) {
            throw new UnauthorizedException('Failed to delete user');
        }

        return true;
    }

    async UpdatePassword(data: UserNewPasswordDTO): Promise<boolean> {
        const user = await this.prismaService.user.findUnique({ where: { email: data.email } });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const hashedPassword = await bcrypt.hash(data.newPassword, 10);

        await this.prismaService.user.update({
            where: { email: data.email },
            data: { password: hashedPassword }
        });

        return true

    }

    async updateUser(data: UpdateUserDTO): Promise<boolean> {
        const user = await this.prismaService.user.findUnique({ where: { email: data.email } });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const updateData: { name?: string; email?: string } = {};
        if (data.newName) updateData.name = data.newName;
        if (data.newEmail) updateData.email = data.newEmail;

        await this.prismaService.user.update({
            where: { email: data.email },
            data: updateData,
        });


        return true;
    }

    async updateUserRole(data: UpdateUserRoleDTO): Promise<boolean> {
        const user = await this.prismaService.user.findUnique({ where: { email: data.email } });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const newRole = user.role === 'freemium' ? 'premium' : 'freemium';

        await this.prismaService.user.update({ where: { email: data.email }, data: { role: newRole } });

        return true
    }
}
