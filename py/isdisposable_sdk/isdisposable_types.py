# Typed models for the Isdisposable SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class BulkRequired(TypedDict):
    emails: list


class Bulk(BulkRequired, total=False):
    results: list


class BulkCreateDataRequired(TypedDict):
    emails: list


class BulkCreateData(BulkCreateDataRequired, total=False):
    results: list


class Check(TypedDict, total=False):
    cached: bool
    disposable: bool
    domain: str
    domain_age_days: int
    email: str
    mx_valid: bool
    reason: str
    score: int


class CheckCreateData(TypedDict, total=False):
    cached: bool
    disposable: bool
    domain: str
    domain_age_days: int
    email: str
    mx_valid: bool
    reason: str
    score: int


class Health(TypedDict, total=False):
    status: str
    timestamp: str
    version: str


class HealthLoadMatch(TypedDict, total=False):
    status: str
    timestamp: str
    version: str
