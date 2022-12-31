import { PORT } from './constants';
import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbConfig } from './config/typeormConfig';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forRoot(DbConfig),
    CacheModule.register({ isGlobal: true, ttl: 1000 * 60 * 60 * 24 * 365 }),
    MailerModule.forRoot({
      // transport: 'smtps://ntmanhvp2k@gmail.com:themanh2k@smtp.gmail.com',
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: 'ntmanhvp2k@gmail.com',
          pass: 'wkyzuybarlayrazi',
        },
      },
      // defaults: {
      //   from: '"No reply" <noreply@sendgrid.net>',
      // },
      // template: {
      //   dir: __dirname + '/templates',
      //   adapter: new HandlebarsAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
