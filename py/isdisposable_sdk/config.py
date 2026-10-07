# Isdisposable SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Isdisposable",
            "slug": "isdisposable",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
        },
        "options": {
            "base": "https://isdisposable.com/api",
            "auth": {
                "prefix": "",
                "name": "x-api-key",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "bulk": {},
                "check": {},
                "health": {},
            },
        },
        "entity": {
      "bulk": {
        "fields": [
          {
            "name": "emails",
            "title": "Emails",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "results",
            "title": "Results",
            "type": "`$ARRAY`",
          },
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
                    "lit": "v1",
                  },
                  {
                    "lit": "check",
                  },
                  {
                    "lit": "bulk",
                  },
                ],
                "parts": [
                  "v1",
                  "check",
                  "bulk",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "check": {
        "fields": [
          {
            "name": "cached",
            "title": "Cached",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "disposable",
            "title": "Disposable",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "domain",
            "title": "Domain",
            "type": "`$STRING`",
          },
          {
            "name": "domain_age_days",
            "title": "Domain Age Days",
            "type": "`$INTEGER`",
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "The email address to check.",
          },
          {
            "name": "error",
            "title": "Error",
            "type": "`$STRING`",
            "short": "Set on a bulk result item that could not be checked.",
          },
          {
            "name": "mx_valid",
            "title": "Mx Valid",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "reason",
            "title": "Reason",
            "type": "`$STRING`",
            "short": "Why the email was flagged.",
          },
          {
            "name": "score",
            "title": "Score",
            "type": "`$INTEGER`",
            "short": "Risk score from 0 (safe) to 100 (definitely disposable).",
          },
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
                    "lit": "v1",
                  },
                  {
                    "lit": "check",
                  },
                ],
                "parts": [
                  "v1",
                  "check",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "health": {
        "fields": [
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
          },
          {
            "name": "timestamp",
            "title": "Timestamp",
            "type": "`$STRING`",
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$STRING`",
          },
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
                    "lit": "v1",
                  },
                  {
                    "lit": "health",
                  },
                ],
                "parts": [
                  "v1",
                  "health",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
