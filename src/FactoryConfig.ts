import ServiceFacade from '@js-migrations/core/dist/Facade';
import { Command } from 'commander';
import ErrorHandler from './utils/ErrorHandler';

export default interface FactoryConfig {
  readonly program: Command;
  readonly service: ServiceFacade;
  readonly handleError?: ErrorHandler;
  readonly exitProcess?: () => void;
}
