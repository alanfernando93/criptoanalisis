'use strict';

module.exports = function(Notification) {
  Notification.changeStatus = function(req, res, cb) {
    Notification.updateAll({
      id: req.params.id,
    }, {
      status: true,
    }, cb);
  };
  Notification.remoteMethod('changeStatus', {
    http: {path: '/:id/changeStatus', verb: 'post'},
    accepts: [
        {arg: 'req', type: 'object', 'http': {source: 'req'}},
        {arg: 'res', type: 'object', 'http': {source: 'res'}},
    ],
    returns: {arg: 'change', type: 'object'},
  });
};
