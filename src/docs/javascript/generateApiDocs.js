/*
  This script is run at build time to generate api.md - a single Markdown document containing documentation for ScriptCraft's API
*/
args = args.slice(1);
var dir = args[0];
importPackage(java.io);
/*
  find - a (very) basic implementation of the unix command line tool.
*/
var find = function(dir,store,re) 
{
    var files = dir.listFiles();
    for (var i = 0;i < files.length; i++){
        var file = new File(files[i]);
        if (file.isDirectory()) {
            find(file,store,re);
        } else {
            if (typeof re == "undefined") 
                store.push(files[i]);
            else if ((""+files[i]).match(re)) 
                store.push(files[i]);
        }
    }
};
/*
  the main module file for a given directory
  (assuming the main module is in a file with the same name as the parent 
  directory) - e.g. drone/drone.js 
*/
var sortByModule = function(a,b){
    var aparts = (""+a).split(/\//);
    var bparts = (""+b).split(/\//);
    var adir = aparts[aparts.length-2];
    var afile = aparts[aparts.length-1];
    var bdir = bparts[bparts.length-2];
    var bfile = bparts[bparts.length-1];

    if(adir<bdir) return -1;
    if(adir>bdir) return 1;
    if (afile.indexOf(adir) == 0)
        return -1;
    else
        return 1;
};
var store = [];
find(new File(dir),store,/\/[a-zA-Z0-9_\-]+\.js$/);
store.sort(sortByModule);
var contents = [];
for (var i =0; i < store.length; i++){
    var br = new BufferedReader(new FileReader(store[i]));
    var line ;
    while ( (line = br.readLine()) != null){
        contents.push(line);
    }
    br.close();
}
var len = contents.length;
var writeComment = false;
var startComment = /^\/\*{10}/;
var endComment = /^\*{3}\//;

for (var i = 0; i < len; i++){
    var line = contents[i];
    if (line.match(startComment)){
        writeComment = true;
        i++;
    }
    if (line.match(endComment)){
        writeComment = false;
    }
    if (writeComment){
        println(contents[i]);
    }
}
