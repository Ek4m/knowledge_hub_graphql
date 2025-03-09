import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DataTypes } from 'sequelize';
import {
  AutoIncrement,
  Column,
  CreatedAt,
  DeletedAt,
  HasMany,
  HasOne,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { UserRole } from '../auth/roles';
import { Encryption } from '../common/encryption';
import { ProfileEntity } from '../profile/profile.model';
import { DocEntity } from 'src/document/doc.model';
import { CategoryEntity } from 'src/category/category.model';

type IUserEntity = {
  id: number;
  email: string;
  password: string;
};
@ObjectType()
@Table({ tableName: 'users' })
export class UserEntity extends Model<IUserEntity> {
  @Field(() => Int)
  @AutoIncrement
  @Column({ primaryKey: true, type: DataTypes.INTEGER })
  declare id: number;

  @Field()
  @Column({ type: DataTypes.STRING, allowNull: false })
  declare email: string;

  @Field(() => String)
  @Column({ type: DataTypes.STRING, defaultValue: UserRole.USER })
  declare role: UserRole;

  @Field({ nullable: true })
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) {
      this.setDataValue('password', Encryption.hashPassword(value));
    },
  })
  declare password?: string;

  @HasMany(() => CategoryEntity)
  categoriesCreated: CategoryEntity[];

  @Field(() => ProfileEntity, { nullable: true })
  @HasOne(() => ProfileEntity)
  profile: ProfileEntity;

  @HasMany(() => DocEntity)
  documents: DocEntity[];

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
