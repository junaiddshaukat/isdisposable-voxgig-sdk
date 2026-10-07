"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CheckEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ISDISPOSABLE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ISDISPOSABLE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IsdisposableSDK.test();
        const ent = testsdk.Check();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.IsdisposableSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Check().create({ "cached": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ISDISPOSABLE_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'check.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "cached": { "a": true, "h": "Cached", "n": "cached", "r": false, "t": "`$BOOLEAN`", "key$": "cached", "index$": 0 }, "disposable": { "a": true, "h": "Disposable", "n": "disposable", "r": false, "t": "`$BOOLEAN`", "key$": "disposable", "index$": 1 }, "domain": { "a": true, "h": "Domain", "n": "domain", "r": false, "t": "`$STRING`", "key$": "domain", "index$": 2 }, "domain_age_days": { "a": true, "h": "Domain Age Days", "n": "domain_age_days", "r": false, "t": "`$INTEGER`", "key$": "domain_age_days", "index$": 3 }, "email": { "a": true, "h": "Email", "n": "email", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The email address to check.", "t": "`$STRING`", "key$": "email", "index$": 4 }, "mx_valid": { "a": true, "h": "Mx Valid", "n": "mx_valid", "r": false, "t": "`$BOOLEAN`", "key$": "mx_valid", "index$": 5 }, "reason": { "a": true, "h": "Reason", "n": "reason", "r": false, "t": "`$STRING`", "key$": "reason", "index$": 6 }, "score": { "a": true, "h": "Score", "n": "score", "r": false, "sh": "Risk score from 0 (safe) to 100 (definitely disposable).", "t": "`$INTEGER`", "key$": "score", "index$": 7 } }, "name": "check", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v1/check", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/check", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "check" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "check", "name__orig": "check", "Name": "Check", "name_": "check", "name-": "check", "NAME": "CHECK", "index$": 1 }, { "active": true, "entity": "check", "key$": "BasicCheckFlow", "kind": "basic", "name": "BasicCheckFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "check_ref01" }, "m": {}, "o": "create", "s": [], "v": [] }] }, 'Check', { "POST /v1/check": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["email"], "properties": { "email": { "type": "string", "description": "The email address to check.", "key$": "email" } }, "x-ref": "#/components/schemas/CheckRequest", "index$": 1 } } } }, "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const check_ref01_ent = client.Check();
        let check_ref01_data = setup.data.new.check['check_ref01'];
        check_ref01_data = (await check_ref01_ent.create(check_ref01_data)).data();
        (0, node_assert_1.default)(null != check_ref01_data);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/check/CheckTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IsdisposableSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['check01', 'check02', 'check03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ISDISPOSABLE_TEST_CHECK_ENTID': idmap,
        'ISDISPOSABLE_TEST_LIVE': 'FALSE',
        'ISDISPOSABLE_TEST_EXPLAIN': 'FALSE',
        'ISDISPOSABLE_APIKEY': '',
    });
    idmap = env['ISDISPOSABLE_TEST_CHECK_ENTID'];
    const live = 'TRUE' === env.ISDISPOSABLE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ISDISPOSABLE_TEST_CHECK_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.IsdisposableSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.ISDISPOSABLE_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ISDISPOSABLE_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=CheckEntity.test.js.map