import { Status } from './asset.model';
type user = {
  adminId: number;
  firstName: string;
  lastName: string;
  phoneno: string;
  email: string;
  password: string;
  status: Status | null;
};

export { user };
