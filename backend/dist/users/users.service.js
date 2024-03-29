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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("./users.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_status_enum_1 = require("./users-status.enum");
const users_roles_enum_1 = require("./users-roles.enum");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createStaff(createStaffDto) {
        const { first_name, last_name, email, password, role, phone_number, driver_license } = createStaffDto;
        const staff = this.userRepository.create({
            first_name, last_name, email, password, role, phone_number, driver_license, status: users_status_enum_1.UserStatus.ACTIVE
        });
        await this.userRepository.save(staff);
        return staff;
    }
    async createCustomer(createCustomer) {
        const { first_name, last_name, email, password, phone_number, driver_license } = createCustomer;
        let existingUser = await this.userRepository.findOne({ where: { email, role: 'CUSTOMER' } });
        if (existingUser) {
            throw new common_1.HttpException('Email already exists', common_1.HttpStatus.CONFLICT);
        }
        ;
        const customer = this.userRepository.create({
            first_name, last_name, email, password, role: users_roles_enum_1.UserRole.CUSTOMER, phone_number, driver_license, status: users_status_enum_1.UserStatus.ACTIVE
        });
        await this.userRepository.save(customer);
        return customer;
    }
    async getUserById(id) {
        const found = await this.userRepository.findOneBy({ id: id });
        if (!found) {
            throw new common_1.NotFoundException(`User with ID ${id} is not found`);
        }
        return found;
    }
    async getAllUsers() {
        const found = await this.userRepository.find();
        return found;
    }
    async deleteUser(id) {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`User with ID ${id} is not found`);
        }
    }
    async updateUserStaff(id, updateUsersDto) {
        const user = await this.getUserById(id);
        if (updateUsersDto.last_name !== undefined) {
            user.last_name = updateUsersDto.last_name;
        }
        if (updateUsersDto.first_name !== undefined) {
            user.first_name = updateUsersDto.first_name;
        }
        if (updateUsersDto.email !== undefined) {
            user.email = updateUsersDto.email;
        }
        if (updateUsersDto.password !== undefined) {
            user.password = updateUsersDto.password;
        }
        if (updateUsersDto.role !== undefined) {
            user.role = updateUsersDto.role;
        }
        if (updateUsersDto.phone_number !== undefined) {
            user.phone_number = updateUsersDto.phone_number;
        }
        if (updateUsersDto.driver_license !== undefined) {
            user.driver_license = updateUsersDto.driver_license;
        }
        if (updateUsersDto.status !== undefined) {
            user.status = updateUsersDto.status;
        }
        await this.userRepository.save(user);
        return user;
    }
    async updateUserCustomer(id, updateUsersDto) {
        const user = await this.getUserById(id);
        if (updateUsersDto.email !== undefined) {
            user.email = updateUsersDto.email;
        }
        if (updateUsersDto.password !== undefined) {
            user.password = updateUsersDto.password;
        }
        if (updateUsersDto.phone_number !== undefined) {
            user.phone_number = updateUsersDto.phone_number;
        }
        await this.userRepository.save(user);
        return user;
    }
    async loginCustomer(email, password) {
        const user = await this.userRepository.findOne({ where: { email, password } });
        return user || null;
    }
    async findUserByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email, role: 'CUSTOMER' } });
        return user || null;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map