import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { svelteOutputTarget } from '@stencil/svelte-output-target';

const componentCorePackage = '../../../';
const directivesProxyFile = (name: string) => `./framework/${name}/src/revodropdown.ts`;
export const config: Config = {
  buildEs5: 'prod',
  namespace: 'revo-dropdown',
  plugins: [sass()],
  outputTargets: [
    angularOutputTarget({
      componentCorePackage,
      directivesProxyFile: directivesProxyFile('angular'),
      valueAccessorConfigs: [],
    }),
    reactOutputTarget({
      componentCorePackage,
      proxiesFile: directivesProxyFile('react'),
    }),
    vueOutputTarget({
      componentCorePackage,
      proxiesFile: directivesProxyFile('vue'),
      componentModels: [{
        elements: 'revo-dropdown',
        event: 'changeValue',
        targetAttr: 'changeValue'
      }]
    }),
    svelteOutputTarget({
      componentCorePackage,
      proxiesFile: directivesProxyFile('svelte'),
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      copy: [{ src: 'temp' }, { src: '../node_modules/vue/dist', dest: 'vue' }],
      serviceWorker: null, // disable service workers
    },
  ],
};
