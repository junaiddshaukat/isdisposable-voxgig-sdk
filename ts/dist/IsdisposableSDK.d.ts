import { BulkEntity } from './entity/BulkEntity';
import { CheckEntity } from './entity/CheckEntity';
import { HealthEntity } from './entity/HealthEntity';
export type * from './IsdisposableTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { IsdisposableEntityBase } from './IsdisposableEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class IsdisposableSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Bulk(entopts?: Record<string, any>): BulkEntity;
    Check(entopts?: Record<string, any>): CheckEntity;
    Health(entopts?: Record<string, any>): HealthEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): IsdisposableSDK;
    tester(testopts?: any, sdkopts?: any): IsdisposableSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof IsdisposableSDK;
export { stdutil, config, BaseFeature, IsdisposableEntityBase, IsdisposableSDK, SDK, };
export type { DirectResult };
