

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IsdisposableSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('BulkEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ISDISPOSABLE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ISDISPOSABLE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IsdisposableSDK.test()
    const ent = testsdk.Bulk()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ISDISPOSABLE_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bulk.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"emails":{"a":true,"h":"Emails","n":"emails","r":true,"t":"`$ARRAY`","key$":"emails","index$":0},"results":{"a":true,"h":"Results","n":"results","r":false,"t":"`$ARRAY`","key$":"results","index$":1}},"name":"bulk","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/check/bulk","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/check/bulk","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"check"},{"lit":"bulk"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"bulk","name__orig":"bulk","Name":"Bulk","name_":"bulk","name-":"bulk","NAME":"BULK","index$":0}, {"active":true,"entity":"bulk","key$":"BasicBulkFlow","kind":"basic","name":"BasicBulkFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"bulk_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Bulk', {"POST /v1/check/bulk":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["emails"],"properties":{"emails":{"type":"array","minItems":1,"maxItems":100,"example":["user@mailinator.com","real@gmail.com"],"items":{"type":"string"},"key$":"emails"}},"x-ref":"#/components/schemas/BulkRequest","index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const bulk_ref01_ent = client.Bulk()
    let bulk_ref01_data = setup.data.new.bulk['bulk_ref01']

    bulk_ref01_data = (await bulk_ref01_ent.create(bulk_ref01_data)).data()
    assert(null != bulk_ref01_data)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/bulk/BulkTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = IsdisposableSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['bulk01','bulk02','bulk03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ISDISPOSABLE_TEST_BULK_ENTID': idmap,
    'ISDISPOSABLE_TEST_LIVE': 'FALSE',
    'ISDISPOSABLE_TEST_EXPLAIN': 'FALSE',
    'ISDISPOSABLE_APIKEY': '',
  })

  idmap = env['ISDISPOSABLE_TEST_BULK_ENTID']

  const live = 'TRUE' === env.ISDISPOSABLE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ISDISPOSABLE_TEST_BULK_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new IsdisposableSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
