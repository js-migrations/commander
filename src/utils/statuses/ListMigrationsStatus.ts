import Status from '@js-migrations/core/dist/utils/statuses/Status';
import Migration from '@js-migrations/core/dist/utils/types/Migration';

// tslint:disable-next-line:no-class
export default class ListMigrationsStatus extends Status {
  constructor(public migrations: Migration[]) {
    super();
  }
}
