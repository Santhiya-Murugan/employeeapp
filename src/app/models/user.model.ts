import { Status } from './asset.model';
type admin = {
  adminId: number;
  firstName: string;
  lastName: string;
  phoneno: string;
  email: string;
  password: string | null;
  status: Status | null;
};
type user = {
  userId: number;
  firstName: string;
  lastName: string;
  phoneno: string;
  email: string;
  password: string;
  status: Status | null;
};
enum authStatus {
  Active,
  Inactive
};

export { admin, user,authStatus };
