import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO, UpdateUserRoleDTO, UserDeleteDTO, UserNewPasswordDTO } from './dtos/user';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Delete('delete')
    async deleteUser(@Body() data: UserDeleteDTO) {
        return await this.userService.deleteUserByEmail(data);
    }

    @Put('update-password')
    async updatePassword(@Body() data: UserNewPasswordDTO) {
        return await this.userService.UpdatePassword(data);
    }

    @Put('update-user')
    async updateUser(@Body() data: UpdateUserDTO) {
        return await this.userService.updateUser(data);
    }

    @Put('update-role')
    async updateUserRole(@Body() data: UpdateUserRoleDTO) {
        return await this.userService.updateUserRole(data);
    }

}
