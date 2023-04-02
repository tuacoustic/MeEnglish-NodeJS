import { Repository } from "typeorm";
import { BaseEntity } from "./base.entity";

export function parseArrToSelect(arr: any): object {
    if (arr.length == 0) {
        return {};
    }
    let obj = {};
    for(let i=0;i<arr.length;i+=1){
        obj[arr[i]] = true
    }
    return obj;
}

export class BaseService<Entity extends BaseEntity> {
    // Lớp con khi kế thừa có thể chỉnh sửa
    constructor(protected readonly repo: Repository<Entity>) {}

    async getOne(where: object, ...data: any): Promise<Entity> {
        const select = parseArrToSelect(data)
        const getById = await this.repo.findOne({where, select})
        return getById;
    }
    async getAllById(id: any): Promise<any> {
        const getAllById = await this.repo.findOneBy({id})
        return getAllById;
    }
    async getAll(where: object, ...data: any): Promise<Entity[]> {
        const select = parseArrToSelect(data)
        const getAllData = await this.repo.find({where, select})
        return getAllData;
    }
    async save(data: any): Promise<Entity>{
        const savedData = await this.repo.save(data);
        return savedData;
    }

    async update(id: string, data: any): Promise<number>{
        const savedData = await this.repo.update(id, data);
        return savedData.affected;
    }
    async deleteById(id: string): Promise<number>{
        const deletedData = await this.repo.delete(id);
        return deletedData.affected;
    } 
    async softDeleteById(id: string): Promise<number>{
        const softDeleteById = await this.repo.softDelete(id);
        return softDeleteById.affected;
    } 
}