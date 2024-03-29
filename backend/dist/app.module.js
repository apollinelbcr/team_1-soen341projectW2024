"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vehicles_module_1 = require("./vehicles/vehicles.module");
const reservations_modules_1 = require("./reservations/reservations.modules");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const vehicles_locations_module_1 = require("./vehicles_locations/vehicles_locations.module");
const addons_module_1 = require("./addons/addons.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            vehicles_module_1.VehiclesModule, reservations_modules_1.ReservationsModule, users_module_1.UsersModule, auth_module_1.AuthModule,
            vehicles_module_1.VehiclesModule,
            reservations_modules_1.ReservationsModule,
            users_module_1.UsersModule,
            vehicles_locations_module_1.VehiclesLocationsModule,
            addons_module_1.AddonsModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'rentify',
                autoLoadEntities: true,
                synchronize: true,
            }),
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map