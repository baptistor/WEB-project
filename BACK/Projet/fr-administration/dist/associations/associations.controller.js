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
exports.AssociationsController = exports.AssoInput = void 0;
const common_1 = require("@nestjs/common");
const associations_service_1 = require("./associations.service");
const swagger_1 = require("@nestjs/swagger");
class AssoInput {
}
exports.AssoInput = AssoInput;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nom de l association',
        example: "Asso2",
        type: String,
    }),
    __metadata("design:type", String)
], AssoInput.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The age of the user',
        example: [1, 4],
        type: [Number],
    }),
    __metadata("design:type", Array)
], AssoInput.prototype, "idUsers", void 0);
let AssociationsController = class AssociationsController {
    constructor(services) {
        this.services = services;
    }
    async getAll() {
        return this.services.getAll();
    }
    async getById(parameter) {
        const assoDTO = await this.services.getById(parameter.id);
        if (!assoDTO) {
            throw new common_1.HttpException(`Aucune association ne correspond à cet ID : ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return assoDTO;
    }
    async create(input) {
        const assoDTO = await this.services.create(input.name, input.idUsers);
        if (!assoDTO) {
            throw new common_1.HttpException(`Manque un ou plusieurs paramètres pour créer l'association`, common_1.HttpStatus.NOT_FOUND);
        }
        return assoDTO;
    }
    async update(input, parameter) {
        const assoDTO = await this.services.update(input.name, input.idUsers, parameter.id);
        if (!assoDTO) {
            throw new common_1.HttpException(`Aucune association ne correspond à cet ID : ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return assoDTO;
    }
    async delete(parameter) {
        const delAsso = await this.services.delete(parameter.id);
        if (!delAsso) {
            throw new common_1.HttpException(`Aucune association ne correspond à cet ID : ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return delAsso;
    }
    async getMembers(parameter) {
        const assoDTO = await this.services.getUserByAssociationId(parameter.id);
        if (!assoDTO) {
            throw new common_1.HttpException(`Aucune association ne correspond à cet ID : ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return assoDTO;
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
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Asso bien créée'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AssoInput]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/members'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getMembers", null);
exports.AssociationsController = AssociationsController = __decorate([
    (0, common_1.Controller)('associations'),
    __metadata("design:paramtypes", [associations_service_1.AssociationsService])
], AssociationsController);
//# sourceMappingURL=associations.controller.js.map