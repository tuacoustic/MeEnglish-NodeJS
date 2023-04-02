import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResources } from '../../src/app.roles';
import { Auth } from '../../src/common/decorators';
import { testTypes } from '../common/code-type/test.code-type';
import { Resp } from '../common/resp';
import { TestDto } from './test.dto';
import { TestService } from './test.service';

@ApiTags('Test API')
@Controller('test')
export class TestController {
    constructor(
        private readonly testService: TestService
    ){}

    @Auth({
        possession: 'any',
        action: 'read',
        resource: AppResources.TEST
    })
    @Get()
    async list(): Promise<Resp> {
        return {
            data: await this.testService.list(),
        };
    }

    @Get('/:id')
    async getTestById(
        @Param('id') id: string,
    ): Promise<Resp> {
        const getTest = await this.testService.getAllById(id);
        return {
            data: [getTest],
        }
    }

    @Post()
    async create(@Body() createTestDto: TestDto): Promise<Resp> {
        const createData = await this.testService.create(createTestDto);
        return {
            data: [createData],
        }
    }

    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() updateTestDto: TestDto
    ): Promise<Resp> {
        await this.testService.update(id, updateTestDto);
        return {
            data: [updateTestDto],
            message: testTypes().TEST_UPDATE_SUCCESSFULLY.message,
        }
    }
}
