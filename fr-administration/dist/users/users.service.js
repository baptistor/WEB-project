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
const bcrypt = require("bcrypt");
const roles_entity_1 = require("../roles/roles.entity");
let UsersService = class UsersService {
    constructor(repository, rolesRepository) {
        this.repository = repository;
        this.rolesRepository = rolesRepository;
    }
    async create(lastname, firstname, age, password) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const newUser = await this.repository.create({
            lastname: firstname,
            firstname: lastname,
            age: age,
            password: hash
        });
        return await this.repository.save(newUser);
    }
    async getAll() {
        return await this.repository.find();
    }
    async getById(id) {
        return await this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
    }
    async getAllRolesById(paramId) {
        const id = +paramId;
        return await this.rolesRepository.find({ where: { idUser: paramId } });
    }
    async update(id, lastname, firstname, age, password) {
        const u = await this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
        if (!u) {
            return undefined;
        }
        if (firstname !== undefined && firstname !== "") {
            u.firstname = firstname;
        }
        if (lastname !== undefined && lastname !== "") {
            u.lastname = lastname;
        }
        if (age !== undefined) {
            u.age = age;
        }
        if (password !== undefined && password !== "") {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            u.password = hash;
        }
        return await this.repository.save(u);
    }
    async delete(id) {
        const u = await this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
        if (!u) {
            return undefined;
        }
        await this.repository.delete(id);
        return u;
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