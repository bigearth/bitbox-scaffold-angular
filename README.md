## BITBOX Scaffold Angular

### Intro

BITBOX scaffolds are basic apps w/ bindings to your local running BITBOX. They allow a developer to hit the ground running and waste no time w/ app set up and configuration.

This scaffold is an Angular app build w/ [`angular-cli`](https://cli.angular.io/). It already has `BITBOX` instantiated and is ready to roll.

## Setup

1. Download the latest build from [bitbox.earth](https://www.bitbox.earth/) and compare [the checksums](https://github.com/bigearth/keys-n-hashes)
2. Start your local BITBOX
3. [Install `bitbox-cli`](https://www.npmjs.com/package/bitbox-cli) globally
  * `npm install bitbox-cli --global`
4. Create empty directory for your new app
  * `mkdir BCH4all && cd BCH4all`
5. Scaffold an Angular app w/ BITBOX web bindings
  * `bitbox scaffold --framework angular`
6. Install dependencies
  * `npm install`
7. Start the app
  * `npm start`
8. Open a browser to `http://localhost:4200/` and confirm you are seeing the `getinfo` method returning data from your local BITBOX
9. Win

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
