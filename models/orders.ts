import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { order_detail } from './order_detail';
import { users } from './users';

export interface ordersAttributes {
  id?: number;
  users_id?: number;
  total_product?: number;
  total_price?: string;
  createdat?: Date;
  updatedat?: Date;
}

@Table({ tableName: 'orders', schema: 'public', timestamps: false })
export class orders
  extends Model<ordersAttributes, ordersAttributes>
  implements ordersAttributes
{
  @ForeignKey(() => order_detail)
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('orders_id_seq'::regclass)"),
  })
  @Index({ name: 'orders_pkey', using: 'btree', unique: true })
  id?: number;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  users_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  total_product?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  total_price?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('now()'),
  })
  createdat?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('now()'),
  })
  updatedat?: Date;

  @BelongsTo(() => order_detail)
  order_detail?: order_detail;

  @BelongsTo(() => users)
  user?: users;
}
