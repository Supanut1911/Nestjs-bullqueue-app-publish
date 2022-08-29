import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'DTO/pagination.dto';
import { Order } from 'src/entity/order.entity';
import { Repository } from 'typeorm';
import { ReturnAddOrderType } from 'types/returnAddOrderType';
import { IOrderDto } from './DTO/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    private readonly orderService: OrderService,
  ) {}

  // @Post('')
  // async getOrderDay(@Query() query: PaginationDto, @Req() req: any) {
  //   const take = +query.limit || 10;
  //   const page: number = +query.page || 1;
  //   const skip = (page - 1) * take;
  //   const [data, total] = await this.orderService.getOrderDay(skip, take);

  //   return {
  //     data,
  //     page,
  //     total,
  //   };
  // }

  // @Get('/loop_count')
  // async getDataLoopCount(
  //   @Body('today') today: string,
  //   @Body('key') key: string,
  // ) {
  //   console.log(`>>`, today, key);

  //   // const [data, total] = await this.orderService.getDataLoopCount(today);
  //   const [data, total] = await this.orderService.getDataLoopCount(today);
  //   console.log('zzzz => ', Math.floor(total / 10 + 1));

  //   return {
  //     totalPage: Math.floor(total / 10 + 1),
  //   };
  // }

  @Post()
  async addOrder(@Body() orderDto: IOrderDto): Promise<ReturnAddOrderType> {
    return await this.orderService.addOrder(orderDto);
  }
}
