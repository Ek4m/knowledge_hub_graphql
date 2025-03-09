import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { CategoryEntity } from 'src/category/category.model';
import { UserEntity } from 'src/user/user.model';

@ObjectType()
@Table({ tableName: 'documents' })
export class DocEntity extends Model {
  @Field()
  @Column({
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Field()
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare title: string;

  @Field()
  @Column({
    type: DataTypes.TEXT('long'),
    allowNull: false,
  })
  declare content: string;

  @Field(() => Int)
  @ForeignKey(() => UserEntity)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @Field()
  @ForeignKey(() => CategoryEntity)
  @Column({
    type: DataTypes.STRING,
    defaultValue: 'saa',
    allowNull: false,
  })
  declare categoryId: string;

  @BelongsTo(() => CategoryEntity)
  category: CategoryEntity;

  @BelongsTo(() => UserEntity)
  user: UserEntity;

  @Field()
  @CreatedAt
  declare createdAt: Date;

  @Field()
  @UpdatedAt
  declare updatedAt: Date;

  @Field()
  @DeletedAt
  declare deletedAt?: Date;
}
