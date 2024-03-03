import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from "./user/user.module"
import { AuthModule } from "./auth/auth.module"
import { FriendRequestModule } from "./friend/friend-request.module"
import { CommentModule } from "./comment/comment.module"
import { join } from "path"
import { ServeStaticModule } from "@nestjs/serve-static"

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: 3306,
      host: "db",
      entities: [__dirname + "/entities/*.entity{.tx,.js}"],
      synchronize: true,
      dropSchema: true,
    }),
    UserModule,
    AuthModule,
    FriendRequestModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
