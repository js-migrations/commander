import { defaultTo } from 'lodash';
import FacadeConfig from './FacadeConfig';
import FactoryConfig from './FactoryConfig';
import getMigrations from './functions/getMigrations';
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
    log: defaultTo(factoryConfig.log, console.log.bind(console)),
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
  program.command('list-migrations')
    .description('Lists all of the available migrations')
    .action(getMigrations(facadeConfig));
};
