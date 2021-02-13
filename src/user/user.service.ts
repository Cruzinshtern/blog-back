import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./models/user.entity";
import { Repository } from "typeorm";
import { from, Observable, of } from "rxjs";
import { AuthService } from "../auth/service/auth.service";
import { map, switchMap } from "rxjs/operators";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  create(user: UserEntity): Observable<UserEntity> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((passwordHash: string) => {
        const newUser = new UserEntity();
        newUser.name = user.name;
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.password = passwordHash;
        newUser.role = user.role;

        return from(this.userRepository.save(newUser));
      }),
    );
  }

  findOne(id: string): Observable<UserEntity> {
    return from(this.userRepository.findOne(id));
  }

  findAll(): Observable<UserEntity[]> {
    return from(this.userRepository.find());
  }

  findByEmail(email: string): Observable<UserEntity> {
    return from(this.userRepository.findOne({ email }));
  }

  updateOne(id: string, user: UserEntity): Observable<any> {
    return from(this.userRepository.update(id, user));
  }

  deleteOne(id: string): Observable<any> {
    return from(this.userRepository.delete(id));
  }

  validateUser(email: string, password: string): Observable<any> {
    return this.findByEmail(email).pipe(
      switchMap((user: UserEntity) =>
        this.authService.comparePasswords(password, user.password).pipe(
        map((match: boolean) => {
          if (match) {
            return user;
          } else {
            throw Error;
          }
        })
      ))
    )
  }

  login(user): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: UserEntity) => {
        if(user) {
          return this.authService.generateJWT(user).pipe(
            map((token: string) => token)
          )
        } else {
          return 'Wrong credentials';
        }
      }),
    );
  }

}
