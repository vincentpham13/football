const {
  AppDataSource,
} = require('./src/infras/persistence/typeorm/data-source');

module.exports = {
  ...AppDataSource.options,
  seeds: ['src/infras/persistence/typeorm/seeds/**/*{.ts,.js}'],
};
