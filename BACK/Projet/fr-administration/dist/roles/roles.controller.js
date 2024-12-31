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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const roles_input_1 = require("./roles.input");
const roles_update_1 = require("./roles.update");
const roles_service_1 = require("./roles.service");
const swagger_1 = require("@nestjs/swagger");
let RolesController = class RolesController {
    constructor(services) {
        this.services = services;
    }
    async getAll() {
        return this.services.getAll();
    }
    async getUserByRolesName(parameter) {
        const user = await this.services.getUserByRolesName(parameter.name);
        if (!user) {
            throw new common_1.HttpException(`Il n'y a pas d'utilisateur ayant ce nom de rôle: ${parameter.name} `, common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async getById(parameter) {
        const role = await this.services.getByUserAndAssoId(parameter.idUser, parameter.idAsso);
        if (!role) {
            throw new common_1.HttpException(`Il n'y a pas de rôle avec l'utilisateur ID: ${parameter.idUser} et l'association ID: ${parameter.idAsso}`, common_1.HttpStatus.NOT_FOUND);
        }
        return role;
    }
    async create(input) {
        const role = await this.services.create(input.name, input.idUser, input.idAssociation);
        if (!role) {
            throw new common_1.HttpException(`Manque un ou plusieurs paramètres pour créer le role`, common_1.HttpStatus.NOT_FOUND);
        }
        return role;
    }
    async update(input, parameter) {
        const role = await this.services.update(input.name, parameter.idUser, parameter.idAsso);
        if (!role) {
            throw new common_1.HttpException(`Il n'y a pas de rôle avec l'utilisateur ID: ${parameter.idUser} et l'association ID: ${parameter.idAsso}`, common_1.HttpStatus.NOT_FOUND);
        }
        return role;
    }
    async delete(parameter) {
        return this.services.delete(parameter.idUser, parameter.idAsso);
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('users/:name'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getUserByRolesName", null);
__decorate([
    (0, common_1.Get)(':idUser/:idAsso'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Asso bien créée'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [roles_input_1.RoleInput]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':idUser/:idAsso'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [roles_update_1.RoleUpdate, Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':idUser/:idAsso'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "delete", null);
exports.RolesController = RolesController = __decorate([
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map