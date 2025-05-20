import { Request, Response, NextFunction } from 'express';
import { Messages, StatusCodes, UserRoles } from '../config/constant';
import { Model } from 'mongoose';
import { ResponseHandling } from '../../application/response/handleRespose';

export interface IOwnership {
    createdBy: string;
}
export type ResourceDocument<T> = Document & T & IOwnership;

export const checkResourceOwnership = <T extends IOwnership>(
    model: Model<T>,
    idKey: string
) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            if (!req.user) {
                throw new Error(Messages.AUTH.AUTHENTICATION_REQUIRED_EN);
            }
            const resourceId = req.body[idKey] || req.params[idKey];
            const resource = await model.findById(resourceId);
            if (!resource) {
                throw new Error(Messages.GENERAL.INVALID_PARAMETERS_EN);
            }
            const isSuperAdmin = req.user.role === UserRoles.SUPER_ADMIN;
            const isOwner = resource.createdBy === req.user.id;

            if (!isSuperAdmin && !isOwner) {
                return ResponseHandling.send({ res, statusCode: StatusCodes.FORBIDDEN, message: Messages.USER.UNAUTHORIZED_ACTION_EN });
            }
            next();
        } catch (error: any) {
            return ResponseHandling.send({ res, statusCode: StatusCodes.BAD_REQUEST });
        }
    };
};