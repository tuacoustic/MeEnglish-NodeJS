import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectRolesBuilder, RolesBuilder } from "nest-access-control";
import { AppResources, AppRoles } from "../app.roles";
import { userTypes } from "../common/code-type/users.code-type";
import { Auth, User } from "../common/decorators";
import { Resp } from "../common/resp";
import { RegisterUserDto, UpdateUserDto, UserDto } from "./dtos";
import { UserService } from "./users.service";

@ApiTags('Users API')
@Controller("users")
export class UsersController {
    constructor(
        private readonly userService: UserService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder
    ) {}

    @Post('/register')
    async registerUser(@Body() userData: RegisterUserDto): Promise<Resp> { 
        try {
            const findUserQuery = {
                email: userData.email,
            }
            const findUser = await this.userService.getOne(findUserQuery, "email")
            if (findUser) {
                return {
                    data: [userTypes().USER_EXISTS],
                }
            }
            const createdData = await this.userService.createOne({
                ...userData,
                roles: [AppRoles.AUTHOR]
            });
            return {
                data: [UserDto.plainToClass(createdData)],
            }
        } catch (error) {
            return {
                data: [userTypes().USER_CREATE_ERROR],
                error: error.message,
            }
        }
    }

    @Post('/create')
    async createUser(@Body() userData: UserDto): Promise<Resp>{
        try {
            const createdData = await this.userService.save(userData);
            return {
                data: [UserDto.plainToClass(createdData)],
            };
        } catch (error) {
            return {
                data: [userTypes().USER_CREATE_ERROR],
                error: error.message
            }
        }
    }

    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResources.USERS
    })
    @Put('/update/:id')
    async updateuserById(
        @Param('id') id: string, 
        @Body() updateData: UpdateUserDto,
        @User() user: UserDto,
    ): Promise<Resp>{
        try {
            let updatedData: number;
            if(this.rolesBuilder
                .can(user.roles)
                .updateAny(AppResources.USERS)
                .granted
            ) {
                // Admin Only
                updatedData = await this.userService.update(id, updateData);
            } else {
                // Author Only
                if (id != user.id) {
                    return {
                        data: [userTypes().NOT_ALLOWED]
                    }
                }
                updatedData = await this.userService.update(id, {
                    ...updateData,
                    roles: [AppRoles.AUTHOR]
                });
            }
            if (!updatedData) {
                return {
                    data: [userTypes().USER_NOT_FOUND],
                }
            }
            return {
                data: [updateData],
                message: userTypes().USER_UPDATED_SUCCESSFULLY.message
            }
        } catch (error) {
            return {
                data: [userTypes(id).USER_CREATE_ERROR],
                error: error.message,
            }
        }
    }

    @Get('/get-by-id/:id')
    async getuserById(@Param('id') id: string): Promise<Resp> {
        try {
            const getuserById = await this.userService.getAllById(id);
            if (!getuserById) {
                return {
                    data: [userTypes().USER_NOT_FOUND]
                }
            }
            return {
                data: [getuserById],
            }
        } catch (error) {
            return {
                data: [userTypes().USER_GET_ERROR],
                error: error.message
            }
        }
    }

    @Delete('/delete-by-id/:id')
    async deleteuserById(@Param('id') id: string): Promise<Resp> {
        try {
            const deleteduserById = await this.userService.softDeleteById(id);
            if (!deleteduserById) {
                return {
                    data: [userTypes().USER_NOT_FOUND],
                }
            }
            return {
                data: [userTypes().USER_DELETED_SUCCESSFULLY],
            }
        } catch (error) {
            return {
                data: [userTypes(id).USER_DELETE_ERROR],
                error: error.message
            }
        }
    }

    @Auth({
        possession: "any",
        action: "read",
        resource: AppResources.USERS
    })
    @Auth()
    @Get('/get-all')
    async getAllUsers(where: object): Promise<Resp> {
        try {
            const rawFindDatabase = {
                ...where
            };
            const userValues = await this.userService.getAll(rawFindDatabase);
            if (userValues.length == 0) {
                return {
                    data: [userTypes().USER_NOT_FOUND],
                }
            }
            const result = [];
            for(let index = 0; index < userValues.length; index+=1) {
                result.push(UserDto.plainToClass(userValues[index]));
            }
            return {
                data: result,
            }
        } catch (error) {
            return {
                data: [userTypes().USER_GETALL_ERROR],
                error: error.message
            }
        }
    }
}