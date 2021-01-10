import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../../user/models/user.entity";
import { from, Observable, of } from "rxjs";

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) {
  }

  generateJWT(user: UserEntity): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 10));
  }

  comparePasswords(newPassword: string, hashedPassword: string): Observable<any | boolean> {
    return of<any | boolean>(bcrypt.compare(newPassword, hashedPassword));
  }
}
