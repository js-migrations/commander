import FacadeConfig from '../FacadeConfig';
import catchErrors from '../utils/catchErrors';
import ListMigrationsStatus from '../utils/statuses/ListMigrationsStatus';

/* istanbul ignore next */
export default ({ service, handleError, exitProcess, log }: FacadeConfig) => {
  return async () => {
    await catchErrors(handleError, async () => {
      const migrations = await service.getMigrations();
      log(new ListMigrationsStatus(migrations));
    });
    exitProcess();
  };
};
