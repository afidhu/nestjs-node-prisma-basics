/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext,UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private   jwtService: JwtService){}
 async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = context.switchToHttp().getRequest().headers['authorization'];
        const request = context.switchToHttp().getRequest();
   if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // 💡 Here the JWT secret key that's used for verifying the payload 
      // is the key that was passed in the JwtModule
      const payload = await this.jwtService.verifyAsync(token);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      console.log('pyloadUser:',payload)
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  
}

