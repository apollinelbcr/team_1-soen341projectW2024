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
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reservations_entity_1 = require("./reservations.entity");
let ReservationsService = class ReservationsService {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
    async createTask(createReservationDto) {
        const { email, vehicle_name, pickup_date, pickup_time, dropoff_date, dropoff_time, pickup_location, dropoff_location, price, extras, isMadeBy, isPaid, isCheckedOut } = createReservationDto;
        const reservation = this.reservationRepository.create({
            email,
            vehicle_name,
            pickup_date,
            pickup_time,
            dropoff_date,
            dropoff_time,
            pickup_location,
            dropoff_location,
            price,
            extras,
            isPaid,
            isCheckedOut,
            isMadeBy
        });
        await this.reservationRepository.save(reservation);
        return reservation;
    }
    async getReservationById(id) {
        const found = await this.reservationRepository.findOneBy({ id: id });
        if (!found) {
            throw new common_1.NotFoundException(`Reservation ${id} is not found`);
        }
        return found;
    }
    async getAllreservations() {
        const found = await this.reservationRepository.find();
        console.log(found);
        return found;
    }
    async deleteReservations(id) {
        const result = await this.reservationRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Vehicle with ID ${id} is not found`);
        }
    }
    async updateVehicle(id, updateReservationDto) {
        const reservation = await this.getReservationById(id);
        if (updateReservationDto.email !== undefined) {
            reservation.email = updateReservationDto.email;
        }
        if (updateReservationDto.vehicle_name !== undefined) {
            reservation.vehicle_name = updateReservationDto.vehicle_name;
        }
        if (updateReservationDto.pickup_date !== undefined) {
            reservation.pickup_date = updateReservationDto.pickup_date.toString();
        }
        if (updateReservationDto.dropoff_date !== undefined) {
            reservation.dropoff_date = updateReservationDto.dropoff_date.toString();
        }
        if (updateReservationDto.pickup_time !== undefined) {
            reservation.pickup_time = updateReservationDto.pickup_time;
        }
        if (updateReservationDto.dropoff_time !== undefined) {
            reservation.dropoff_time = updateReservationDto.dropoff_time;
        }
        if (updateReservationDto.pickup_location !== undefined) {
            reservation.pickup_location = updateReservationDto.pickup_location;
        }
        if (updateReservationDto.dropoff_location !== undefined) {
            reservation.dropoff_location = updateReservationDto.dropoff_location;
        }
        if (updateReservationDto.pickup_time !== undefined) {
            reservation.pickup_time = updateReservationDto.pickup_time;
        }
        if (updateReservationDto.dropoff_time !== undefined) {
            reservation.dropoff_time = updateReservationDto.dropoff_time;
        }
        if (updateReservationDto.price !== undefined) {
            reservation.price = updateReservationDto.price;
        }
        if (updateReservationDto.extras !== undefined) {
            reservation.extras = updateReservationDto.extras;
        }
        if (updateReservationDto.isPaid !== undefined) {
            reservation.isPaid = updateReservationDto.isPaid;
        }
        if (updateReservationDto.isCheckedOut !== undefined) {
            reservation.isCheckedOut = updateReservationDto.isCheckedOut;
        }
        await this.reservationRepository.save(reservation);
        return reservation;
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservations_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map