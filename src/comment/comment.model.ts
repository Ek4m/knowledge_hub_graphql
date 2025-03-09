import { Field, ObjectType } from '@nestjs/graphql';
import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Model,
  Column,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { DocEntity } from 'src/document/doc.model';

@ObjectType()
@Table({ tableName: 'comments' })
export class CommentEntity extends Model {
  @Field()
  @Column({ primaryKey: true, type: DataTypes.INTEGER })
  declare id: number;

  @Field()
  @Column({
    type: DataTypes.TEXT('medium'),
    allowNull: false,
  })
  declare content: string;

  @Field()
  @ForeignKey(() => DocEntity)
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare docId: string;

  @Field(() => DocEntity)
  @BelongsTo(() => DocEntity)
  declare doc: DocEntity;
}
