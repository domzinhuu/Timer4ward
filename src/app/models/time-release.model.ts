import { UserModel } from './user.model';
import { CostCenterModel } from './cost-center.model';

export interface TimeReleaseModel {
  _id?: string;
  hour: number;
  minute?: number;
  user?: any;
  refDate: any;
  description?: string;
  costCenter?: any;
  createdAt?: Date;
  updatedAt?: Date;
}
