import { UrlService } from './url.service';
declare class createUrlDto {
    originalUrl: string;
    id?: number | null;
}
export declare class UrlController {
    private urlService;
    private prisma;
    constructor(urlService: UrlService);
    createUrl(createurlDto: createUrlDto): Promise<{
        message: string;
        shortcode: string;
    }>;
    getUrl(id: string): Promise<{
        id: number;
        originalUrl: string;
        shortCode: string;
        createdAt: Date;
        userId: number | null;
        isActive: boolean;
        Clicks: number;
    }[]>;
    deleteUrl(id: string): Promise<{
        result: {
            id: number;
            originalUrl: string;
            shortCode: string;
            createdAt: Date;
            userId: number | null;
            isActive: boolean;
            Clicks: number;
        };
        message: string;
    }>;
    toggleStatus(id: string): Promise<{
        result: {
            id: number;
            originalUrl: string;
            shortCode: string;
            createdAt: Date;
            userId: number | null;
            isActive: boolean;
            Clicks: number;
        };
        message: string;
    }>;
}
export {};
