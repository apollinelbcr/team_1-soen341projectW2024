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
exports.VehiclesLocationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vehicles_locations_entity_1 = require("./vehicles_locations.entity");
const typeorm_2 = require("typeorm");
let VehiclesLocationsService = class VehiclesLocationsService {
    constructor(vehcilelocationRepository) {
        this.vehcilelocationRepository = vehcilelocationRepository;
    }
    async createVehicleLocation(createvehcilelocationdto) {
        const { zip_code, airport_name, branch_name, branch_adress, vehicle_id } = createvehcilelocationdto;
        const vehiclelocation = this.vehcilelocationRepository.create({
            zip_code, airport_name, branch_name, branch_adress, vehicle_id
        });
        await this.vehcilelocationRepository.save(vehiclelocation);
        return vehiclelocation;
    }
    async getAllVehicleLocations() {
        const found = await this.vehcilelocationRepository.find();
        return found;
    }
    async getVehicleLocationById(id) {
        const found = await this.vehcilelocationRepository.findOneBy({ id: id });
        if (!found) {
            throw new common_1.NotFoundException(`Location ${id} is not found`);
        }
        return found;
    }
    async getVehicleLocationsByParam(param) {
        const foundLocations = await this.vehcilelocationRepository.find({
            where: [
                { zip_code: param },
                { airport_name: param }
            ],
        });
        if (!foundLocations) {
            throw new common_1.NotFoundException(`No locations found matching '${param}'`);
        }
        return foundLocations;
    }
    async updateVehicleLocation(id, updateVehicleLocationDto) {
        const vehicle_location = await this.getVehicleLocationById(id);
        if (updateVehicleLocationDto.zip_code !== undefined) {
            vehicle_location.zip_code = updateVehicleLocationDto.zip_code;
        }
        if (updateVehicleLocationDto.airport_name !== undefined) {
            vehicle_location.airport_name = updateVehicleLocationDto.airport_name;
        }
        if (updateVehicleLocationDto.branch_name !== undefined) {
            vehicle_location.branch_name = updateVehicleLocationDto.branch_name;
        }
        if (updateVehicleLocationDto.branch_adress !== undefined) {
            vehicle_location.branch_adress = updateVehicleLocationDto.branch_adress;
        }
        if (updateVehicleLocationDto.vehicle_id !== undefined) {
            vehicle_location.vehicle_id = updateVehicleLocationDto.vehicle_id;
        }
        await this.vehcilelocationRepository.save(vehicle_location);
        return vehicle_location;
    }
    async deleteVehicleLocation(id) {
        const result = await this.vehcilelocationRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Location with ID ${id} is not found`);
        }
    }
};
exports.VehiclesLocationsService = VehiclesLocationsService;
exports.VehiclesLocationsService = VehiclesLocationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicles_locations_entity_1.Vehicle_Location)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository])
], VehiclesLocationsService);
//# sourceMappingURL=vehicles_locations.service.js.map