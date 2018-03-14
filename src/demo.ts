// tslint:disable:no-console
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
    console.log(colors.cyan(message));
  },
  repo: repoFactory([{
    down: async () => { console.log('A log from test1 down'); },
    key: 'test1',
    up: async () => { console.log('A log from test1 up'); },
  }, {
    down: async () => { console.log('A log from test2 down'); },
    key: 'test2',
    up: async () => { console.log('A log from test2 up'); },
  }]),
});

factory({ program, service });

program.parse(process.argv);
