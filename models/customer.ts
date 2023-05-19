import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { users } from './users';

export interface customerAttributes {
  id?: number;
  first_name?: string;
  last_name?: string;
  users_id?: number;
  createdat?: Date;
  updatedat?: Date;
}

@Table({ tableName: 'customer', schema: 'public', timestamps: false })
export class customer
  extends Model<customerAttributes, customerAttributes>
  implements customerAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('customer_id_seq'::regclass)"),
  })
  @Index({ name: 'customer_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  first_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  last_name?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  users_id?: number;

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

  @HasOne(() => users, { sourceKey: 'users_id' })
  user?: users;
}
