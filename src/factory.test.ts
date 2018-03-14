import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import ServiceFacade from '@js-migrations/core/dist/Facade';
import serviceFactory from '@js-migrations/core/dist/factory';
import factoryTest from '@js-migrations/core/dist/factoryTest';
import { Opts as MigrateOpts } from '@js-migrations/core/dist/migrate/Signature';
import { Opts as RollbackOpts } from '@js-migrations/core/dist/rollback/Signature';
import testRepoFactory from '@js-migrations/core/dist/utils/tests/testRepoFactory';
import { Command } from 'commander';
import presenterFactory from './factory';
import ErrorHandler from './utils/ErrorHandler';
import defaultErrorHandler from './utils/handleError';

factoryTest((migrations): ServiceFacade => {
  const initArgs = [process.argv[0], process.argv[1]];
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
    migrate: async (opts: MigrateOpts = {}) => {
      return new Promise<void>((resolve, reject) => {
        const program = new Command();
        const handleError = createErrorHandler(reject);
        const exitProcess = () => { resolve(); };
        const dryArgs = opts.dryRun === undefined ? [] : ['-d'];
        presenterFactory({ program, service, exitProcess, handleError, log });
        program.parse([...initArgs, 'migrate', ...dryArgs]);
      });
    },
    migrateByKey: async ({ key, force, dryRun }) => {
      return new Promise<void>((resolve, reject) => {
        const program = new Command();
        const handleError = createErrorHandler(reject);
        const exitProcess = () => { resolve(); };
        const forceArgs = force === undefined ? [] : ['-f'];
        const dryArgs = dryRun === undefined ? [] : ['-d'];
        presenterFactory({ program, service, exitProcess, handleError, log });
        program.parse([...initArgs, 'migrate', ...forceArgs, ...dryArgs, key]);
      });
    },
    rollback: async (opts: RollbackOpts = {}) => {
      return new Promise<void>((resolve, reject) => {
        const program = new Command();
        const handleError = createErrorHandler(reject);
        const dryArgs = opts.dryRun === undefined ? [] : ['-d'];
        const exitProcess = () => { resolve(); };
        presenterFactory({ program, service, exitProcess, handleError, log });
        program.parse([...initArgs, 'rollback', ...dryArgs]);
      });
    },
    rollbackByKey: async ({ key, force, dryRun }) => {
      return new Promise<void>((resolve, reject) => {
        const program = new Command();
        const handleError = createErrorHandler(reject);
        const exitProcess = () => { resolve(); };
        const forceArgs = force === undefined ? [] : ['-f'];
        const dryArgs = dryRun === undefined ? [] : ['-d'];
        presenterFactory({ program, service, exitProcess, handleError, log });
        program.parse([...initArgs, 'rollback', ...forceArgs, ...dryArgs, key]);
      });
    },
  };
});
