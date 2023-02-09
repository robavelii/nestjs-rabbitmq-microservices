import { RabbitMqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Yup from 'yup';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Yup.object({
        RABBIT_MQ_URI: Yup.string().required(),
        RABBIT_MQ_BILLING_QUEUE: Yup.string().required(),
      }),
    }),
    RabbitMqModule,
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
