# Isdisposable SDK utility: make_context

from projectname_sdk.core.context import IsdisposableContext


def make_context_util(ctxmap, basectx):
    return IsdisposableContext(ctxmap, basectx)
