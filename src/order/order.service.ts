import { InjectQueue } from '@nestjs/bull';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Order } from 'src/entity/order.entity';
import { Like, Repository } from 'typeorm';
import { ReturnAddOrderType } from 'types/returnAddOrderType';
import { IOrderDto } from './DTO/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectQueue('transcrypt-queue') private queue: Queue,
  ) {}

  // async getOrderDay(skip: number, take: number) {
  //   try {
  //     return await this.orderRepo.findAndCount({
  //       skip,
  //       take,
  //     });
  //   } catch (error) {}
  // }

  // async getDataLoopCount(today: string) {
  //   try {
  //     // return await this.orderRepo.findAndCount({
  //     //   where: {
  //     //     createAt: Like(`%${today}%`)
  //     //   }
  //     // });

  //     return await this.orderRepo
  //       .createQueryBuilder('order')
  //       .where('TO_CHAR(order.createAt) like :today', { today: `%${today}%` })
  //       // .where('LOWER(order.createAt) like :today', {
  //       //   today: `%${today}%`,
  //       // })
  //       .take()
  //       .skip()
  //       .getManyAndCount();
  //   } catch (error) {
  //     console.log(`error=>`, error.message);
  //   }
  // }

  async addOrder(orderDto: IOrderDto): Promise<ReturnAddOrderType> {
    const {
      date,
      payAmount,
      payToken,
      amountOut,
      tokenSymbol,
      exhangeRateTHB,
      price,
      fee,
      feeAmount,
      transcationblogScanner,
      receiveType,
    } = orderDto;
    const order = this.orderRepo.create();
    try {
      order.payAmount = payAmount;
      order.payToken = payToken;
      order.amountOut = amountOut;
      order.tokenSymbol = tokenSymbol;
      order.excgangeRateTHB = exhangeRateTHB;
      order.fee = fee;
      order.feeAmount = feeAmount;
      order.transactionBlogScanner = transcationblogScanner;
      order.receiveType = receiveType;

      const orderSaved = await this.orderRepo.save(order);

      //add to queue and publish to redis
      await this.queue.add(`transcrypt-tx-message`, {
        payload: JSON.stringify(orderSaved),
      });

      await this.queue.add(`transcrypt-info-message`, {
        payload: JSON.stringify(orderSaved),
      });

      return {
        id: order.id,
        message: `add success & publish to queue success`,
      };
    } catch (error) {
      throw new HttpException(`error message: ${error}`, 400);
    }
  }
}
