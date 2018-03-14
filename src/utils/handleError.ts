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
    return logError(`Duplicate migration (${err.key})`);
  }
  if (err instanceof FailingMigrationError) {
    return logError(`Migration (${err.key}) failed`, err.error);
  }
  if (err instanceof LockedMigrationsError) {
    return logError('Migrations are locked');
  }
  if (err instanceof MissingMigrationError) {
    return logError(`Missing migrations (${err.key})`);
  }
  if (err instanceof ProcessedMigrationError) {
    return logError(`Already processed migration (${err.key})`);
  }
  if (err instanceof UnprocessedMigrationError) {
    return logError(`Unprocessed migration (${err.key})`);
  }
  /* istanbul ignore next */
  if (err instanceof Error) {
    return logError(`Unexpected error: ${err.message}`, err);
  }
  /* istanbul ignore next */
  return logError('Unexpected error', err);
};

export default handlerError;
