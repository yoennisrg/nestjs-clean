import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
    Logger.log(`${req.method.toUpperCase()} ${req.url}`);
    next();
}
