# Isdisposable SDK exists test

import pytest
from isdisposable_sdk import IsdisposableSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = IsdisposableSDK.test(None, None)
        assert testsdk is not None
