var File = java.io.File,
  FileReader = java.io.FileReader,
  FileInputStream = java.io.FileInputStream,
  out = java.lang.System.out,
  ZipInputStream = java.util.zip.ZipInputStream,
  zis = new ZipInputStream(new FileInputStream('./target/minecraft/craftbukkit.jar')),
  entry = null;
var content = [
  '/*********************',
  '## Events Helper Module',
  'The Events helper module provides a suite of functions one for each possible event.',
  'For example, the blockBreak function in turn calls events.on(org.bukkit.event.block.BlockBreakEvent, callback, priority)',
  'This module is a convenience wrapper for easily add new event handlers.',
  '### Usage',
  '',
  '    events.blockBreak(function(evt){ ', 
  '      evt.player.sendMessage("You broke a block!"); ', 
  '    });',
  '',
  '... which is just a shorter way of writing ...',
  '',
  '    events.on("block.BlockBreakEvent",function(evt){ ', 
  '      evt.player.sendMessage("You broke a block!");',
  '    });',
  '',
  'The crucial difference is that the events module will have functions for each ',
  'of the built-in events so tab-completion will help ',
  'beginning programmers to explore the events at the server console window.',
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
    
    // abstract events don't have a static getHandlerList method so 
    // shouldn't be added to this module
    var hasHandlerList = eval(name + '.getHandlerList');
    if ( !hasHandlerList ) {
      continue;
    }
    var parts = name.split('.');
    var shortName = name.replace('org.bukkit.event.','');
    var fname = parts.reverse().shift().replace(/^(.)/,function(a){ return a.toLowerCase()}).replace(/Event$/,'');

    var comment = [
      '/*********************',
      '### events.' + fname + '()',
      '',
      '#### Parameters ',
      '',
      ' * callback - A function which is called whenever the ' + shortName + ' event is fired',
      '',
      ' * priority - optional - see events.on() for more information.',
      '',
      '***/'
    ];
    for (var i = 0; i < comment.length; i++){
      out.println(comment[i]);
    }
    out.println('exports.' + fname + ' = function(callback,priority){ ');
    out.println('  return events.on(' + name + ',callback,priority);');
    out.println('};');
  }
}


  
