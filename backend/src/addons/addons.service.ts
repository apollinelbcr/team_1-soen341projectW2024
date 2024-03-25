import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Addons } from './addons.entity';
import { MongoRepository } from 'typeorm';
import { CreateAddonDto } from './dto/createaddon.dto';
import { UpdateAddonDto } from './dto/updateaddon.dto';

@Injectable()
export class AddonsService {

    constructor(
        @InjectRepository(Addons)
        private addonsRepository: MongoRepository<Addons>
    ){}

    async createAddon(createAddonDto: CreateAddonDto): Promise<Addons> {
        const { addon_name, price } = createAddonDto;
        const addon = this.addonsRepository.create({
            addon_name, price
        } as Partial<Addons>); 

        await this.addonsRepository.save(addon);
        return addon;
    }

    async getAllAddons() : Promise<Addons[]> {
        const found = await this.addonsRepository.find();
        return found;
    }

    async getAddonById(id: string) : Promise<Addons> {
        const found = await this.addonsRepository.findOneBy({id: id});
        if(!found){
            throw new NotFoundException(`Addon ${id} is not found`);
        }
        return found;
    }

    async updateAddon(id: string, updateAddonDto: UpdateAddonDto): Promise<Addons> {
        const addon = await this.getAddonById(id);
        
        if (updateAddonDto.price !== undefined) {
            addon.price = updateAddonDto.price;
        }

        await this.addonsRepository.save(addon);
        return addon;
    }

    async deleteAddon(id:string) : Promise<void> {
        const result = await this.addonsRepository.delete(id);
        
        if(result.affected === 0){
            throw new NotFoundException(`Addon ID ${id} is not found`);
        }
    }


}
