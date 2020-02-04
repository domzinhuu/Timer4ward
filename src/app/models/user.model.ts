export class UserModel {
  _id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  enabled: boolean;
  active: boolean;
}
