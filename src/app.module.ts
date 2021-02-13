import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { AuthMiddleware } from "./auth/middleware/auth.middleware";
import { UserController } from "./user/user.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({}),
    AuthModule,
    UserModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
