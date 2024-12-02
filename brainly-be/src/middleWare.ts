import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { jwt_password } from './config';

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"]
    const decoded = jwt.verify(header as string ,jwt_password)

    if(decoded){
        //@ts-ignore
        req.userId =decoded.id;
        next()
    }else{
        res.status(403).json({
            messgage:'you are not logged in'
        })
    }

}