import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
export const config: Config = {
  namespace: 'revo-dropdown',
  plugins: [sass()],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'single-export-module',
      minify: true,
      dir: 'standalone',
      generateTypeDeclarations: true,
      empty: true,
    },

    {
      type: 'dist-hydrate-script',
    },
    {
      type: 'www',
      copy: [{ src: 'temp' }],
      serviceWorker: null, // disable service workers
    },
  ],
};
