/*
  This script is run at build time to generate api.md - a single Markdown document containing documentation for ScriptCraft's API
*/
var err = java.lang.System.err;

args = args.slice(1);
var dir = args[0];
var foreach = function(array, func){
    for (var i =0; i < array.length; i++){
        func(array[i],i,array);
    }
};

importPackage(java.io);
/*
  find - a (very) basic implementation of the unix command line tool.
*/
var find = function(dir,store,re) 
{
    var files = dir.listFiles();
    foreach (files, function(filename){
        filename = "" + filename;
        var file = new File(filename);
        if (file.isDirectory()) {
            find(file,store,re);
        } else {
            if (typeof re == "undefined") 
                store.push(filename);
            else if (filename.match(re)) 
                store.push(filename);
        }
    });
};
/*
  the main module file for a given directory
  (assuming the main module is in a file with the same name as the parent 
  directory) - e.g. drone/drone.js 
*/
var sorter = function( precedence ){
    return function(a,b)
    {
        // convert from Java string to JS string
        a = '' + a; 
        b = '' + b;
        var aparts = a.split(/\//);
        var bparts = b.split(/\//);
        var adir = aparts.slice(3,aparts.length-1).join('/');
        var afile = aparts[aparts.length-1];
        var bdir = bparts.slice(3,bparts.length-1).join('/');
        var bfile = bparts[bparts.length-1];

        for (var i = 0;i < precedence.length; i++){
            var re = precedence[i];
            if (a.match(re) && b.match(re)){
                if (afile < bfile)
                    return -1;
                if (afile > bfile)
                    return 1;
            }
            if (a.match(re))
                return -1;
            if (b.match(re))
                return 1;
        }
        if(adir<bdir) return -1;
        if(adir>bdir) return 1;
        afile = afile.replace(/\.js$/,'');
        if (afile == adir){
            return -1;
        }
        else {
            var result = 0;
            if (afile < bfile){
                result =  -1;
            }
            if (afile > bfile){
                result = 1;
            }
            //err.println("afile: " + afile + ", bfile:" + bfile + ",result=" + result);
            
            return result;
        }
    };
};
var sortByModule = function(a,b)
{
    var aparts = (''+a).split(/\//);
    var bparts = (''+b).split(/\//);
    var adir = aparts[aparts.length-2];
    var afile = aparts[aparts.length-1];
    var bdir = bparts[bparts.length-2];
    var bfile = bparts[bparts.length-1];
    if (afile == '_scriptcraft.js')
        return -1;
    if (bfile == '_scriptcraft.js')
        return 1;
    if(adir<bdir) return -1;
    if(adir>bdir) return 1;
    if (afile.indexOf(adir) == 0)
        return -1;
    else
        return 1;
};
var store = [];
find(new File(dir),store,/\/[a-zA-Z0-9_\-]+\.js$/);

store.sort(sorter([ 
        /lib\/scriptcraft\.js$/, 
        /lib\/require\.js$/,
        /lib\/plugin\.js$/,
        /lib\/events\.js$/,
        /lib\//, 
        /modules\//,
        /drone\.js/, 
        /drone\//,
        /examples\//
]));
//err.println("store=" + JSON.stringify(store));

var contents = [];
foreach(store, function(filename){
    var br = new BufferedReader(new FileReader(filename));
    var line ;
    while ( (line = br.readLine()) != null){
        contents.push(line);
    }
    br.close();
});

var len = contents.length;
var writeComment = false;
var startComment = /^\/\*{10}/;
var endComment = /^\*{3}\//;

for (var i = 0;i < contents.length; i++){
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

