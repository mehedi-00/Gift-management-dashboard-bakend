import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_srcret: process.env.JWT_ACCESS_SECRET,
  jwt_expirs_in: process.env.JWT_ACCESS_EXPIRS_IN,
  manager_password: process.env.MANAGER_PASSWORD,
};
