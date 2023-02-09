import { Module } from '@nestjs/common';
import { RabbitMqService } from './rmq.services';

@Module({
  providers: [RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitMqModule {}
