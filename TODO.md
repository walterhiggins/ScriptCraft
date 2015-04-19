## ToDo

[ ] BlocklyCraft: Translate Italian-only blocks to French & German
[ ] Create HTML version of MinecraftModdingIdeas_20150416.docx, link it as Help?
[ ] Video/s more, Blog, Tweet..
[ ] announce it on https://groups.google.com/forum/#!forum/blockly
[ ] get linked on https://blockly-games.appspot.com/about?lang=en
[ ] Save using https://blockly-demo.appspot.com/static/demos/storage/index.html & https://developers.google.com/blockly/installation/cloud-storage
[ ] How-to refresh() without restarting the web server? If figured out, then re-enable the commented out httpServer.openURL(); in *BOTH* ScriptCraftPlugin classes
[ ] https://github.com/maxogden/javascript-editor
[ ] support Java (Xtend?) instead of JavaScript coding (use Hotea)


## Done

# 2015.05.30
[X] Michael integrated Lauro's clean-up and English instead of Italian only Translations; submitted pull request to Walter!

# 2015.04.26
[X] Web Server handles POST to update JS files, under fixed folder, to later support Save from Blockly (using POST instead of GET)
[X] Bundled complete BlocklyCraft, as received in Lauro's ZIP - but complete separate 3rd-party from our code
[X] Introduced it in README.md incl. link to https://www.youtube.com/watch?v=cat5f-Hy16k

# 2015.04.22
[X] Integrated js/plugins/blocklycraft (without Blockly in www/, yet)
     [X] copy 2-3 files, works! now showing in Git.
     [X] remove hard-coded path.. avoid error on start-up
     [X] cleaned up files much, formatting, header, etc.

# 2015.04.19
[X] Given hugely successful Devoxx4Kids workshop in Lugano, Ticino, Switzerland using this ScriptCraft + BlocklyCraft ;)
[X] Integrated Web Server
      * Can serve static files
      * HTTP host and port configured via -Dorg.scriptcraftjs.webserver.WebServer.port and *.host
      * HTTP Request/Response details logging intentionally disabled
      * Automatically opens web browser
