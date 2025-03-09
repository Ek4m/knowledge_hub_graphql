import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DataTypes } from 'sequelize';
import {
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { DocEntity } from 'src/document/doc.model';
import { UserEntity } from 'src/user/user.model';

@ObjectType()
@Table({ tableName: 'categories' })
export class CategoryEntity extends Model {
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
  declare name: string;

  @Field(() => Int)
  @ForeignKey(() => UserEntity)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  declare createdBy: number;

  @HasMany(() => DocEntity)
  documents: DocEntity[];
}
