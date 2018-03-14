import FacadeConfig from '../FacadeConfig';
import catchErrors from '../utils/catchErrors';

/* istanbul ignore next */
export default ({ service, handleError, exitProcess, log }: FacadeConfig) => {
  return async () => {
    await catchErrors(handleError, async () => {
      const migrations = await service.getMigrations();
      if (migrations.length === 0) {
        log('There are no migrations available');
        return;
      }
      log(`There are ${migrations.length} migrations available`);
      migrations.forEach((migration) => {
        log(`- ${migration.key}`);
      });
    });
    log('');
    exitProcess();
  };
};
