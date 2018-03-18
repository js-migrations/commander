import ServiceFacade from '@js-migrations/core/dist/Facade';
import Status from '@js-migrations/core/dist/utils/statuses/Status';
import { Command } from 'commander';
import ErrorHandler from './utils/ErrorHandler';

export default interface FactoryConfig {
  readonly program: Command;
  readonly service: ServiceFacade;
  readonly handleError?: ErrorHandler;
  readonly exitProcess?: () => void;
  readonly log?: (status: Status) => void;
}
