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
exports.UsersController = exports.UserInput = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
class UserInput {
}
exports.UserInput = UserInput;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nom de l utilisateur',
        example: "Krugs",
        type: String,
    }),
    __metadata("design:type", String)
], UserInput.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Prénom de l utilisateur',
        example: "Bapt",
        type: String,
    }),
    __metadata("design:type", String)
], UserInput.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Age de l utilisateur',
        minimum: 18,
        example: 21,
        type: Number,
    }),
    __metadata("design:type", Number)
], UserInput.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mot de passe de l utilisateur',
        example: "mdp1234",
        type: String,
    }),
    __metadata("design:type", String)
], UserInput.prototype, "password", void 0);
let UsersController = class UsersController {
    constructor(services) {
        this.services = services;
    }
    async getAll() {
        return this.services.getAll();
    }
    async getById(parameter) {
        const user = await this.services.getById(parameter.id);
        if (!user) {
            throw new common_1.HttpException(`Could not find a user with the id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async getAllRolesById(parameter) {
        const user = await this.services.getAllRolesById(parameter.id);
        if (!user) {
            throw new common_1.HttpException(`Could not find a user with the id ${parameter.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async create(input) {
        const user = await this.services.create(input.name, input.firstname, input.age, input.password);
        if (!user) {
            throw new common_1.HttpException(`Manque un ou plusieurs paramètres pour créer l'utilisateur`, common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async update(input, parameter) {
        const user = await this.services.update(input.name, input.firstname, input.age, parameter.id);
        if (!user) {
            throw new common_1.HttpException(`Utilisateur avec l'ID: ${parameter.id} introuvable`, common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async delete(parameter) {
        const delUser = this.services.delete(parameter.id);
        if (!delUser) {
            throw new common_1.HttpException(`Utilisateur avec l'ID: ${parameter.id} introuvable`, common_1.HttpStatus.NOT_FOUND);
        }
        return delUser;
    }
};
exports.UsersController = UsersController;
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
    __metadata("design:paramtypes", [Object]),
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
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Utilisateur créé.'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Utilisateur mis a jour'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map