import { Addons } from './addons.entity';
import { MongoRepository } from 'typeorm';
import { CreateAddonDto } from './dto/createaddon.dto';
import { UpdateAddonDto } from './dto/updateaddon.dto';
export declare class AddonsService {
    private addonsRepository;
    constructor(addonsRepository: MongoRepository<Addons>);
    createAddon(createAddonDto: CreateAddonDto): Promise<Addons>;
    getAllAddons(): Promise<Addons[]>;
    getAddonById(id: string): Promise<Addons>;
    updateAddon(id: string, updateAddonDto: UpdateAddonDto): Promise<Addons>;
    deleteAddon(id: string): Promise<void>;
}
