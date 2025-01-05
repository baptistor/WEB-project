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
exports.AssociationsController = void 0;
const common_1 = require("@nestjs/common");
const associations_service_1 = require("./associations.service");
const swagger_1 = require("@nestjs/swagger");
const associations_parameter_1 = require("./associations.parameter");
const associations_input_1 = require("./associations.input");
let AssociationsController = class AssociationsController {
    constructor(service) {
        this.service = service;
    }
    async getAll() {
        return this.service.getAll();
    }
    async getById(parameter) {
        const s = this.service.getById(+parameter.id);
        if (!s) {
            throw new common_1.HttpException(`Could not find an association with the id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return s;
    }
    async create(input) {
        return this.service.create(input.idUsers, input.name);
    }
    async update(parameter, input) {
        const s = this.service.update(+parameter.id, input.idUsers, input.name);
        if (!s) {
            throw new common_1.HttpException(`Could not find an association with the id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return s;
    }
    async delete(parameter) {
        const s = this.service.delete(+parameter.id);
        if (!s) {
            throw new common_1.HttpException(`Could not find an association with the id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return s;
    }
    async getMembers(parameter) {
        const u = this.service.getMembers(+parameter.id);
        if (!u) {
            throw new common_1.HttpException(`Could not find an association with the id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return u;
    }
};
exports.AssociationsController = AssociationsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [associations_parameter_1.AssociationParameter]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The association has been successfully created.'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [associations_input_1.AssociationInput]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [associations_parameter_1.AssociationParameter, associations_input_1.AssociationInput]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [associations_parameter_1.AssociationParameter]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/members'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [associations_parameter_1.AssociationParameter]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getMembers", null);
exports.AssociationsController = AssociationsController = __decorate([
    (0, common_1.Controller)('associations'),
    __metadata("design:paramtypes", [associations_service_1.AssociationsService])
], AssociationsController);
//# sourceMappingURL=associations.controller.js.map