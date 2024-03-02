import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from "./user/user.module"
import { AuthModule } from "./auth/auth.module"
import { RoomModule } from './room/room.module';

@Module({
  imports: [
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
    }),
    UserModule,
    AuthModule,
    RoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
