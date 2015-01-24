'use strict';
/*global require, Packages, module*/
var items = require('items');
var Canary = Packages.net.canarymod.Canary;
var cmFireworkHelper = Packages.net.canarymod.api.inventory.helper.FireworkHelper;
var cmExplosionType = Packages.net.canarymod.api.inventory.helper.FireworkHelper.ExplosionType;
var explosionTypes = ['STAR','BURST','CREEPER','LARGE','SMALL'];
var entityFactory = Canary.factory().entityFactory;
var cmEntityType = Packages.net.canarymod.api.entity.EntityType;
var colors = [0xff0000, 0xffff00, 0x00ff00, 0x0000ff];
function canaryFirework( location ) {
  var firework = items.fireworkStar(1);
  var i1 = Math.floor(Math.random()* colors.length);
  var i2 = Math.floor(Math.random()* colors.length);
  var colorsToUse = colors.slice(Math.min(i1,i2),Math.max(i1,i2));
  if (colorsToUse.length == 0){
    colorsToUse = colors;
  }
  cmFireworkHelper.addStarColorsRaw(firework, colorsToUse);
  cmFireworkHelper.setDoesFlicker( firework, true);
  cmFireworkHelper.setDoesTrail( firework, true );
  // use a random explosion type
  var rnd = Math.floor(Math.random() * explosionTypes.length);
  var type = explosionTypes[rnd];
  cmFireworkHelper.setStarExplosionType( firework, cmExplosionType[type]);
  var rocket = items.fireworkRocket(1);
  cmFireworkHelper.setFlightDuration( rocket, 3);
  cmFireworkHelper.attachFireworkStars( rocket, [firework] );
  var rocketEntity = entityFactory.newEntity(cmEntityType.FIREWORKROCKET, location);
  rocketEntity.item = rocket;
  rocketEntity.spawn();
}

module.exports = canaryFirework;
