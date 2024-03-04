import config from '../config';
import { User } from '../modules/user/user.modal';

const manager = {
  userName: 'admin',
  email: 'admin@gmail.com',
  password: config.manager_password,
  role: 'manager',
};

const seedManager = async () => {
  const existManager = await User.findOne({ role: 'manager' });
  if (!existManager) {
    await User.create(manager);
  }
};

export default seedManager;
