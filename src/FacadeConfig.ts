import ServiceFacade from '@js-migrations/core/dist/Facade';
import ErrorHandler from './utils/ErrorHandler';

export default interface FacadeConfig {
  readonly service: ServiceFacade;
  readonly handleError: ErrorHandler;
  readonly exitProcess: () => void;
}
