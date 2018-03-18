import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import ServiceFacade from '@js-migrations/core/dist/Facade';
import serviceFactory from '@js-migrations/core/dist/factory';
import factoryTest from '@js-migrations/core/dist/factoryTest';
import { Opts as MigrateOpts } from '@js-migrations/core/dist/migrate/Signature';
import { Opts as RollbackOpts } from '@js-migrations/core/dist/rollback/Signature';
import Status from '@js-migrations/core/dist/utils/statuses/Status';
import createTestUpMigration from '@js-migrations/core/dist/utils/tests/createTestUpMigration';
import testRepoFactory from '@js-migrations/core/dist/utils/tests/testRepoFactory';
import Migration from '@js-migrations/core/dist/utils/types/Migration';
import { Command } from 'commander';
import presenterFactory from './factory';
import defaultLog from './utils/defaultLog';
import ErrorHandler from './utils/ErrorHandler';
import defaultErrorHandler from './utils/handleError';

const initArgs = [process.argv[0], process.argv[1]];

const log = (status: Status) => {
  defaultLog(status, () => { return; });
};

const createErrorHandler = (reject: (err: Error) => void): ErrorHandler => async (err: any) => {
  reject(err);
  defaultErrorHandler(err, log);
};

factoryTest((migrations): ServiceFacade => {
  const repo = testRepoFactory(migrations);
  const service = serviceFactory({ repo });
  const runCommand = async (command: string, args: string[]) => {
    return new Promise<void>((resolve, reject) => {
      const program = new Command();
      const handleError = createErrorHandler(reject);
      const exitProcess = () => { resolve(); };
      presenterFactory({ program, service, exitProcess, handleError, log });
      program.parse([...initArgs, command, ...args]);
    });
  };
  return {
    clearMigrations: service.clearMigrations,
    getMigrations: service.getMigrations,
    migrate: async (opts: MigrateOpts = {}) => {
      const dryArgs = opts.dryRun === undefined ? [] : ['-d'];
      await runCommand('migrate', dryArgs);
    },
    migrateByKey: async ({ key, force, dryRun }) => {
      const forceArgs = force === undefined ? [] : ['-f'];
      const dryArgs = dryRun === undefined ? [] : ['-d'];
      await runCommand('migrate', [...forceArgs, ...dryArgs, key]);
    },
    rollback: async (opts: RollbackOpts = {}) => {
      const dryArgs = opts.dryRun === undefined ? [] : ['-d'];
      await runCommand('rollback', dryArgs);
    },
    rollbackByKey: async ({ key, force, dryRun }) => {
      const forceArgs = force === undefined ? [] : ['-f'];
      const dryArgs = dryRun === undefined ? [] : ['-d'];
      await runCommand('rollback', [...forceArgs, ...dryArgs, key]);
    },
  };
});

describe('list-migrations', () => {
  const listMigrations = (migrations: Migration[]) => {
    const repo = testRepoFactory(migrations);
    const service = serviceFactory({ repo });
    return new Promise<void>((resolve, reject) => {
      const program = new Command();
      const handleError = createErrorHandler(reject);
      const exitProcess = () => { resolve(); };
      presenterFactory({ program, service, exitProcess, handleError, log });
      program.parse([...initArgs, 'list-migrations']);
    });
  };

  it('should not error when using list migrations with no migrations', async () => {
    await listMigrations([]);
  });

  it('should not error when using list migrations with some migrations', async () => {
    await listMigrations([createTestUpMigration()]);
  });
});
