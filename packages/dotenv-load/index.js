/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

const findUp = require('find-up');
const fs = require('fs');

const dotenvPrefix = '.env';

const NODE_ENV = process.env.NODE_ENV || 'development';

//
// dotenv loading extracted from create-react-app / react-scripts
//

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${dotenvPrefix}.${NODE_ENV}.local`,
  `${dotenvPrefix}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${dotenvPrefix}.local`,
  dotenvPrefix,
]
  .filter(Boolean)
  .map(findUp.sync);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
module.exports = (opts = {findUp: true}) => {
  return (opts.findUp ? dotenvFiles.map(findUp.sync) : dotenvFiles).forEach((dotenvFile) => {
    if (fs.existsSync(dotenvFile)) {
      require('dotenv-expand')(
        require('dotenv').config({
          path: dotenvFile,
        }),
      );
    }
  });
};
