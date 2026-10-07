# Bulk entity test

import json
import os
import time

import pytest

from isdisposable_sdk.utility.voxgig_struct import voxgig_struct as vs
from isdisposable_sdk import IsdisposableSDK
from isdisposable_sdk.core import helpers
from isdisposable_sdk.config import shared_config
from isdisposable_sdk.feature.base_feature import IsdisposableBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestBulkEntity:

    def test_should_create_instance(self):
        testsdk = IsdisposableSDK.test(None, None)
        ent = testsdk.Bulk(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _bulk_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "bulk." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        client = setup["client"]

        # CREATE
        bulk_ref01_ent = client.Bulk(None)
        bulk_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.bulk"), "bulk_ref01"))

        bulk_ref01_data = helpers.to_map(runner.entity_data(bulk_ref01_ent.create(bulk_ref01_data, None)))
        assert bulk_ref01_data is not None



def _bulk_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/bulk/BulkTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = IsdisposableSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["bulk01", "bulk02", "bulk03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "ISDISPOSABLE_TEST_BULK_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "ISDISPOSABLE_TEST_BULK_ENTID": idmap,
        "ISDISPOSABLE_TEST_LIVE": "FALSE",
        "ISDISPOSABLE_TEST_EXPLAIN": "FALSE",
        "ISDISPOSABLE_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("ISDISPOSABLE_TEST_BULK_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("ISDISPOSABLE_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("ISDISPOSABLE_APIKEY"),
            },
            extra or {},
        ])
        client = IsdisposableSDK(helpers.to_map(merged_opts))

    _live = env.get("ISDISPOSABLE_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("ISDISPOSABLE_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
