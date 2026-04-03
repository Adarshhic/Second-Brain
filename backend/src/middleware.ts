import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';   
import { config } from './config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
   try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    (req as any).userId = decoded.id; 
    next();
} catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
}
}