import { IsdisposableEntityBase } from '../IsdisposableEntityBase';
import type { IsdisposableSDK } from '../IsdisposableSDK';
import type { Control } from '../types';
import type { Check, CheckCreateData } from '../IsdisposableTypes';
declare class CheckEntity extends IsdisposableEntityBase<Check> {
    constructor(client: IsdisposableSDK, entopts: any);
    make(this: CheckEntity): CheckEntity;
    create(this: any, reqdata?: CheckCreateData, ctrl?: Control): Promise<CheckEntity>;
}
export { CheckEntity };
