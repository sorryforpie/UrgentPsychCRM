import test from 'node:test'
import assert from 'node:assert'
import handler from '../src/pages/api/patients/index'

 test('patients api exports function', () => {
   assert.strictEqual(typeof handler, 'function')
 })
