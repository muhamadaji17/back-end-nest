import { CanActivate, ExecutionContext, ForbiddenException,Inject,Injectable, SetMetadata } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'
import { users } from 'models';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(Reflector) private reflector: Reflector){}
 async canActivate(context: ExecutionContext){
   const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler())
   if(!requiredRoles){
     return true
   }
    const {headers, req} = context.switchToHttp().getRequest()
    const token = headers.authorization
      try {
        if(!token){
          throw new ForbiddenException('Please Login First')
        }
        const decode: any = jwt.verify(token, process.env.SECRET_KEY)
        const data = await users.findOne({
          where:{
            roles:decode.roles
          }
        })
        const compare = requiredRoles.some((role) => data.roles.includes(role))
        // console.log(compare)
        if(!compare){
          throw new Error('Forbidden Resource')
        }
        // console.log(compare)
        // console.log(requiredRoles)
        return true
        // return true
      } catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
          throw new ForbiddenException('unauthorization')
        }
      }
    }
  }

export class RolesService {
  async getRoles(Roles: string): Promise<any>{
    const roles = await users.findOne({
      where:{
        roles: Roles
      }
    })
    return roles
  }
}
