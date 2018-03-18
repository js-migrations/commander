import ServiceFacade from '@js-migrations/core/dist/Facade';
import Status from '@js-migrations/core/dist/utils/statuses/Status';
import ErrorHandler from './utils/ErrorHandler';

export default interface FacadeConfig {
  readonly service: ServiceFacade;
  readonly handleError: ErrorHandler;
  readonly exitProcess: () => void;
  readonly log: (status: Status) => void;
}
