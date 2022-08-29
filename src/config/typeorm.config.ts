import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';

export const getTypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'order',
  entities: [Order],
  logging: true,
};
