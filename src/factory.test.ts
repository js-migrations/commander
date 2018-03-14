import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import ServiceFacade from '@js-migrations/core/dist/Facade';
import serviceFactory from '@js-migrations/core/dist/factory';
import factoryTest from '@js-migrations/core/dist/factoryTest';
import testRepoFactory from '@js-migrations/core/dist/utils/tests/testRepoFactory';
import { Command } from 'commander';
import presenterFactory from './factory';
import ErrorHandler from './utils/ErrorHandler';
import defaultErrorHandler from './utils/handleError';

factoryTest((migrations): ServiceFacade => {
  const repo = testRepoFactory(migrations);
  const log = () => null;
  const service = serviceFactory({ log, repo });
  const createErrorHandler = (reject: (err: Error) => void): ErrorHandler => async (err: any) => {
    reject(err);
    defaultErrorHandler(err, () => null);
  };
  return {
    clearMigrations: service.clearMigrations,
    getMigrations: service.getMigrations,
    migrate: async () => {
      return new Promise<void>((resolve, reject) => {
        const program = new Command();
        const handleError = createErrorHandler(reject);
        const exitProcess = () => { resolve(); };
        presenterFactory({ program, service, exitProcess, handleError, log });
        program.parse([process.argv[0], process.argv[1], 'migrate']);
      });
    },
    migrateByKey: async ({ key, force }) => {
      return new Promise<void>((resolve, reject) => {
        const program = new Command();
        const handleError = createErrorHandler(reject);
        const exitProcess = () => { resolve(); };
        presenterFactory({ program, service, exitProcess, handleError, log });
        const forceArgs = force === undefined ? [] : ['-f'];
        program.parse([process.argv[0], process.argv[1], 'migrate', ...forceArgs, key]);
      });
    },
    rollback: async () => {
      return new Promise<void>((resolve, reject) => {
        const program = new Command();
        const handleError = createErrorHandler(reject);
        const exitProcess = () => { resolve(); };
        presenterFactory({ program, service, exitProcess, handleError, log });
        program.parse([process.argv[0], process.argv[1], 'rollback']);
      });
    },
    rollbackByKey: async ({ key, force }) => {
      return new Promise<void>((resolve, reject) => {
        const program = new Command();
        const handleError = createErrorHandler(reject);
        const exitProcess = () => { resolve(); };
        presenterFactory({ program, service, exitProcess, handleError, log });
        const forceArgs = force === undefined ? [] : ['-f'];
        program.parse([process.argv[0], process.argv[1], 'rollback', ...forceArgs, key]);
      });
    },
  };
});
