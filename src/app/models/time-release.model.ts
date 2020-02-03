import { UserModel } from './user.model';
import { CostCenterModel } from './cost-center.model';

export interface TimeReleaseModel {
  _id?: string;
  hour: number;
  minute?: number;
  user: UserModel | string;
  costCenter?: CostCenterModel;
  createdAt?: Date;
  updatedAt?: Date;
}
