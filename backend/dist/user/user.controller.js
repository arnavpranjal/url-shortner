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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class signUpDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], signUpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], signUpDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], signUpDto.prototype, "name", void 0);
let UserController = class UserController {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async signUp(signupdto) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: signupdto.email },
            });
            if (existingUser) {
                return { message: 'user Already Registred' };
            }
            const { email, password, name } = signupdto;
            await this.prisma.user.create({ data: { email, password, name } });
            return { message: 'User successfully registered' };
        }
        catch (errors) {
            throw new common_1.BadRequestException(errors);
        }
    }
    async updatePassword(email, password) {
        try {
            await this.prisma.user.update({ where: { email }, data: { password } });
            return { message: 'password successfully updated' };
        }
        catch (error) {
            return { message: 'Unknow Error Occurred' };
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signUpDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('update-password'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [])
], UserController);
//# sourceMappingURL=user.controller.js.map