import { RedirectService } from './redirect.service';
import { Response } from 'express';
export declare class RedirectController {
    private redirectService;
    constructor(redirectService: RedirectService);
    redirect(shortcode: string, res: Response): Promise<void>;
}
