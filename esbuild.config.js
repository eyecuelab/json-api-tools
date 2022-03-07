const esbuild = require(`esbuild`) // eslint-disable-line @typescript-eslint/no-var-requires

esbuild
  .build({
    entryPoints: [`./src/index.ts`],
    outfile: `dist/index.js`,
    bundle: true,
    minify: true,
    platform: `node`,
    sourcemap: true,
    target: `node14`,
  })
  .catch(() => process.exit(1))
