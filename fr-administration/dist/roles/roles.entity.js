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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const users_entity_1 = require("../users/users.entity");
const associations_entity_1 = require("../associations/associations.entity");
const typeorm_1 = require("typeorm");
let Role = class Role {
};
exports.Role = Role;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Role.prototype, "idUser", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Role.prototype, "idAssociation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.roles, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'idUser' }),
    __metadata("design:type", users_entity_1.User)
], Role.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => associations_entity_1.Association, (association) => association.roles),
    (0, typeorm_1.JoinColumn)({ name: 'idAssociation' }),
    __metadata("design:type", associations_entity_1.Association)
], Role.prototype, "association", void 0);
exports.Role = Role = __decorate([
    (0, typeorm_1.Entity)('roles')
], Role);
//# sourceMappingURL=roles.entity.js.map