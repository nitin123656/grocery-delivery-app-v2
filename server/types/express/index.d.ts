declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email?: string;
                isAdmin?: boolean;
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