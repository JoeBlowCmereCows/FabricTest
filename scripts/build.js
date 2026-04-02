import path from 'path';
import esbuild from 'esbuild';

const watch = process.argv.includes('--watch');

async function main() {
  const config = {
    external: ['history'],
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: path.resolve(import.meta.dirname, '../build/script/bundle.mjs'),
    format: 'esm',
    platform: 'browser',
    sourcemap: true,
    jsx: 'automatic',
    logLevel: 'info',
  };

  if (watch) {
    const ctx = await esbuild.context(config);
    await ctx.watch();
    console.log('Watching for changes...');
    // keep process alive
  } else {
    await esbuild.build(config);
    console.log('Build complete');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});