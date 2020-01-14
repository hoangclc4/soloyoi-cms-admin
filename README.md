## Attention!!

Please kindly
use `Node v12.13.1` on `development`

```bash
# Use Node v12.13.1 as default
$ nvm alias default v12.13.1

# or just 1 time
$ nvm use
```

If you do not have `nvm` yet?

```bash
# Installation Node Version Management (NVM)
$ brew install nvm
```

or download from: https://github.com/nvm-sh/nvm#install--update-script

## Set up API host for each environment on file `.env`

```bash
# .env

# for DEVELOPMENT
# API="API_HOST_FOR_DEVELOPMENT"

# for STAGING
# API="API_HOST_FOR_STAGING"

# for PRODUCTION
# API="API_HOST_FOR_PRODUCTION"
```

## Installation

```bash
$ npm install -g @quasar/cli
$ yarn install
```

## Running the app

```bash
# development
$ quasar dev


# Running Unit test
$ quasar test --unit jest

# Running e2e test
$ quasar test --e2e cypress

# Other command using Yarn
# Unit testing: Watch file, it is used during write test suite
$ yarn test:unit:watch

# Running e2e testing in debug mode
$ yarn test:e2e
```
