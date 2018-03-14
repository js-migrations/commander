import { defaultTo } from 'lodash';
import FacadeConfig from './FacadeConfig';
import FactoryConfig from './FactoryConfig';
import migrate from './functions/migrate';
import rollback from './functions/rollback';
import handleError from './utils/handleError';

export default (factoryConfig: FactoryConfig) => {
  const program = factoryConfig.program;
  const facadeConfig: FacadeConfig = {
    exitProcess: defaultTo(factoryConfig.exitProcess, () => {
      /* istanbul ignore next */
      process.exit();
    }),
    handleError: defaultTo(factoryConfig.handleError, handleError),
    service: factoryConfig.service,
  };
  program.command('migrate [key]')
    .description('Migrates all unprocessed migrations or a single migration by key')
    .option('-f, --force', 'Allows a processed migrations to be reprocessed')
    .action(migrate(facadeConfig));
  program.command('rollback [key]')
    .description('Rollsback all processed migrations or a single migration by key')
    .option('-f, --force', 'Allows an unprocessed migrations to be rolledback')
    .action(rollback(facadeConfig));
};
