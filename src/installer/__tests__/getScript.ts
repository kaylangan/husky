import getScript from '../getScript'

// Mock Date to be always constant
const constantDate = new Date('August 19, 1975 23:15:30 GMT+07:00')
global.Date = class extends Date {
  constructor() {
    super()
    return constantDate
  }
} as DateConstructor

const rootDir = '/home/typicode/project'
const huskyDir = '/home/typicode/project/node_modules/husky'

// On OS X/Linux runNodePath gets resolved to the following value
// In order to make the test deterministic on AppVeyor, the value is hardcoded
const runNodePath = '/home/typicode/project/node_modules/run-node/run-node'

// Faking env variable
process.env = {
  ...process.env,
  PWD: '/home/typicode/projects/foo-package',
  npm_package_homepage: 'https://github.com/foo/foo-package',
  npm_package_name: 'foo-package'
}

describe('hookScript', () => {
  it('should match snapshot (OS X/Linux)', () => {
    const script = getScript(rootDir, huskyDir, runNodePath, 'darwin')
    expect(script).toMatchSnapshot()
    expect(script).toMatch('run-node')
  })

  it('should match snapshot (Windows)', () => {
    const script = getScript(rootDir, huskyDir, runNodePath, 'win32')

    expect(script).toMatchSnapshot()
    expect(script).not.toMatch('run-node')
  })
})
