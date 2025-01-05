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
exports.AssociationsService = void 0;
const common_1 = require("@nestjs/common");
const associations_entity_1 = require("./associations.entity");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const associations_dto_1 = require("./associations.dto");
const associations_member_1 = require("./associations.member");
let AssociationsService = class AssociationsService {
    constructor(repository, userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }
    async toAssociationDTO(association) {
        const members = association.users.map(user => {
            const role = user.roles?.find(role => role.association?.id === association.id);
            return new associations_member_1.Member(user.lastname, user.firstname, user.age, role?.name || undefined);
        });
        return new associations_dto_1.AssociationDTO(association.name, members);
    }
    async getAll() {
        const s = await this.repository.find();
        return Promise.all(s.map(asso => this.toAssociationDTO(asso)));
    }
    async getById(id) {
        const s = await this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
        return await this.toAssociationDTO(s);
    }
    async create(idUsers, name) {
        const users = await this.userRepository.find({ where: { id: (0, typeorm_2.In)(idUsers) } });
        if (users.length !== idUsers.length) {
            return undefined;
        }
        const newAssociation = await this.repository.create({
            name,
            users
        });
        await this.repository.save(newAssociation);
        return await this.toAssociationDTO(newAssociation);
    }
    async update(id, idUsers, name) {
        const s = await this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
        if (!s) {
            return undefined;
        }
        if (idUsers !== undefined) {
            const users = await this.userRepository.find({ where: { id: (0, typeorm_2.In)(idUsers) } });
            if (users.length !== idUsers.length) {
                return undefined;
            }
            s.users = users;
        }
        if (name !== undefined) {
            s.name = name;
        }
        await this.repository.save(s);
        return await this.toAssociationDTO(s);
    }
    async delete(id) {
        const s = await this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
        if (!s) {
            return undefined;
        }
        await this.repository.delete(id);
        return await this.toAssociationDTO(s);
    }
    async getMembers(id) {
        const s = await this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) }, relations: ['users'] });
        if (!s) {
            return undefined;
        }
        return s.users;
    }
};
exports.AssociationsService = AssociationsService;
exports.AssociationsService = AssociationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(associations_entity_1.Association)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AssociationsService);
//# sourceMappingURL=associations.service.js.map