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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("./users.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const roles_entity_1 = require("../roles/roles.entity");
let UsersService = class UsersService {
    constructor(repository, rolesRepository) {
        this.repository = repository;
        this.rolesRepository = rolesRepository;
    }
    async getAll() {
        return this.repository.find();
    }
    async getById(paramId) {
        const id = +paramId;
        return await this.repository.findOneBy({ id });
    }
    async getAllRolesById(paramId) {
        const id = +paramId;
        return await this.rolesRepository.find({ where: { idUser: paramId } });
    }
    async create(name, firstname, age, password) {
        if (firstname !== undefined && name !== undefined && age !== undefined) {
            const user = this.repository.create({ name, firstname, age, password });
            return await this.repository.save(user);
        }
        return null;
    }
    async update(name, firstname, age, paramId) {
        const user = await this.repository.findOne({ where: { id: paramId } });
        if (firstname !== undefined && name !== undefined && age !== undefined) {
            user.name = name;
            user.firstname = firstname;
            user.age = age;
            const updatedUser = await this.repository.save(user);
            return updatedUser;
        }
        throw new common_1.HttpException(`Manque un ou plusieurs paramètres pour mettre à jour le User qui a comme ID : ${paramId}/ mauvais pwd`, common_1.HttpStatus.BAD_REQUEST);
    }
    async delete(paramId) {
        const id = +paramId;
        const delUser = await this.repository.delete(id);
        return delUser.affected > 0;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map