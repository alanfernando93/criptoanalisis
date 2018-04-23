'use strict';

module.exports = function(app) {
  app.dataSources.db.autoupdate('notification', (err, data)=>{
    console.log('notification model created');
  });
  app.dataSources.db.autoupdate('followUser', (err, data)=>{
    console.log('followUser model created');
  });
};
