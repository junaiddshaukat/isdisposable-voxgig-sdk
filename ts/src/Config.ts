
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Isdisposable',
        slug: "isdisposable",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "https://isdisposable.com/api",

    auth: {
      prefix: '',
      name: 'x-api-key',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        bulk: {
        },
  
        check: {
        },
  
        health: {
        },
  
    }
  }


  entity = {
    "bulk": {
      "fields": [
        {
          "name": "emails",
          "title": "Emails",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "results",
          "title": "Results",
          "type": "`$ARRAY`"
        }
      ],
      "name": "bulk",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/check/bulk",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "check"
                },
                {
                  "lit": "bulk"
                }
              ],
              "parts": [
                "v1",
                "check",
                "bulk"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "check": {
      "fields": [
        {
          "name": "cached",
          "title": "Cached",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "disposable",
          "title": "Disposable",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "domain",
          "title": "Domain",
          "type": "`$STRING`"
        },
        {
          "name": "domain_age_days",
          "title": "Domain Age Days",
          "type": "`$INTEGER`"
        },
        {
          "name": "email",
          "title": "Email",
          "type": "`$STRING`",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "The email address to check."
        },
        {
          "name": "mx_valid",
          "title": "Mx Valid",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "reason",
          "title": "Reason",
          "type": "`$STRING`"
        },
        {
          "name": "score",
          "title": "Score",
          "type": "`$INTEGER`",
          "short": "Risk score from 0 (safe) to 100 (definitely disposable)."
        }
      ],
      "name": "check",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/check",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "check"
                }
              ],
              "parts": [
                "v1",
                "check"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "health": {
      "fields": [
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`"
        },
        {
          "name": "timestamp",
          "title": "Timestamp",
          "type": "`$STRING`"
        },
        {
          "name": "version",
          "title": "Version",
          "type": "`$STRING`"
        }
      ],
      "name": "health",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/health",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "health"
                }
              ],
              "parts": [
                "v1",
                "health"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

