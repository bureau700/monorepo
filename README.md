# Monorepo API

## Structure

All services are in `packages/*-service`.

- `server`: entrypoint of the Fastify server
- `utils`: various utils for the microservices

## Run the app

### Prepare

    yarn

### Run in dev

    yarn start

### Build for production

    yarn build

This command has the advantage of taking the dependencies tree
in acount so that the build commands are executed in the right order.

### Run in production

Make sure the packages are built and:

    yarn start:prod

## Useful commands related to monorepos

### Install packages

Install a package for a specific folder of the workspace:

    yarn workspace @monorepo/service add fastify

This command installs `fastify` for the `@monorepo/service` package.

Install a package for all folder in the workspace:

    yarn add fastify -W

The options are the save as the stock `yarn` command.
For instance if you have to add a dev dependency:

    yarn add typescript -W --dev

or

    yarn add typescript -WD

If you want to install add a local package as a dependency
to another package in the same workspace, you have to
specify the version:

    yarn workspace @monorepo/ping-service add @monorepo/utils@0.1.0

But actually in `package.json` you can replace the version with `*`:

```
{
    "dependencies" {
        "@monorepo/utils": "*"
    }
}
```

### Run npm/yarn scripts

To run a script at the root, nothing changes compared to a regular repository.

If you want to run a script in all the packages, the best way is with `lerna` because lerna will only run this command in the packages where it exists.

    lerna run build
    lerna run lint

Because lerna has the capacity to run tasks in parallel, it doesn't output anything by default. But if you want to see the
different outputs, just add the `--stream` option. Moreover, since
the tasks are not executed in parallel by default, the outputs
are not mixed.

    lerna run lint --stream
