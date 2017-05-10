var Sequelize = require('sequelize')

var sequelizeInit = function() {
  console.log('initializing Sequelize connection pool...');
  defineOpts = {
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
  if (process.env.NODE_ENV === 'production') {
    db = new Sequelize(process.env.DATABASE_URL, {
      define: defineOpts,
    })
  } else {
    db = new Sequelize('spindle', process.env.USER, null,
      {
        dialect: 'postgres',
        define: defineOpts,
      }
    )
  }
  console.log('finished initializing Sequelize connection pool!');
  return db;
};

var sequelize = sequelizeInit();

module.exports = sequelize;
