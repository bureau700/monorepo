export default async function setupJest() {
  process.env.NODE_ENV = 'test';
  // eslint-disable-next-line global-require
  require('@jison/dotenv-load')();
}
