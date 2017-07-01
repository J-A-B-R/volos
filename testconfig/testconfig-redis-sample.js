/****************************************************************************
 The MIT License (MIT)

 Copyright (c) 2013 Apigee Corporation

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
"use strict";

/** copy this file to testconfig-redis.js and replace the config attributes if necessary */

var VALID_USER_CREDS = { username: 'foo', password: 'bar' };

var config = {
  host: '127.0.0.1',
  port: 6379,
  options: {
//    auth_pass: 'your password' // set if you need a password for your Redis
  },
  encryptionKey: 'This is the key to encrypt/decrypt stored credentials',

  validGrantTypes: [ 'client_credentials', 'authorization_code', 'implicit_grant', 'password' ],
  tokenLifetime: 1000, // expiration tests will wait this long
  refreshTokenLifetime: 2000, // expiration tests will wait this long (less than 2000ms makes the tests to fail)
  passwordCheck: checkPassword
};

function checkPassword(username, password, cb) {
  cb(null, username === VALID_USER_CREDS.username && password === VALID_USER_CREDS.password);
}

var Management = require('../management/redis');
var management = Management.create(config);

var OAuth = require('../oauth/redis');
var oauth = OAuth.create(config);

var CreateFixtures = require('./createfixtures');
var fixtureCreator = new CreateFixtures(management);

module.exports = {
  management: management,
  oauth: oauth,
  fixtureCreator: fixtureCreator,
  config: config,
  validUserCreds: VALID_USER_CREDS
};
