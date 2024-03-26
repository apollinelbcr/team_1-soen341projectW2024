import { AddonsService } from './addons.service';
import { CreateAddonDto } from './dto/createaddon.dto';
import { Addons } from './addons.entity';
import { UpdateAddonDto } from './dto/updateaddon.dto';
export declare class AddonsController {
    private addonsService;
    constructor(addonsService: AddonsService);
    createAddon(createAddonDto: CreateAddonDto): Promise<Addons>;
    getAllAddons(): Promise<Addons[]>;
    getAddonById(id: string): Promise<Addons>;
    updateAddon(id: string, updateAddonDto: UpdateAddonDto): Promise<Addons>;
    deleteAddon(id: string): Promise<void>;
}
