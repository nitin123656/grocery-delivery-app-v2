declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                isAdmin?: boolean;
                email?: string;
                name?: string;
                role?: string;
            };
            partner?: {
                id: string;
                name: string;
                email: string;
                phone: string;
                avatar?: string | null;
                vehicleType?: string | null;
                isActive?: boolean | null;
            };
        }
    }
}

export {};