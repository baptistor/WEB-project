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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const roles_entity_1 = require("./roles.entity");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
let RolesService = class RolesService {
    constructor(repository, userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }
    async getAll() {
        return this.repository.find();
    }
    async getByUserAndId(paramIdUser, paramIdAsso) {
        const role = await this.repository.findOne({
            where: {
                user: { id: paramIdUser },
                association: { id: paramIdAsso },
            },
        });
        return role;
    }
    async getUserByRolesName(name) {
        const role = await this.repository.find({ where: { name: name } });
        if (!role) {
            return null;
        }
        const user = await Promise.all(role.map(user => {
            return this.userRepository.getById(user.idUser);
        }));
        return user;
    }
    async create(name, idUser, idAssociation) {
        if ((name !== undefined && idUser !== undefined && idAssociation !== undefined)) {
            const role = this.repository.create({ name, idUser, idAssociation });
            return this.repository.save(role);
        }
        return null;
    }
    async update(name, paramIdUser, paramIdAsso) {
        if (name !== undefined) {
            const role = await this.repository.findOne({
                where: {
                    user: { id: paramIdUser },
                    association: { id: paramIdAsso },
                },
            });
            if (!role) {
                return null;
            }
            role.name = name;
            const savedRole = await this.repository.save(role);
            return savedRole;
        }
        throw new common_1.HttpException(`Manque un nom pour le nouveau rôle`, common_1.HttpStatus.BAD_REQUEST);
    }
    async delete(idUser, idAssociation) {
        const delRole = await this.repository.delete({ idUser, idAssociation });
        return delRole.affected > 0;
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], RolesService);
//# sourceMappingURL=roles.service.js.map