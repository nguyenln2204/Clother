// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';

module.exports = function(server) {
  var Account = server.models.Account;
  var Role = server.models.Role;
  var RoleMapping = server.models.RoleMapping;
  Account.findOne({
    where: {email: 'admin@gmail.com'},
  }, function(err, user) {
    Role.findOne({
      where: {name: 'admin'},
    }, function(err, role) {
      if (err) return console.log(err);

      if (!role) Role.create({name: 'admin'}, function(err, role) {
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: user.id,
        }, function(err, principal) {
          if (err) return console.log(err, principal);
        });
      });
    });
  });
};
