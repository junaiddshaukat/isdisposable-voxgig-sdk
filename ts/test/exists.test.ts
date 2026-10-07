
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IsdisposableSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = IsdisposableSDK.test()
    equal(testsdk instanceof IsdisposableSDK, true,
      'IsdisposableSDK.test() must return a client synchronously')
  })

})
