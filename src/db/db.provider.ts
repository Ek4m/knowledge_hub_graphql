import { Sequelize } from 'sequelize-typescript';
import { CategoryEntity } from 'src/category/category.model';
import { CommentEntity } from 'src/comment/comment.model';
import { DocEntity } from 'src/document/doc.model';
import { ProfileEntity } from 'src/profile/profile.model';
import { UserEntity } from 'src/user/user.model';

export const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT! || 3306,
  database: process.env.DB_NAME || 'dkh',
  password: process.env.DB_PASSWORD || '',
  username: process.env.DB_USER || 'root',
  dialect: 'mysql',
});

export const DbConfig = {
  provide: 'SEQUELIZE',
  useFactory: async () => {
    sequelize.addModels([
      UserEntity,
      ProfileEntity,
      DocEntity,
      CategoryEntity,
      CommentEntity,
    ]);
    await sequelize.sync({ alter: true });
    return sequelize;
  },
};
