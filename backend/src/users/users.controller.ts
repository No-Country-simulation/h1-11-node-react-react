import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserWithTokenResponseDto } from 'src/auth/dto/response-create-patient';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 200, description: 'get All users', type: UserWithTokenResponseDto })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @Get()
  findAll(@Query() paginationDto : PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @ApiResponse({ status: 200, description: 'get user by id', type: UserWithTokenResponseDto })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @ApiResponse({ status: 200, description: 'delete user by id', type: UserWithTokenResponseDto })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
