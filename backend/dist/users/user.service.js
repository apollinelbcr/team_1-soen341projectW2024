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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_status_enum_1 = require("./user-status.enum");
const user_entity_1 = require("./user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    ;
    async createTask(createUserDto) {
        const { name_user, image, user_email, user_phone, user_password } = createUserDto;
        const user = this.userRepository.create({
            name_user, image, user_email, user_phone, user_password, status: user_status_enum_1.UserStatus.ACTIVE
        });
        await this.userRepository.save(user);
        return user;
    }
    async getUserById(id) {
        const found = await this.userRepository.findOneBy({ id: id });
        if (!found) {
            throw new common_1.NotFoundException(`User ${id} is not found`);
        }
        return found;
    }
    async getAllusers() {
        const found = await this.userRepository.find();
        return found;
    }
    async updateUserStatus(id, status) {
        const user = await this.getUserById(id);
        user.status = status;
        await this.userRepository.save(user);
        return user;
    }
    async deleteUser(id) {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`User with ID ${id} is not found`);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository])
], UsersService);
//# sourceMappingURL=user.service.js.map