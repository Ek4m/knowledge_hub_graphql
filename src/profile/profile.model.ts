import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DataTypes } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from 'src/user/user.model';

@ObjectType()
@Table({ tableName: 'profiles' })
export class ProfileEntity extends Model {
  @Field(() => Int)
  @AutoIncrement
  @Column({ primaryKey: true, type: DataTypes.INTEGER })
  declare id: number;

  @Field(() => Int)
  @ForeignKey(() => UserEntity)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;

  @Field()
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare firstName: string;

  @Field()
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare lastName: string;
}
