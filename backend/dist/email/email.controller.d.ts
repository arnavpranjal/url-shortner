import { ConfigService } from '@nestjs/config';
export declare class EmailController {
    private configService;
    private transporter;
    private prisma;
    constructor(configService: ConfigService);
    sendCode(email: string): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
    verfiyCode(code: string, email: string): Promise<{
        message: string;
        email: string;
    } | {
        message: any;
        email?: undefined;
    }>;
    sendCodePasswordReset(email: string): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
    verfiyCodePasswordReset(code: string, email: string): Promise<{
        message: string;
        email: string;
    } | {
        message: any;
        email?: undefined;
    }>;
}
