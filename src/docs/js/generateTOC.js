args = Array.prototype.slice.call(args, 1);
// wph 20140105 trim not available in String on Mac OS.
//TG TODO: Is that still a concern?
if(typeof String.prototype.trim == 'undefined') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}
var template = args[0];
var BufferedReader = java.io.BufferedReader;
var FileReader = java.io.FileReader;
var contents = [],
    line = undefined;
var br = new BufferedReader(new FileReader(template));
// TG: 3.2.2.x enhancement to avoid docs within special comment blocks.
// added for Canary now, can be used for something else later.
// just add lines <!-- BEGIN: NO anything here --> and <!-- END: NO anything here -->
var writeComment = true;
while((line = br.readLine()) != null) {
    if(writeComment && line.startsWith("<!-- BEGIN: NO")) writeComment = false;
    if(writeComment) contents.push(line);
    if((!writeComment && line.startsWith("<!-- END: NO"))) writeComment = true;
}
br.close();
var anchors = {};
var createLink = function(text) {
    var result = text.replace(/&#95;/g, '_');
    result = result.replace(/[^a-zA-Z0-9 _\-]/g, '');
    result = result.replace(/ /g, '-');
    var result = result.toLowerCase();
    if(anchors[result]) {
        result = result + '-' + (anchors[result]++);
    }
    anchors[result] = 1;
    return result;
};
java.lang.System.out.println('## Table of Contents');
for(var i = 0; i < contents.length; i++) {
    line = contents[i];
    //TG allow spaces with \s? before # which may occur on formatting
    if(line.match(/^\s?##\s+/)) {
        var h2 = line.match(/^\s?##\s+(.*)/)[1].trim();
        var link = createLink(h2);
        java.lang.System.out.println(' * [' + h2 + '](#' + link + ')');
    }
    if(line.match(/^\s?###\s+/)) {
        var h3 = line.match(/^\s?###\s+(.*)/)[1].trim();
        var link = createLink(h3);
        java.lang.System.out.println('   * [' + h3 + '](#' + link + ')');
    }
}