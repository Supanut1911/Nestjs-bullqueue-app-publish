import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'merchant_address', nullable: true })
  merchantAddress: string;

  @Column({ name: 'payer_address', nullable: true })
  payerAddress: string;

  @Column('decimal', {
    precision: 20,
    scale: 6,
    name: 'pay_amount',
    nullable: true,
  })
  payAmount: number;

  @Column({ name: 'pay_token', nullable: true })
  payToken: string;

  @Column({ name: 'transaction_blog_scanner', nullable: true })
  transactionBlogScanner: string;

  @Column('decimal', {
    precision: 20,
    scale: 6,
    name: 'amount_out',
    nullable: true,
  })
  amountOut: number;

  @Column('decimal', { precision: 20, scale: 6, name: 'fee', nullable: true })
  fee: number;

  @Column('decimal', {
    precision: 20,
    scale: 6,
    name: 'fee_amount',
    nullable: true,
  })
  feeAmount: number;

  @Column({ name: 'deadline', nullable: true })
  deadline: string;

  @Column({ name: 'token_symbol', nullable: true })
  tokenSymbol: string;

  @Column({ name: 'status', nullable: true })
  status: string;

  @Column({ name: 'content', nullable: true })
  content: string;

  @Column('decimal', {
    precision: 20,
    scale: 6,
    name: '  excgange_rate_thb',
    nullable: true,
  })
  excgangeRateTHB: number;

  @Column({ name: 'receive_type', nullable: true })
  receiveType: string;

  @CreateDateColumn()
  createdAt: string;
}
