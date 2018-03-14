# commander
> CLI presenter for JS Migrations

### Usage
1. Install it with `npm i @js-migrations/commander`.
1. [Create the service facade with @js-migrations/core](https://github.com/js-migrations/core#use-the-factory).
1. [Use the factory to create the presenter facade](#use-the-factory).
1. [Use the CLI](#use-the-cli).

### Use the factory
```typescript
import commanderMigrationsPresenterFactory from '@js-migrations/commander/dist/factory';
import { Command } from 'commander';

const program = new Command();
const migrationsRepoFacade = commanderMigrationsPresenterFactory({
  program,
  service: migrationsServiceFacade,
});
program.parse(process.argv);
```

### Use the CLI
If you placed the code to [use the factory](#use-the-factory) in "./cli.js" you can use the CLI by running `node ./cli.js --help`. This package contains [a demo file](./src/demo.ts) showing how this can be used together.
