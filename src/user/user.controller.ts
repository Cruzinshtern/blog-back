import { Body, Controller, Delete, Get, Param, Post, Put, Request, Response } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./models/user.entity";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Controller('users')
export class UserController {

  constructor(
    private userService: UserService
  ) {}

  @Post()
  createNewUser(@Body() user: UserEntity): Observable<UserEntity> {
    return this.userService.create(user);
  }

  @Post('login')
  login(@Body() user: UserEntity): Observable<any> {
    return this.userService.login(user).pipe(
      map((token: string) => {
        return { token: token };
      })
    )
  }

  @Get()
  findAllUsers(@Request() req): Observable<any> {
    return this.userService.findAll().pipe(
      map((data) => {
        const response = {
          data: data,
          user: req.body.user,
        }
        return response;
      })
    );
  }

  @Get(':id')
  findOneUser(@Param() params): Observable<UserEntity> {
    return this.userService.findOne(params.id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: UserEntity): Observable<any> {
    return this.userService.updateOne(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Observable<any> {
    return this.userService.deleteOne(id);
  }
}
