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
exports.UrlController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
const url_service_1 = require("./url.service");
const auth_guard_1 = require("../auth/auth.guard");
class createUrlDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createUrlDto.prototype, "originalUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], createUrlDto.prototype, "id", void 0);
let UrlController = class UrlController {
    constructor(urlService) {
        this.urlService = urlService;
        this.prisma = new client_1.PrismaClient();
    }
    async createUrl(createurlDto) {
        return await this.urlService.createUrl(createurlDto.originalUrl, createurlDto.id);
    }
    async getUrl(id) {
        const numericId = id ? parseInt(id, 10) : null;
        return await this.urlService.getUrl(numericId);
    }
    async deleteUrl(id) {
        const numericId = parseInt(id, 10);
        return await this.urlService.deleteUrl(numericId);
    }
    async toggleStatus(id) {
        const numericId = parseInt(id, 10);
        return await this.urlService.toggleStatus(numericId);
    }
};
exports.UrlController = UrlController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUrlDto]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "createUrl", null);
__decorate([
    (0, common_1.Get)('get/:id?'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "getUrl", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "deleteUrl", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('toggle/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "toggleStatus", null);
exports.UrlController = UrlController = __decorate([
    (0, common_1.Controller)('url'),
    __metadata("design:paramtypes", [url_service_1.UrlService])
], UrlController);
//# sourceMappingURL=url.controller.js.map