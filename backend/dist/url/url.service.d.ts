export declare class UrlService {
    private prisma;
    constructor();
    private readonly characterList;
    private getShortCode;
    createUrl(url: string, id: number | null): Promise<{
        message: string;
        shortcode: string;
    }>;
    getUrl(id: number | null): Promise<{
        id: number;
        originalUrl: string;
        shortCode: string;
        createdAt: Date;
        userId: number | null;
        isActive: boolean;
        Clicks: number;
    }[]>;
    deleteUrl(id: number): Promise<{
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
    toggleStatus(id: number): Promise<{
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
