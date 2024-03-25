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
exports.UpdateReservationDto = void 0;
const class_validator_1 = require("class-validator");
const reservations_extras_enum_1 = require("../reservations-extras.enum");
class UpdateReservationDto {
}
exports.UpdateReservationDto = UpdateReservationDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "vehicle_name", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "pickup_date", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "pickup_time", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "dropoff_date", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "dropoff_time", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "pickup_location", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "dropoff_location", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateReservationDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(reservations_extras_enum_1.Extras),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "extras", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['true', 'false']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "isPaid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['admin', 'customer', 'customer service']),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "isMadeBy", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['true', 'false']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "isCheckedOut", void 0);
//# sourceMappingURL=update-reservation.dto.js.map