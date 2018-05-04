'use strict';

module.exports = function(Followuser) {
  Followuser.follow = function(req, res, cb) {
    Followuser.findOne({
      where: {
        and: [
            {followerId: req.body.followerId},
            {posterId: req.body.posterId},
        ],
      },
    }). then(data=>{
      var res = '';
      if (data != null) {
        Followuser.destroyById(data.id, (err, data)=>{
          cb(null, 'unfollowed');
        });
      } else {
        Followuser.create(req.body, (err, data)=>{
          cb(null, 'followed');
        });
      };
    });
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
