
The index.html in this folder started out as a copy/paste based on / are strongly inspired from the google-blockly/demos/code.

A number of other folders are an exact copy of google-blockly,
and are kept in sync through the build.xml, and are thus on .gitignore.
The file copy is necessary because in JS using something like
<script src="3rd-party/google-blockly/demos/code/code.js">
in index.html won't resolve what that file refers to
through relative path from the included JS, but rel.
to the including html (the one with the <script> tag).  

------------------------------------------------------------------------------------
The key files are:
index.html
Contains the landing page that describes the blocks available

../msg/js/*
All the language files used for the Minecraft blocks

customblocks.js
Contains the description of the Minecraft blocks for Blockly

customblocks-javascript-generator.js
Contains the generator for the javascript used in scriptcraft

/BlocklyCraft/src/main/js/plugins/blocklycraft/devoxxExtensions.js
Contains the scriptcraft commands useful for a Devoxx4Kids session

/BlocklyCraft/src/main/js/plugins/blocklycraft/scriptcraftExtensions.js
Contains the automatic reloading logic and some useful functions

------------------------------------------------------------------------------------
Useful information:
- build the plugin by running the /BlocklyCraft/build.xml ant script
- copy the scriptcraft.jar into the plugin folder of canarymod
- open blockly at: http://127.0.0.1:7070/blocklycraft/index.html
- run minecraft server with: java -Xmx1024M -Xms1024M -jar  CanaryMod-1.8.0-1.2.0.jar
- call 'jsp devoxx' on the console window to start the devoxx4kids scripts
- if you are not able to destory blocks in Minecraft add the permission 'groupmod permission add visitors canary.world.build'
- for allowing flying download and add in the plugins the flymod.jar.
