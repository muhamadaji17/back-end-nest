import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { customer } from './customer';
import { orders } from './orders';

export interface usersAttributes {
  id?: number;
  username?: string;
  password?: string;
  createdat?: Date;
  updatedat?: Date;
  roles?: string;
  uuid?: string;
}

@Table({ tableName: 'users', schema: 'public', timestamps: false })
export class users
  extends Model<usersAttributes, usersAttributes>
  implements usersAttributes
{
  @ForeignKey(() => customer)
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('users_id_seq'::regclass)"),
  })
  @Index({ name: 'users_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  username?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  password?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('now()'),
  })
  createdat?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  updatedat?: Date;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  roles?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  uuid?: string;

  @BelongsTo(() => customer)
  customer?: customer;

  @HasMany(() => orders, { sourceKey: 'id' })
  orders?: orders[];
}
