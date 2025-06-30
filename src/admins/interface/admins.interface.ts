import { AdminType } from '../shared/admin.enum';

export interface IAdmin {
	_id: string;
	username: string;
	password: string;
	status: AdminType;
}
