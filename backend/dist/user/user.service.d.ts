export type User = any;
export declare class UserService {
    private prisma;
    constructor();
    findOne(email: string): Promise<User | undefined>;
}
