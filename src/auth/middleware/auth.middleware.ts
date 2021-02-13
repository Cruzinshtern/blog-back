import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from "@nestjs/jwt";


export const private_key = 'secret';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly jwtService: JwtService) {
  }
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    const result = this.jwtService.verifyAsync(token);

    next();
  }
}
