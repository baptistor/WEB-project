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
const users_service_1 = require("../users/users.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const associations_member_1 = require("./associations.member");
const associations_dto_1 = require("./associations.dto");
let AssociationsService = class AssociationsService {
    constructor(repository, service) {
        this.repository = repository;
        this.service = service;
    }
    async toAssociationDTO(association) {
        const members = association.idUsers.map(user => {
            const role = user.roles?.find(role => role.association?.id === association.id);
            return new associations_member_1.Member(user.name, user.firstname, user.age, role?.name || undefined);
        });
        return new associations_dto_1.AssociationDTO(association.name, members);
    }
    async getAll() {
        const asso = await this.repository.find();
        return Promise.all(asso.map(asso => this.toAssociationDTO(asso)));
    }
    async getById(paramId) {
        const id = +paramId;
        const asso = await this.repository.findOneBy({ id });
        return await this.toAssociationDTO(asso);
    }
    async create(name, users) {
        if ((name !== undefined && users !== undefined)) {
            const tabUsers = [];
            for (let i = 0; i < users.length; i++) {
                const user = await this.service.getById(users[i]);
                if (!user) {
                    throw new common_1.HttpException(`User with ID ${users[i]} not found`, common_1.HttpStatus.NOT_FOUND);
                }
                tabUsers.push(user);
            }
            const asso = this.repository.create({ name, idUsers: tabUsers });
            const savedAsso = await this.repository.save(asso);
            return this.toAssociationDTO(savedAsso);
        }
        return null;
    }
    async update(name, users, paramId) {
        if (name !== undefined && users !== undefined) {
            const asso = await this.repository.findOne({ where: { id: paramId } });
            if (!asso) {
                return null;
            }
            asso.name = name;
            const tabUsers = [];
            for (let i = 0; i < users.length; i++) {
                const user = await this.service.getById(users[i]);
                if (!user) {
                    throw new common_1.HttpException(`User with ID ${users[i]} not found`, common_1.HttpStatus.NOT_FOUND);
                }
                tabUsers.push(user);
            }
            asso.idUsers = tabUsers;
            const updateAsso = await this.repository.save(asso);
            return this.toAssociationDTO(updateAsso);
        }
        throw new common_1.HttpException(`Manque un ou plusieurs paramètres pour mettre à jour le User qui a comme ID : ${paramId}`, common_1.HttpStatus.BAD_REQUEST);
    }
    async delete(paramId) {
        const delAsso = await this.repository.delete(paramId);
        return delAsso.affected > 0;
    }
    async getUserByAssociationId(paramId) {
        const association = await this.repository.findOne({
            where: { id: +paramId },
            relations: ['idUsers'],
        });
        if (!association) {
            return null;
        }
        return association.idUsers;
    }
};
exports.AssociationsService = AssociationsService;
exports.AssociationsService = AssociationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(associations_entity_1.Association)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], AssociationsService);
//# sourceMappingURL=associations.service.js.map