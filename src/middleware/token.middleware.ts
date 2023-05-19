import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'
import { users } from 'models';

@Injectable()
export class CheckToken implements NestMiddleware {
   use(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization;
    if(!token){
         res.send('Please Login')
    }
    try {
        const decode:any = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(decode,{roles: 'admin'})
        // console.log(decode[1].roles)
        // console.log(decode.roles)
        next();    
    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
            res.send('unauthorization') 
        }
    }

  }
}

export  class CheckRoles implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction){
        try {
            const headers = req.headers.authorization
            const decode:any =jwt.verify(headers, process.env.SECRET_KEY)
           
            if(decode.roles !== 'admin'){
                throw new Error('harus admin')
            }
            next()
        } catch (error) {
            
         res.send(error.message)
        }
    }
}

