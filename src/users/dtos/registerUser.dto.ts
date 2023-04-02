import { OmitType } from "@nestjs/swagger";
import { UserDto } from "./users.dto";

export class RegisterUserDto extends OmitType(UserDto, ['roles'] as const) {}