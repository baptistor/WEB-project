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
exports.MinuteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const minute_entity_1 = require("./minute.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
let MinuteService = class MinuteService {
    constructor(repository, userServ) {
        this.repository = repository;
        this.userServ = userServ;
    }
    async getAll() {
        return this.repository.find();
    }
    async getByMinuteId(paramId) {
        const id = +paramId;
        return this.repository.findOneBy({ id });
    }
    async create(content, idVoters, date, idAssociation) {
        if (content !== undefined && idVoters !== undefined && date !== undefined && idAssociation !== undefined) {
            const minute = await this.repository.create({ content, date, idAssociation });
            const tabUsers = [];
            for (let i = 0; i < idVoters.length; i++) {
                const user = await this.userServ.getById(idVoters[i]);
                if (!user) {
                    throw new common_1.HttpException(`User with ID ${idVoters[i]} not found`, common_1.HttpStatus.NOT_FOUND);
                }
                tabUsers.push(user);
            }
            minute.voters = tabUsers;
            const savedMinute = await this.repository.save(minute);
            return savedMinute;
        }
        return null;
    }
    async update(newContent, paramId) {
        const minute = await this.repository.findOne({ where: { id: paramId } });
        minute.content = newContent;
        const updatedMinute = await this.repository.save(minute);
        return updatedMinute;
    }
    async delete(paramId) {
        const id = +paramId;
        const delMinute = await this.repository.delete({ id });
        return delMinute.affected > 0;
    }
};
exports.MinuteService = MinuteService;
exports.MinuteService = MinuteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(minute_entity_1.Minute)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], MinuteService);
//# sourceMappingURL=minute.service.js.map