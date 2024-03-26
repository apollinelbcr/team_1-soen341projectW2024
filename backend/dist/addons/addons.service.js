"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddonsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const addons_entity_1 = require("./addons.entity");
const typeorm_2 = require("typeorm");
let AddonsService = class AddonsService {
    constructor(addonsRepository) {
        this.addonsRepository = addonsRepository;
    }
    async createAddon(createAddonDto) {
        const { addon_name, price } = createAddonDto;
        const addon = this.addonsRepository.create({
            addon_name, price
        });
        await this.addonsRepository.save(addon);
        return addon;
    }
    async getAllAddons() {
        const found = await this.addonsRepository.find();
        return found;
    }
    async getAddonById(id) {
        const found = await this.addonsRepository.findOneBy({ id: id });
        if (!found) {
            throw new common_1.NotFoundException(`Addon ${id} is not found`);
        }
        return found;
    }
    async updateAddon(id, updateAddonDto) {
        const addon = await this.getAddonById(id);
        if (updateAddonDto.price !== undefined) {
            addon.price = updateAddonDto.price;
        }
        await this.addonsRepository.save(addon);
        return addon;
    }
    async deleteAddon(id) {
        const result = await this.addonsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Addon ID ${id} is not found`);
        }
    }
};
exports.AddonsService = AddonsService;
exports.AddonsService = AddonsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(addons_entity_1.Addons)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository])
], AddonsService);
//# sourceMappingURL=addons.service.js.map