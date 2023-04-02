import { Injectable, Scope } from "@nestjs/common";

@Injectable({
    scope: Scope.DEFAULT
})
export class LoggerService {
    count = 0
    countUserSession(): number {
        this.count++;
        return this.count;
    }
}