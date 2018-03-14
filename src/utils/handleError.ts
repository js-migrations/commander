// tslint:disable:no-console
import DuplicateKeyError from '@js-migrations/core/dist/utils/errors/DuplicateKeyError';
import FailingMigrationError from '@js-migrations/core/dist/utils/errors/FailingMigrationError';
import LockedMigrationsError from '@js-migrations/core/dist/utils/errors/LockedMigrationsError';
import MissingMigrationError from '@js-migrations/core/dist/utils/errors/MissingMigrationError';
import ProcessedMigrationError from '@js-migrations/core/dist/utils/errors/ProcessedMigrationError';
// tslint:disable-next-line:max-line-length
import UnprocessedMigrationError from '@js-migrations/core/dist/utils/errors/UnprocessedMigrationError';
import * as colors from 'colors';
import ErrorHandler from './ErrorHandler';

const defaultErrorLogger = (message: string, ...args: any[]) => {
  /* istanbul ignore next */
  console.error(colors.red(message), ...args);
};

const handlerError: ErrorHandler = (err, logError = defaultErrorLogger) => {
  if (err instanceof DuplicateKeyError) {
    logError(`Duplicate migration (${err.key})`);
    return;
  }
  if (err instanceof FailingMigrationError) {
    logError(`Migration (${err.key}) failed`, err.error);
    return;
  }
  if (err instanceof LockedMigrationsError) {
    logError('Migrations are locked');
    return;
  }
  if (err instanceof MissingMigrationError) {
    logError(`Missing migrations (${err.key})`);
    return;
  }
  if (err instanceof ProcessedMigrationError) {
    logError(`Already processed migration (${err.key})`);
    return;
  }
  if (err instanceof UnprocessedMigrationError) {
    logError(`Unprocessed migration (${err.key})`);
    return;
  }
  /* istanbul ignore next */
  if (err instanceof Error) {
    logError(`Unexpected error: ${err.message}`, err);
    return;
  }
  /* istanbul ignore next */
  {
    logError('Unexpected error', err);
    return;
  }
};

export default handlerError;
