import { DeliveryPartner } from "../../generated/prisma/index.js";

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
            partner?: DeliveryPartner;
        }
    }
}

export {};