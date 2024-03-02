# Contributing to WP Feature Flags plugin

Code contributions, feedback, issue reporting and feature suggestions are welcome. Development MUST happen in `feature` branch that's branched off from `main`. All pull requests MUST be made against `main` branch.

## Setting up Locally

You can clone this repo and activate it like a normal WordPress plugin, but you'll need to install the developer dependencies in order to build the assets and to run the tests.

### Prerequisites

-   [Composer](https://getcomposer.org/)
-   [Node](https://nodejs.org/)
-   [Yarn](https://yarnpkg.com/getting-started/install)
-   [Typescript](https://www.typescriptlang.org/)

### Setup

1. [PHP and JS install and build](https://github.com/codebtech/wp-feature-flags?tab=readme-ov-file#development-setup)
2. `wp-env` is used for [local development](https://github.com/codebtech/wp-feature-flags?tab=readme-ov-file#development-setup)
3. [Linting and formatting](https://github.com/codebtech/wp-feature-flags?tab=readme-ov-file#development-setup)
4. [Automated testing guidelines](https://github.com/codebtech/wp-feature-flags?tab=readme-ov-file#development-setup)

### Ahead of raising PR

1. Make sure you run all linting and tests and everything should pass.
2. Add tests for new changes

### Release and tagging

Once the PR is reviewed and approved the maintainers will perform the release process and issue the new release tag.
