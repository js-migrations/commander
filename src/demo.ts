import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import serviceFactory from '@js-migrations/core/dist/factory';
import repoFactory from '@js-migrations/core/dist/utils/tests/testRepoFactory';
import * as colors from 'colors';
import { Command } from 'commander';
import factory from './factory';

const program = new Command();
const service = serviceFactory({
  log: (message) => {
    // tslint:disable-next-line:no-console
    console.log(colors.cyan(message));
  },
  repo: repoFactory([{
    down: async () => { return; },
    key: 'test1',
    up: async () => { return; },
  }, {
    down: async () => { return; },
    key: 'test2',
    up: async () => { return; },
  }]),
});

factory({ program, service });

program.parse(process.argv);
