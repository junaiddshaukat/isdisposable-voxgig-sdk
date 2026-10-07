import { IsdisposableEntityBase } from '../IsdisposableEntityBase';
import type { IsdisposableSDK } from '../IsdisposableSDK';
import type { Control } from '../types';
import type { Bulk, BulkCreateData } from '../IsdisposableTypes';
declare class BulkEntity extends IsdisposableEntityBase<Bulk> {
    constructor(client: IsdisposableSDK, entopts: any);
    make(this: BulkEntity): BulkEntity;
    create(this: any, reqdata?: BulkCreateData, ctrl?: Control): Promise<BulkEntity>;
}
export { BulkEntity };
