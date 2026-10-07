import { IsdisposableEntityBase } from '../IsdisposableEntityBase';
import type { IsdisposableSDK } from '../IsdisposableSDK';
import type { Control } from '../types';
import type { Health, HealthLoadMatch } from '../IsdisposableTypes';
declare class HealthEntity extends IsdisposableEntityBase<Health> {
    constructor(client: IsdisposableSDK, entopts: any);
    make(this: HealthEntity): HealthEntity;
    load(this: any, reqmatch?: HealthLoadMatch, ctrl?: Control): Promise<HealthEntity>;
}
export { HealthEntity };
