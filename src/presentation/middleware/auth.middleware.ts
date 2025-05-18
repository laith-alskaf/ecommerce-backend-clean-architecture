import { Request, Response, NextFunction } from 'express';
import { excludedPathsForAuth, Messages, StatusCodes } from '../config/constant';
import { UserRepository } from '../../domain/repository/user.repository';
import { CONFIG } from '../config/env';
import { TokenService } from '../../domain/services/token.service';
import { ResponseHandling } from '../../application/response/handleRespose';

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
                role?: string;
            };
        }
    }
}

export const authMiddleware = (tokenService: TokenService, userRepository: UserRepository) => {

    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        // Check if the current path matches any excluded path
        const isExcluded = excludedPathsForAuth.some(path => {
            if (typeof path === "string") {
                return req.path === path;
            }
            if (path instanceof RegExp) {
                return path.test(req.path);
            }
            return false;
        });

        if (isExcluded) {
            return next();
        }
        try {
            const token = req.header('Authorization')?.split('Bearer ')[1];
            if (!token) { throw new Error(Messages.AUTH.AUTHENTICATION_REQUIRED_EN); }

            const userInfo = await tokenService.verify(token!, CONFIG.JWT_SECRET_ACCESS_TOKEN) as { id: string, role: string };
            const user = await userRepository.findById(userInfo.id);
            if (user) {
                req.user = {
                    id: userInfo.id,
                    role: userInfo.role
                };
                next();
            }
            else {
                throw new Error(Messages.AUTH.INVALID_TOKEN_EN);
            }

        } catch (error: any) {
            return ResponseHandling.handleResponse({ res, statusCode: StatusCodes.BAD_REQUEST, message: error.message });
        }
    };
};


