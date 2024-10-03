import { Response } from 'express';
export declare class RedirectService {
    private prisma;
    constructor();
    redirect(shortcode: string, res: Response): Promise<void>;
}
