"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinuteModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const minute_entity_1 = require("./minute.entity");
const minute_controller_1 = require("./minute.controller");
const minute_service_1 = require("./minute.service");
const users_module_1 = require("../users/users.module");
const associations_module_1 = require("../associations/associations.module");
let MinuteModule = class MinuteModule {
};
exports.MinuteModule = MinuteModule;
exports.MinuteModule = MinuteModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([minute_entity_1.Minute]), users_module_1.UsersModule, associations_module_1.AssociationsModule],
        controllers: [minute_controller_1.MinuteController],
        providers: [minute_service_1.MinuteService],
        exports: [minute_service_1.MinuteService]
    })
], MinuteModule);
//# sourceMappingURL=minute.module.js.map