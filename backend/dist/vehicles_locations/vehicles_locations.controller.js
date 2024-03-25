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
exports.VehiclesLocationsController = void 0;
const common_1 = require("@nestjs/common");
const vehicles_locations_service_1 = require("./vehicles_locations.service");
const create_locveh_dto_1 = require("./dto/create-locveh.dto");
const update_locveh_dto_1 = require("./dto/update-locveh.dto");
let VehiclesLocationsController = class VehiclesLocationsController {
    constructor(vehicleslocationsService) {
        this.vehicleslocationsService = vehicleslocationsService;
    }
    createVehicleLocation(createVehicleLocationDto) {
        return this.vehicleslocationsService.createVehicleLocation(createVehicleLocationDto);
    }
    getAllVehicleLocations() {
        return this.vehicleslocationsService.getAllVehicleLocations();
    }
    async getVehicleLocationById(id) {
        try {
            const vehicleLocation = await this.vehicleslocationsService.getVehicleLocationById(id);
            return vehicleLocation;
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
    updateVehicleLocation(id, updateVehicleLocationDto) {
        return this.vehicleslocationsService.updateVehicleLocation(id, updateVehicleLocationDto);
    }
    async getVehicleLocationsByParam(param) {
        try {
            const vehicleLocations = await this.vehicleslocationsService.getVehicleLocationsByParam(param);
            return vehicleLocations;
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
    deleteVehicleLocation(id) {
        return this.vehicleslocationsService.deleteVehicleLocation(id);
    }
};
exports.VehiclesLocationsController = VehiclesLocationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_locveh_dto_1.CreateVehicleLocationDto]),
    __metadata("design:returntype", Promise)
], VehiclesLocationsController.prototype, "createVehicleLocation", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VehiclesLocationsController.prototype, "getAllVehicleLocations", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiclesLocationsController.prototype, "getVehicleLocationById", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_locveh_dto_1.UpdateVehicleLocationDto]),
    __metadata("design:returntype", Promise)
], VehiclesLocationsController.prototype, "updateVehicleLocation", null);
__decorate([
    (0, common_1.Get)('param/:param'),
    __param(0, (0, common_1.Param)('param')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiclesLocationsController.prototype, "getVehicleLocationsByParam", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiclesLocationsController.prototype, "deleteVehicleLocation", null);
exports.VehiclesLocationsController = VehiclesLocationsController = __decorate([
    (0, common_1.Controller)('vehicles-locations'),
    __metadata("design:paramtypes", [vehicles_locations_service_1.VehiclesLocationsService])
], VehiclesLocationsController);
//# sourceMappingURL=vehicles_locations.controller.js.map