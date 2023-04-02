import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ACGuard, UseRoles, Role as role } from "nest-access-control";
import { JwtAuthGuard } from "../../auth/guards";

export function Auth(...roles: role[]) {
    return applyDecorators(
        UseGuards(JwtAuthGuard, ACGuard),
        UseRoles(...roles),
        // UseGuards(JwtAuthGuard),
        ApiBearerAuth(),
    )
}