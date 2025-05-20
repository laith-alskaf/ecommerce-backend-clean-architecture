import { NextFunction } from 'express';
import Joi from 'joi';
import { Request, Response } from 'express';
import { ResponseHandling } from '../../application/response/handleRespose';
import { StatusCodes } from '../config/constant';


interface ValidationConfig {
    schema: Joi.ObjectSchema;
    dataSource: 'body' | 'query' | 'params' | 'composite';
    useAsync?: boolean;
};

export const createValidationMiddleware = ({
    schema,
    dataSource,
    useAsync = false
}: ValidationConfig) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
     
            const data = dataSource === 'composite'
                ? { ...req.params, ...req.body }
                : req[dataSource];
            if (useAsync) {
                await validateAsync(data, schema);
            } else {
                validateSync(data, schema);
            }
            next();
        } catch (error: any) {
            ResponseHandling.send({
                res,
                statusCode: StatusCodes.BAD_REQUEST,
                message: error.message
            });
        }
    };
};
const validateAsync = async (data: any, schema: Joi.ObjectSchema) => {
    const { error } = await schema.validateAsync(data, {
        abortEarly: false,
        stripUnknown: true
    });
    if (error) throw new Error(error.message);
};

const validateSync = (data: any, schema: Joi.ObjectSchema) => {
    const { error } = schema.validate(data, {
        abortEarly: false,
        stripUnknown: true
    });
    if (error) throw new Error(error.message);
};