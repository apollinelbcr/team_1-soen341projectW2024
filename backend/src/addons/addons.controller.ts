import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { AddonsService } from './addons.service';
import { CreateAddonDto } from './dto/createaddon.dto';
import { Addons } from './addons.entity';
import { UpdateAddonDto } from './dto/updateaddon.dto';

@Controller('addons')
export class AddonsController {

    constructor(private addonsService: AddonsService){}

    @Post()
    createAddon(@Body() createAddonDto : CreateAddonDto) : Promise<Addons>{
        return this.addonsService.createAddon(createAddonDto); 
    }

    @Get()
    getAllAddons() : Promise<Addons[]>{
        return this.addonsService.getAllAddons();
    }

    @Get(':id')
    async getAddonById(@Param('id') id: string): Promise<Addons> {
        try {
            const addon = await this.addonsService.getAddonById(id);
            return addon;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Internal server error'); 
            }
        }
    }

    @Patch('/:id')
    updateAddon(@Param('id') id: string, @Body() updateAddonDto: UpdateAddonDto): Promise<Addons> {
        return this.addonsService.updateAddon(id, updateAddonDto);
    }

    @Delete('/:id')
    deleteAddon(@Param('id') id: string) : Promise<void> {
         return this.addonsService.deleteAddon(id);
     }

}
