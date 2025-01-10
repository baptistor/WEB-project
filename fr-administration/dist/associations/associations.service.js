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
const minute_entity_1 = require("../minute/minute.entity");
const roles_service_1 = require("../roles/roles.service");
let AssociationsService = class AssociationsService {
    constructor(repository, userRepository, minuteRepository, roleServ) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.minuteRepository = minuteRepository;
        this.roleServ = roleServ;
    }
    async toAssociationDTO(association) {
        const members = await Promise.all((association.users ?? []).map(async (user) => {
            let role = user.roles?.find(role => role.association?.id === association.id);
            if (!role) {
                role = await this.roleServ.create('Membre', user.id, association.id);
            }
            return new associations_member_1.Member(user.id, user.lastname, user.firstname, user.age, role.name);
        }));
        return new associations_dto_1.AssociationDTO(association.id, association.name, members);
    }
    async getAll() {
        const s = await this.repository.find({ relations: ['users', 'users.roles', 'users.roles.association'] });
        return Promise.all(s.map(asso => this.toAssociationDTO(asso)));
    }
    async getById(id) {
        const s = await this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) }, relations: ['users', 'users.roles', 'users.roles.association'] });
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
        const asso = await this.repository.save(newAssociation);
        await this.roleServ.create('Président', idUsers[0], asso.id);
        return await this.getById(asso.id);
    }
    async update(id, idUsers, name) {
        const s = await this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
        if (!s) {
            return undefined;
        }
        let idPres = 0;
        if (idUsers !== undefined) {
            const users = await this.userRepository.find({ where: { id: (0, typeorm_2.In)(idUsers) } });
            if (users.length !== idUsers.length) {
                return undefined;
            }
            let index = 0;
            while (index < s.roles.length) {
                if (s.roles[index].name === 'Président') {
                    idPres = s.roles[index].idUser;
                    break;
                }
                else {
                    index++;
                }
            }
            if (index === s.roles.length) {
                console.log("PAS DE PRESIDENT DANS L ASSO = PROBLEME");
                throw new common_1.HttpException(`PAS DE PRESIDENT DANS L ASSO = PROBLEME`, common_1.HttpStatus.NOT_FOUND);
            }
            for (let i = 0; i < s.roles.length; i++) {
                await this.roleServ.delete(s.roles[i].idUser, id);
            }
            s.users = users;
        }
        if (name !== undefined) {
            s.name = name;
        }
        await this.repository.save(s);
        await this.roleServ.create('Président', +idPres, id);
        return await this.getById(s.id);
    }
    async delete(id) {
        const s = await this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
        if (!s) {
            return undefined;
        }
        for (let i = 0; i < s.roles.length; i++) {
            await this.roleServ.delete(+s.roles[i].idUser, id);
        }
        const assoSupp = await this.repository.delete(id);
        return assoSupp.affected > 0;
    }
    async getMembers(id) {
        const s = await this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) }, relations: ['users', 'users.roles', 'users.roles.association'] });
        if (!s) {
            return undefined;
        }
        return s.users;
    }
    async getMinutes(id, sort, order) {
        const minutes = await this.minuteRepository.find({ where: { idAssociation: (0, typeorm_2.Equal)(id) }, order: { [sort]: order }, });
        if (!minutes) {
            return undefined;
        }
        return minutes;
    }
};
exports.AssociationsService = AssociationsService;
exports.AssociationsService = AssociationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(associations_entity_1.Association)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(minute_entity_1.Minute)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        roles_service_1.RolesService])
], AssociationsService);
//# sourceMappingURL=associations.service.js.map