var File = java.io.File,
  FileReader = java.io.FileReader,
  FileInputStream = java.io.FileInputStream,
  out = java.lang.System.out,
  err = java.lang.System.err,
  Modifier = java.lang.reflect.Modifier,
  clz,
  ZipInputStream = java.util.zip.ZipInputStream,
  zis = new ZipInputStream(new FileInputStream('./target/minecraft/craftbukkit.jar')),
  entry = null;
var content = [
  '/*********************',
  '## Events Helper Module',
  'The Events helper module provides a suite of functions - one for each possible event.',
  'For example, the events.blockBreak() function is just a wrapper function which calls events.on(org.bukkit.event.block.BlockBreakEvent, callback, priority)',
  'This module is a convenience wrapper for easily adding new event handling functions in Javascript. ',
  'At the in-game or server-console prompt, players/admins can type `events.` and use TAB completion ',
  'to choose from any of the approx. 160 different event types to listen to.',
  '',
  '### Usage',
  '',
  '    events.blockBreak( function( event ) { ', 
  '      event.player.sendMessage(\'You broke a block!\'); ', 
  '    });',
  '',
  '... which is just a shorter and less error-prone way of writing ...',
  '',
  '    events.on(\'block.BlockBreakEvent\',function( event ) { ', 
  '      event.player.sendMessage(\'You broke a block!\');',
  '    });',
  '',
  'The crucial difference is that the events module now has functions for each of the built-in events. The functions are accessible via TAB-completion so will help beginning programmers to explore the events at the server console window.',
  '',
  '***/'
];
for (var i = 0; i< content.length; i++){
  out.println(content[i]);
}
while ( ( entry = zis.nextEntry) != null) { 
  var name = '' + entry.name;
  if (name.match(/org\/bukkit\/event\/.+Event\.class$/)){
    name = name.replace(/\//g,'.').replace('.class','');
    try { 
      clz = java.lang.Class.forName(name);
    }catch ( e) {
      clz = engine.eval(name);
    }
    var isAbstract = Modifier.isAbstract(clz.getModifiers());
    if ( isAbstract ) {
      continue;
    }
    var parts = name.split('.');
    var shortName = name.replace('org.bukkit.event.','');
    var fname = parts.reverse().shift().replace(/^(.)/,function(a){ return a.toLowerCase();}).replace(/Event$/,'');

    var comment = [
      '/*********************',
      '### events.' + fname + '()',
      '',
      '#### Parameters ',
      '',
      ' * callback - A function which is called whenever the ['+ shortName + ' event](http://jd.bukkit.org/rb/apidocs/org/bukkit/event/' + shortName.replace('.','/') + '.html) is fired',
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
    out.println('  return events.on(' + name + ',callback,priority);');
    out.println('};');
  }
}


  
