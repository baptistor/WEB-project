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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./users/users.entity");
const associations_module_1 = require("./associations/associations.module");
const roles_module_1 = require("./roles/roles.module");
const associations_entity_1 = require("./associations/associations.entity");
const roles_entity_1 = require("./roles/roles.entity");
const minute_module_1 = require("./minute/minute.module");
const minute_entity_1 = require("./minute/minute.entity");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'mydatabase.db',
                entities: [users_entity_1.User, associations_entity_1.Association, roles_entity_1.Role, minute_entity_1.Minute],
                synchronize: true,
            }), users_module_1.UsersModule, associations_module_1.AssociationsModule, roles_module_1.RolesModule, minute_module_1.MinuteModule, auth_module_1.AuthModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map