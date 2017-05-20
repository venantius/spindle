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
  db.authenticate()
    .then(err => {
      console.log('Successfully initialized Sequelize connection pool!');
    })
    .catch(err => {
      console.log('Unable to connect to the database:', err);
    });
  return db;
};

const sequelize = sequelizeInit();

module.exports = sequelize;
