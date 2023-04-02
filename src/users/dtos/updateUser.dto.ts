import { PartialType } from "@nestjs/swagger";
import { UserDto } from "./users.dto";

export class UpdateUserDto extends PartialType(UserDto) {}