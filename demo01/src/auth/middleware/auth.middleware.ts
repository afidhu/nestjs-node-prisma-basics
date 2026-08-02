/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...');
    const user = req.body
    console.log(user)

    if(user.name == 'Juma' && user.age == 10){
      console.log('User is valid');
      next();
    } else {
      console.log('User is invalid');
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
