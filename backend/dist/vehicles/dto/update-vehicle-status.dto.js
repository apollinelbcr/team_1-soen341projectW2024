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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVehicleStatusDto = void 0;
const class_validator_1 = require("class-validator");
const vehicle_status_enum_1 = require("../vehicle-status.enum");
const vehicle_types_enum_1 = require("../vehicle-types.enum");
const vehicle_categories_enum_1 = require("../vehicle-categories.enum");
const vehicle_transmissions_enum_1 = require("../vehicle-transmissions.enum");
class UpdateVehicleStatusDto {
}
exports.UpdateVehicleStatusDto = UpdateVehicleStatusDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateVehicleStatusDto.prototype, "name_vehicle", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateVehicleStatusDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(vehicle_types_enum_1.VehicleTypes),
    __metadata("design:type", String)
], UpdateVehicleStatusDto.prototype, "vehicle_type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(vehicle_categories_enum_1.VehicleCategories),
    __metadata("design:type", String)
], UpdateVehicleStatusDto.prototype, "vehicle_category", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(vehicle_transmissions_enum_1.VehicleTransmissions),
    __metadata("design:type", String)
], UpdateVehicleStatusDto.prototype, "vehicle_transmission", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(vehicle_status_enum_1.VehicleStatus),
    __metadata("design:type", String)
], UpdateVehicleStatusDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateVehicleStatusDto.prototype, "price", void 0);
//# sourceMappingURL=update-vehicle-status.dto.js.map