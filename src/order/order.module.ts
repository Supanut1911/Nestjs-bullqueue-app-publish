import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'transcrypt-queue',
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
