import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface cobaAttributes {
  id: string;
  name?: string;
}

@Table({ tableName: 'coba', schema: 'public', timestamps: false })
export class coba
  extends Model<cobaAttributes, cobaAttributes>
  implements cobaAttributes
{
  @Column({ primaryKey: true, type: DataType.STRING })
  @Index({ name: 'coba_pkey', using: 'btree', unique: true })
  id!: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  name?: string;
}
