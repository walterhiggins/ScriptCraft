'use strict';
/*global require, exports*/
/* 
 make entities a global variable for use at in-game prompt 
 Tab completion is a useful way to discover what entity types are available.
*/
var entities = require('entities');
exports.entities = entities;
