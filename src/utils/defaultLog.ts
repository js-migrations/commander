import defaultLog from '@js-migrations/core/dist/utils/defaultLog';
import Status from '@js-migrations/core/dist/utils/statuses/Status';
import * as colors from 'colors';
import ListMigrationsStatus from './statuses/ListMigrationsStatus';

const defaultLogger = (message: string) => {
  /* istanbul ignore next */
  // tslint:disable-next-line:no-console
  console.log(colors.cyan(message));
};

export default (status: Status, log = defaultLogger) => {
  if (status instanceof ListMigrationsStatus) {
    const migrations = status.migrations;
    if (migrations.length === 0) {
      log('There are no migrations available');
    } else {
      log(`There are ${migrations.length} migrations available:`);
      migrations.forEach((migration) => {
        log(`- ${migration.key}`);
      });
    }
    return;
  }
  defaultLog(status, log);
};
