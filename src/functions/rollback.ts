import FacadeConfig from '../FacadeConfig';
import catchErrors from '../utils/catchErrors';

export default ({ service, handleError, exitProcess, log }: FacadeConfig) => {
  return async (key?: string, { force }: any = {}) => {
    await catchErrors(handleError, async () => {
      if (key !== undefined) {
        await service.rollbackByKey({ key, force });
      } else {
        await service.rollback();
      }
    });
    log('');
    exitProcess();
  };
};
