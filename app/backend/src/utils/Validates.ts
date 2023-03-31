import * as bcrypt from 'bcryptjs';

class Validates {
  public static validatePassword(password:string, userPassword:string) {
    const decryptPass = bcrypt.compareSync(password, userPassword);
    return decryptPass;
  }
}
export default Validates;
