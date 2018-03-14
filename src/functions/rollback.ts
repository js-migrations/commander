import FacadeConfig from '../FacadeConfig';
import catchErrors from '../utils/catchErrors';

export default ({ service, handleError, exitProcess, log }: FacadeConfig) => {
  return async (key?: string, { force, dry }: any = {}) => {
    await catchErrors(handleError, async () => {
      if (key !== undefined) {
        await service.rollbackByKey({ key, force, dryRun: dry });
      } else {
        await service.rollback({ dryRun: dry });
      }
    });
    log('');
    exitProcess();
  };
};
