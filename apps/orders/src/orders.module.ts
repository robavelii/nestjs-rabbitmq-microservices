import { DatabaseModule, RabbitMqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Yup from 'yup';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/orders.schema';
import { BILLING_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Yup.object({
        MONGODB_URI: Yup.string().required(),
        PORT: Yup.number().required(),
      }),
      envFilePath: './apps/orders/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    RabbitMqModule.register({
      name: BILLING_SERVICE,
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
