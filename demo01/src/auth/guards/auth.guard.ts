/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Body } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const {body} = context.switchToHttp().getRequest();
    const token = context.switchToHttp().getRequest().headers['authorization'];
   if(!token){
    console.log('No token provided');
    return false;
   } else {
    console.log(token)
    console.log('body', body)
    return true;
  }
}
}
