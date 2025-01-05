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
exports.MinuteController = void 0;
const minute_input_1 = require("./minute.input");
const minute_update_1 = require("./minute.update");
const minute_service_1 = require("./minute.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let MinuteController = class MinuteController {
    constructor(services) {
        this.services = services;
    }
    async getAll() {
        return await this.services.getAll();
    }
    async getById(parameter) {
        const minute = await this.services.getByMinuteId(parameter.idMinute);
        if (!minute) {
            throw new common_1.HttpException(`Could not find a user with the id: ${parameter.idMinute}`, common_1.HttpStatus.NOT_FOUND);
        }
        return minute;
    }
    async create(input) {
        const minute = await this.services.create(input.content, input.idVoters, input.date, input.idAssociation);
        if (!minute) {
            throw new common_1.HttpException(`Manque un ou plusieurs paramètres pour créer la minute: content`, common_1.HttpStatus.NOT_FOUND);
        }
        return minute;
    }
    async update(input, parameter) {
        const minute = await this.services.update(input.content, parameter.idMinute);
        if (!minute) {
            throw new common_1.HttpException(`Minute avec l'ID ${parameter.idMinute} introuvable`, common_1.HttpStatus.NOT_FOUND);
        }
        return minute;
    }
    async delete(parameter) {
        const minuteSuppr = await this.services.delete(parameter.idMinute);
        if (!minuteSuppr) {
            throw new common_1.HttpException(`Minute avec l'ID ${parameter.idMinute} introuvable`, common_1.HttpStatus.NOT_FOUND);
        }
        return minuteSuppr;
    }
};
exports.MinuteController = MinuteController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MinuteController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':idMinute'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MinuteController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Minute bien créée'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [minute_input_1.MinuteInput]),
    __metadata("design:returntype", Promise)
], MinuteController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':idMinute'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [minute_update_1.MinuteUpdate, Object]),
    __metadata("design:returntype", Promise)
], MinuteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':idMinute'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MinuteController.prototype, "delete", null);
exports.MinuteController = MinuteController = __decorate([
    (0, common_1.Controller)('minutes'),
    __metadata("design:paramtypes", [minute_service_1.MinuteService])
], MinuteController);
//# sourceMappingURL=minute.controller.js.map