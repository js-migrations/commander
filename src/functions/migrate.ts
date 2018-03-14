import FacadeConfig from '../FacadeConfig';
import catchErrors from '../utils/catchErrors';

export default ({ service, handleError, exitProcess }: FacadeConfig) => {
  return async (key?: string, { force }: any = {}) => {
    await catchErrors(handleError, async () => {
      if (key !== undefined) {
        await service.migrateByKey({ key, force });
      } else {
        await service.migrate();
      }
    });
    exitProcess();
  };
};
