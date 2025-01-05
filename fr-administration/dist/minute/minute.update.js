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
exports.MinuteUpdate = void 0;
const swagger_1 = require("@nestjs/swagger");
class MinuteUpdate {
}
exports.MinuteUpdate = MinuteUpdate;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The content of the minute, should relate the accepted motions',
        example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et sagittis sem. Praesent sollicitudin lacus.",
        type: String,
    }),
    __metadata("design:type", String)
], MinuteUpdate.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ids of the voters. These should be the same than the users that are members of the association',
        example: "1,2,3",
        type: Int32Array,
    }),
    __metadata("design:type", Array)
], MinuteUpdate.prototype, "idVoters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date when the general assembly occured',
        example: "12/12/2021",
        type: String,
    }),
    __metadata("design:type", String)
], MinuteUpdate.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The id of the association',
        example: "1",
        type: Number,
    }),
    __metadata("design:type", Number)
], MinuteUpdate.prototype, "idAssociation", void 0);
//# sourceMappingURL=minute.update.js.map