import path from 'path'
import { OutputOptions, rollup, RollupOptions } from 'rollup'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const options: RollupOptions = {
  input: path.join(__dirname, '../src/index.ts'),
  output: {
    file: path.join(__dirname, '../dist/index.js'),
    format: 'cjs',
  },
  plugins: [
    alias({
      entries: [
        // 如果这里不替换，会指向 acorn/dist/acorn.mjs
        // 如果使用 acorn.mjs 则导入就需要用 import * as acorn from 'acorn' - (可以使用且代码量小于 acorn.js)
        { find: 'acorn', replacement: path.resolve('node_modules/acorn/dist/acorn.js') },
      ],
    }),
    commonjs(),
    nodeResolve(),
    typescript({
      module: 'ESNext',
    }),
  ],
}

rollup(options)
  .then(build => {
    build.write(options.output as OutputOptions)
    console.log('Build success.')
  })
