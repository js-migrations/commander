import FacadeConfig from '../FacadeConfig';
import catchErrors from '../utils/catchErrors';

export default ({ service, handleError, exitProcess, log }: FacadeConfig) => {
  return async (key?: string, { force, dry }: any = {}) => {
    await catchErrors(handleError, async () => {
      if (key !== undefined) {
        await service.rollbackByKey({ key, log, force, dryRun: dry });
      } else {
        await service.rollback({ log, dryRun: dry });
      }
    });
    exitProcess();
  };
};
