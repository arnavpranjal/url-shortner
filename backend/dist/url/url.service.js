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
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let UrlService = class UrlService {
    constructor() {
        this.characterList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        this.prisma = new client_1.PrismaClient();
    }
    getShortCode() {
        let result = '';
        for (let i = 0; i < 8; ++i) {
            result += this.characterList.charAt(Math.floor(Math.random() * this.characterList.length));
        }
        return result;
    }
    async createUrl(url, id) {
        const shortCode = this.getShortCode();
        let data;
        if (id) {
            data = { originalUrl: url, userId: id, shortCode: shortCode };
        }
        else {
            data = { originalUrl: url, shortCode: shortCode };
        }
        await this.prisma.url.create({
            data: data,
        });
        return { message: 'Short Url Created', shortcode: shortCode };
    }
    async getUrl(id) {
        const result = await this.prisma.url.findMany({ where: { userId: id } });
        return result;
    }
    async deleteUrl(id) {
        const result = await this.prisma.url.delete({ where: { id: id } });
        return { result, message: 'link deleted successfully' };
    }
    async toggleStatus(id) {
        const link = await this.prisma.url.findUnique({ where: { id: id } });
        const newStatus = !link?.isActive;
        const result = await this.prisma.url.update({
            data: { isActive: newStatus },
            where: { id: id },
        });
        return { result, message: 'Link Status Toggled' };
    }
};
exports.UrlService = UrlService;
exports.UrlService = UrlService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UrlService);
//# sourceMappingURL=url.service.js.map