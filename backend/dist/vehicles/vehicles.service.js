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
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vehicle_status_enum_1 = require("./vehicle-status.enum");
const vehicles_entity_1 = require("./vehicles.entity");
let VehiclesService = class VehiclesService {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    ;
    async createVehicle(createVehicleDto) {
        const { name_vehicle, image, vehicle_type, vehicle_category, vehicle_transmission, price } = createVehicleDto;
        const vehicle = this.vehicleRepository.create({
            name_vehicle, image, vehicle_type, vehicle_category, vehicle_transmission, status: vehicle_status_enum_1.VehicleStatus.AVAILABLE, price
        });
        await this.vehicleRepository.save(vehicle);
        return vehicle;
    }
    async getVehicleById(id) {
        const found = await this.vehicleRepository.findOneBy({ id: id });
        if (!found) {
            throw new common_1.NotFoundException(`Vehicle ${id} is not found`);
        }
        return found;
    }
    async getAllvehicles() {
        const found = await this.vehicleRepository.find();
        return found;
    }
    async updateVehicleStatus(id, status) {
        const vehicle = await this.getVehicleById(id);
        vehicle.status = status;
        await this.vehicleRepository.save(vehicle);
        return vehicle;
    }
    async updateVehicle(id, updateVehicleStatusDto) {
        const vehicle = await this.getVehicleById(id);
        if (updateVehicleStatusDto.name_vehicle !== undefined) {
            vehicle.name_vehicle = updateVehicleStatusDto.name_vehicle;
        }
        if (updateVehicleStatusDto.image !== undefined) {
            vehicle.image = updateVehicleStatusDto.image;
        }
        if (updateVehicleStatusDto.vehicle_type !== undefined) {
            vehicle.vehicle_type = updateVehicleStatusDto.vehicle_type;
        }
        if (updateVehicleStatusDto.vehicle_category !== undefined) {
            vehicle.vehicle_category = updateVehicleStatusDto.vehicle_category;
        }
        if (updateVehicleStatusDto.vehicle_transmission !== undefined) {
            vehicle.vehicle_transmission = updateVehicleStatusDto.vehicle_transmission;
        }
        if (updateVehicleStatusDto.status !== undefined) {
            vehicle.status = updateVehicleStatusDto.status;
        }
        if (updateVehicleStatusDto.price !== undefined) {
            vehicle.price = updateVehicleStatusDto.price;
        }
        await this.vehicleRepository.save(vehicle);
        return vehicle;
    }
    async deleteVehicle(id) {
        const result = await this.vehicleRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Vehicle with ID ${id} is not found`);
        }
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicles_entity_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map