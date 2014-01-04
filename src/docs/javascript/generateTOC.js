args = args.slice(1);

var template = args[0];

var BufferedReader = java.io.BufferedReader;
var FileReader = java.io.FileReader;

var contents = [], line = undefined;
var br = new BufferedReader( new FileReader(template) );

while ( (line = br.readLine()) != null){
    contents.push(line);
}
br.close();

println('## Table of Contents');

for (var i = 0; i < contents.length; i++){
    line = contents[i];
    if (line.match(/^##\s+/)){
        var h2 = line.match(/^##\s+(.*)/)[1].trim();
        var link = '' + java.net.URLDecoder.decode(h2,"UTF-8");
        link = link.replace(/[^a-zA-Z0-9 \-]/g,'');
        link = link.replace(/ /g,'-');
        link = link.toLowerCase();
        println (' * [' + h2 + '](#' + link + ')');
    }
    if (line.match(/^###\s+/)){
        var h3 = line.match(/^###\s+(.*)/)[1].trim();
        var link = '' + java.net.URLDecoder.decode(h3,"UTF-8");
        link = link.replace(/[^a-zA-Z0-9 \-]/g,'');
        var link = link.replace(/ /g,'-');
        link = link.toLowerCase();
        println ('   * [' + h3 + '](#' + link + ')');
    }
}
