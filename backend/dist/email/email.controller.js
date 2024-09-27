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
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
const client_1 = require("@prisma/client");
let EmailController = class EmailController {
    constructor(configService) {
        this.configService = configService;
        this.prisma = new client_1.PrismaClient();
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_PASS'),
            },
        });
    }
    async sendCode(email) {
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        const mailOptions = {
            from: this.configService.get('EMAIL_USER'),
            to: email,
            subject: 'Your Verification Code',
            text: `Your 4-digit verification code is: ${code}`,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            const existingOtp = await this.prisma.otp.findUnique({
                where: { email },
            });
            if (existingOtp) {
                await this.prisma.otp.update({ where: { email }, data: { code } });
            }
            else {
                await this.prisma.otp.create({ data: { email, code } });
            }
            return { message: 'Code sent successfully' };
        }
        catch (error) {
            return { message: 'Failed to send code', error: error.message };
        }
    }
    async verfiyCode(code, email) {
        try {
            console.log(code);
            const oldUser = await this.prisma.user.findUnique({
                where: { email: email },
            });
            if (oldUser) {
                return { message: 'User with email already exists' };
            }
            const generateCode = await this.prisma.otp.findUnique({
                where: { email },
            });
            console.log(generateCode);
            if (!generateCode) {
                return { message: 'email not registered' };
            }
            if (generateCode.code == code) {
                return { message: 'email verified', email: email };
            }
            else {
                return { message: 'wrong code' };
            }
        }
        catch (error) {
            return { message: error.message };
        }
    }
    async sendCodePasswordReset(email) {
        const oldUser = await this.prisma.user.findUnique({ where: { email } });
        if (!oldUser) {
            return { message: 'Not a registered Email' };
        }
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        const mailOptions = {
            from: this.configService.get('EMAIL_USER'),
            to: email,
            subject: 'Your Verification Code',
            text: `Your 4-digit verification code is: ${code}`,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            const existingOtp = await this.prisma.otp.findUnique({
                where: { email },
            });
            if (existingOtp) {
                await this.prisma.otp.update({ where: { email }, data: { code } });
            }
            else {
                await this.prisma.otp.create({ data: { email, code } });
            }
            return { message: 'Code sent successfully' };
        }
        catch (error) {
            return { message: 'Failed to send code', error: error.message };
        }
    }
    async verfiyCodePasswordReset(code, email) {
        try {
            console.log(code);
            const generateCode = await this.prisma.otp.findUnique({
                where: { email },
            });
            if (generateCode.code == code) {
                return { message: 'Email Verified', email: email };
            }
            else {
                return { message: 'wrong code' };
            }
        }
        catch (error) {
            return { message: error.message };
        }
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Post)('send-code'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendCode", null);
__decorate([
    (0, common_1.Post)('verify-code'),
    __param(0, (0, common_1.Body)('value')),
    __param(1, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "verfiyCode", null);
__decorate([
    (0, common_1.Post)('send-code-password-reset'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendCodePasswordReset", null);
__decorate([
    (0, common_1.Post)('verify-code-password-reset'),
    __param(0, (0, common_1.Body)('value')),
    __param(1, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "verfiyCodePasswordReset", null);
exports.EmailController = EmailController = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.Controller)('email'),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailController);
//# sourceMappingURL=email.controller.js.map