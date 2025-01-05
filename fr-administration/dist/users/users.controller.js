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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_input_1 = require("./users.input");
const swagger_1 = require("@nestjs/swagger");
const users_parameter_1 = require("./users.parameter");
let UsersController = class UsersController {
    constructor(service) {
        this.service = service;
    }
    async create(input) {
        return this.service.create(input.lastname, input.firstname, input.age, input.password);
    }
    async getAll() {
        return this.service.getAll();
    }
    async getById(parameter) {
        const u = this.service.getById(+parameter.id);
        if (!u) {
            throw new common_1.HttpException(`Could not find a user with the id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return u;
    }
    async getAllRolesById(parameter) {
        const user = await this.service.getAllRolesById(parameter.id);
        if (!user) {
            throw new common_1.HttpException(`Could not find a user with the id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async update(parameter, input) {
        const u = this.service.update(+parameter.id, input.lastname, input.firstname, input.age, input.password);
        if (!u) {
            throw new common_1.HttpException(`Could not find a user with the id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return u;
    }
    async delete(parameter) {
        const u = this.service.delete(+parameter.id);
        if (!u) {
            throw new common_1.HttpException(`Could not find a user with the id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return u;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The user has been successfully created.'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_input_1.UserInput]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_parameter_1.UserParameter]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)(':id/roles'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllRolesById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_parameter_1.UserParameter, users_input_1.UserInput]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_parameter_1.UserParameter]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map