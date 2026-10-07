# Isdisposable SDK utility: make_context

from isdisposable_sdk.core.context import IsdisposableContext


def make_context_util(ctxmap, basectx):
    return IsdisposableContext(ctxmap, basectx)
