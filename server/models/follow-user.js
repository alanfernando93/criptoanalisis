'use strict';

module.exports = function(Followuser) {
  Followuser.follow = function(req, res, cb) {
    Followuser.findOrCreate({
      where: {
        and: [
            {followerId: req.body.followerId},
            {posterId: req.body.posterId},
        ],
      },
    }, req.body, cb);
  };
  Followuser.remoteMethod('follow', {
    http: {path: '/follow', verb: 'post'},
    accepts: [
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'res', type: 'object', 'http': {source: 'res'}},
    ],
    returns: {arg: 'follow', type: 'object'},
  });
};
