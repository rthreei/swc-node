import { transformJest } from '@swc-node/core'
import test from 'ava'

const BrorrwFromTsJest = `
function MyDecorator () {}

class MyClass {
  @MyDecorator
  ['computed key']() {
    return true
  }

  plainMethod() {
    return false
  }
}

test('MyClass', () =>  {
  const myClass = new MyClass()
  expect(myClass['computed key']).toEqual(true)
  expect(myClass.plainMethod()).toEqual(false)
})
`

test('GenericFailure: not implemented: decorators on methods with computed key', (t) => {
  const { code } = transformJest(BrorrwFromTsJest, 'jest.spec.ts', {
    target: 'es2018',
    sourcemap: false,
    dynamicImport: true,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
  })
  t.snapshot(code)
})
