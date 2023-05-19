import { Controller, Get, Post, Body, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guard/auth.guard';
// import { Roles } from 'src/role/role.decorator';
import { Roles } from 'src/guard/metaData';
// import { Roles } from 'src/guard/metaData';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService){}

    @Get()
    // @Roles('admin')
    // @UseGuards(AuthGuard['admin'])
    getUser() : string{
        return this.userService.getUser()
    }

    @Get('userandcust')
    getuserandcust(){
        return this.userService.getUsersandCust()
    }

    @Get(':id')
    getid(@Param("id") id:number) {
        return this.userService.getById(id)
    }

    @Get('getAllUsers')
    // @UseGuards(AuthGuard)
    // @Roles('customer','admin')
    getAllUsers():any{
        return  this.userService.getAllUsers()
    }

    @Post('createUsers')
    createUsers(
        @Body() user_fields:any
        ){
        return this.userService.createUSers(user_fields)
    }

    @Delete('deleteUser/:id')
    deleteUser(@Param('id') id:number){
        return this.userService.deleteUser(id)
    }

    @Patch('updateUserandCust/:id')
    updateUser(
        @Body() fields:any,
        @Param('id') id:number
        ){
            return this.userService.updateUser(
                fields,
                id
            )
        }

    @Post('createUserandCust')
    createUserandCust(
        @Body() fields:any){
            return this.userService.createUserandCust(fields)
        }
    

    // @Post('createUserandCust')
    // createUserandCust(
    //     @Body('username') username: string,
    //     @Body('password') password: any,
    //     @Body('first_name') first_name: string,
    //     @Body('last_name') last_name: string,
    // ){
    //     return this.userService.createUserandCust(username,password,first_name,last_name)
    // }
}
