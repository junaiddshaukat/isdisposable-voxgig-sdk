import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "bulk",
    "accessor": "Bulk",
    "op": "create",
    "method": "POST",
    "path": "/v1/check/bulk",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "results": [
        {
          "disposable": true,
          "email": "x",
          "domain": "x",
          "score": 1,
          "reason": "blocklist_match",
          "mx_valid": true,
          "domain_age_days": 1,
          "cached": true
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "check",
    "accessor": "Check",
    "op": "create",
    "method": "POST",
    "path": "/v1/check",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "disposable": true,
      "email": "x",
      "domain": "x",
      "score": 1,
      "reason": "blocklist_match",
      "mx_valid": true,
      "domain_age_days": 1,
      "cached": true
    },
    "idField": "id"
  },
  {
    "entity": "health",
    "accessor": "Health",
    "op": "load",
    "method": "GET",
    "path": "/v1/health",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "status": "x",
      "version": "x",
      "timestamp": "x"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
