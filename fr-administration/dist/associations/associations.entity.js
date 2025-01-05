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
exports.Association = void 0;
const users_entity_1 = require("../users/users.entity");
const roles_entity_1 = require("../roles/roles.entity");
const typeorm_1 = require("typeorm");
let Association = class Association {
};
exports.Association = Association;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Association.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => users_entity_1.User),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Association.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Association.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => roles_entity_1.Role, role => role.association, { eager: true }),
    __metadata("design:type", roles_entity_1.Role)
], Association.prototype, "roles", void 0);
exports.Association = Association = __decorate([
    (0, typeorm_1.Entity)()
], Association);
//# sourceMappingURL=associations.entity.js.map