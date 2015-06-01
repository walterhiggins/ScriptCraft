'use strict';
/*global require, Packages, module*/
var items = require('items');
var Canary = Packages.net.canarymod.Canary;
var cmFireworkHelper = Packages.net.canarymod.api.inventory.helper.FireworkHelper;
var cmExplosionType = Packages.net.canarymod.api.inventory.helper.FireworkHelper.ExplosionType;
var explosionTypes = ['STAR','BURST','CREEPER','LARGE','SMALL'];
var cmDyeColor = Packages.net.canarymod.api.DyeColor;
var entityFactory = Canary.factory().entityFactory;
var cmEntityType = Packages.net.canarymod.api.entity.EntityType;

function canaryFirework( location ) {

  var firework = items.fireworkStar(1);
  cmFireworkHelper.addStarColors( firework, cmDyeColor.values() );
  cmFireworkHelper.setDoesFlicker( firework, true );
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
