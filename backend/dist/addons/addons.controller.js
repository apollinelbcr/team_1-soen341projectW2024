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
exports.AddonsController = void 0;
const common_1 = require("@nestjs/common");
const addons_service_1 = require("./addons.service");
const createaddon_dto_1 = require("./dto/createaddon.dto");
const updateaddon_dto_1 = require("./dto/updateaddon.dto");
let AddonsController = class AddonsController {
    constructor(addonsService) {
        this.addonsService = addonsService;
    }
    createAddon(createAddonDto) {
        return this.addonsService.createAddon(createAddonDto);
    }
    getAllAddons() {
        return this.addonsService.getAllAddons();
    }
    async getAddonById(id) {
        try {
            const addon = await this.addonsService.getAddonById(id);
            return addon;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Internal server error');
            }
        }
    }
    updateAddon(id, updateAddonDto) {
        return this.addonsService.updateAddon(id, updateAddonDto);
    }
    deleteAddon(id) {
        return this.addonsService.deleteAddon(id);
    }
};
exports.AddonsController = AddonsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createaddon_dto_1.CreateAddonDto]),
    __metadata("design:returntype", Promise)
], AddonsController.prototype, "createAddon", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AddonsController.prototype, "getAllAddons", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddonsController.prototype, "getAddonById", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateaddon_dto_1.UpdateAddonDto]),
    __metadata("design:returntype", Promise)
], AddonsController.prototype, "updateAddon", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddonsController.prototype, "deleteAddon", null);
exports.AddonsController = AddonsController = __decorate([
    (0, common_1.Controller)('addons'),
    __metadata("design:paramtypes", [addons_service_1.AddonsService])
], AddonsController);
//# sourceMappingURL=addons.controller.js.map