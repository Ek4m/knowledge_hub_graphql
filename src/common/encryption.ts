import * as bcrypt from 'bcrypt';

export class Encryption {
  static hashPassword(password: string) {
    const salts = bcrypt.genSaltSync(5);
    const newPassword = bcrypt.hashSync(password, salts);
    return newPassword;
  }

  static validate(password: string, hashed: string) {
    return bcrypt.compareSync(password, hashed);
  }
}
