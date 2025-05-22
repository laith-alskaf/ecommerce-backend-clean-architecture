import { Request, Response, NextFunction } from 'express';

import { ApplicationError } from '../../application/errors/application-error';
import { ApplicationResponse } from '../../application/response/application-resposne';


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof ApplicationError) {
        return new ApplicationResponse(res, {
            success: false,
            message: err.message,
        }).send()
    }

    return new ApplicationResponse(res, {
        success: false,
        message: err.message || 'Internal Server Error',
    }).send()

};

export const notFoundHandler = (req: Request, res: Response) => {
    return new ApplicationResponse(res, {
        success: false,
        message: `Not Found - ${req.originalUrl}`,
    }).send()
};
