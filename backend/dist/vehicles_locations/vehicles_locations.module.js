"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesLocationsModule = void 0;
const common_1 = require("@nestjs/common");
const vehicles_locations_controller_1 = require("./vehicles_locations.controller");
const vehicles_locations_service_1 = require("./vehicles_locations.service");
const typeorm_1 = require("@nestjs/typeorm");
const vehicles_locations_entity_1 = require("./vehicles_locations.entity");
const vehicles_service_1 = require("../vehicles/vehicles.service");
const vehicles_entity_1 = require("../vehicles/vehicles.entity");
let VehiclesLocationsModule = class VehiclesLocationsModule {
};
exports.VehiclesLocationsModule = VehiclesLocationsModule;
exports.VehiclesLocationsModule = VehiclesLocationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([vehicles_locations_entity_1.Vehicle_Location, vehicles_entity_1.Vehicle])],
        controllers: [vehicles_locations_controller_1.VehiclesLocationsController],
        providers: [vehicles_locations_service_1.VehiclesLocationsService, vehicles_service_1.VehiclesService]
    })
], VehiclesLocationsModule);
//# sourceMappingURL=vehicles_locations.module.js.map