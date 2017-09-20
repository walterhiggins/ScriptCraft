args = Array.prototype.slice.call(args,1);
// [0] = type, [1] = lib.jar [2] = blockX, [3] = classX
var File = java.io.File,
  FileReader = java.io.FileReader,
  FileInputStream = java.io.FileInputStream,
  FRAMEWORK = args[0],
  out = java.lang.System.out,
  err = java.lang.System.err,
  Modifier = java.lang.reflect.Modifier,
  clz,
  ZipInputStream = java.util.zip.ZipInputStream,
  zis = new ZipInputStream(new FileInputStream(args[1])),
  entry = null;
var content = [
  '/*********************',
  '## Events Helper Module (' + FRAMEWORK + ' version)',
  'The Events helper module provides a suite of functions - one for each possible event.',
  'For example, the events.' + args[2] + '() function is just a wrapper function which calls events.on(' + args[3] + ', callback, priority)',
  'This module is a convenience wrapper for easily adding new event handling functions in Javascript. ',
  'At the in-game or server-console prompt, players/admins can type `events.` and use TAB completion ',
  'to choose from any of the approx. 160 different event types to listen to.',
  '',
  '### Usage',
  '',
  '    events.' + args[2] + '( function( event ) { ', 
  '      echo( event.player, \'You broke a block!\'); ', 
  '    });',
  '',
  'The crucial difference is that the events module now has functions for each of the built-in events. The functions are accessible via TAB-completion so will help beginning programmers to explore the events at the server console window.',
  '',
  '***/'
];
var canary = false;
if (FRAMEWORK == 'CanaryMod'){
  canary = true;
}

for (var i = 0; i< content.length; i++){
  out.println(content[i]);
}
while ( ( entry = zis.nextEntry) != null) { 
  var name = new String( entry.name );
  var re1 = /org\/bukkit\/event\/.+Event\.class$/;
  if (canary){
    re1 = /net\/canarymod\/hook\/.+Hook\.class$/;
  }
  if ( re1.test(name) ) {
    name = name.replace(/\//g,'.').replace('.class','');
    try { 
      clz = java.lang.Class.forName(name);
    }catch ( e) {
      err.println('Warning: could not Class.forName("' + name + '")');
      clz = engine.eval(name);
    }
    var isAbstract = Modifier.isAbstract(clz.getModifiers());
    if ( isAbstract ) {
      continue;
    }
    var parts = name.split('.');
    var shortName = null;
    if (canary){
      shortName = name.replace('net.canarymod.hook.','');
    }
    if (!canary){
      shortName = name.replace('org.bukkit.event.','');
    }
    var fname = parts.reverse().shift().replace(/^(.)/,function(a){ 
      return a.toLowerCase();});
    if (!canary){
      fname = fname.replace(/Event$/,'');
    }
    if (canary){
      fname = fname.replace(/Hook$/,'');
    }
    var javaDoc = canary ? 'https://ci.visualillusionsent.net/job/CanaryLib/javadoc/net/canarymod/hook/' : 'https://hub.spigotmc.org/javadocs/spigot/org/bukkit/event/';
    var comment = [
      '/*********************',
      '### events.' + fname + '()',
      '',
      '#### Parameters ',
      '',
      ' * callback - A function which is called whenever the ['+ shortName + ' event](' + javaDoc + shortName.replace('.','/') + '.html) is fired',
      '',
      ' * priority - optional - see events.on() for more information.',
      '',
      '***/'
//http://jd.bukkit.org/rb/apidocs/org/bukkit/event/player/PlayerJoinEvent.html
    ];
    for (var i = 0; i < comment.length; i++){
      out.println(comment[i]);
    }
    out.println('exports.' + fname + ' = function(callback,priority){ ');
    if (canary){
      out.println('  return events.on(Packages.' + name + ',callback,priority);');
    } else { 
      out.println('  return events.on(' + name + ',callback,priority);');
    }
    out.println('};');
  }
}


  
