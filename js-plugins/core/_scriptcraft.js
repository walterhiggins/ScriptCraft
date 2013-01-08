var global = this;
var ScriptCraft = ScriptCraft || {};
ScriptCraft.core = ScriptCraft.core || {};
//
// private implementation
//
(function(){
	 //
	 // don't execute this more than once
	 //
	 if (typeof load == "function")
		  return ;
	 
	 var _originalScript = __script;
	 importPackage(java.io);
	 var _canonize = function(file){
		  return file.getCanonicalPath().replaceAll("\\\\","/");
	 };
	 var _load = function(filename){
		  var file = new File(filename);
		  print("loading " + _canonize(file));
		  if (file.exists()){
				var parent = file.getParentFile();
				var reader = new FileReader(file);
				__engine.put("__script",_canonize(file));
				__engine.put("__folder",(parent?_canonize(parent):"")+"/");
				__engine.eval(reader);
		  }else{
				print("Error: " + filename + " not found");
		  }
	 };
	 var _listJsFiles = function(store,dir)
	 {
		  if (typeof dir == "undefined"){
				dir = new File(_originalScript).getParentFile().getParentFile();
		  }
		  var files = dir.listFiles();
		  for (var i = 0;i < files.length; i++){
				if (files[i].isDirectory()){
					 _listJsFiles(store,files[i]);
				}else{
					 if (files[i].getCanonicalPath().endsWith(".js") &&
						 !(files[i].getName().startsWith("_")))
					 {
						  store.push(files[i]);
					 }
				}
		  }
	 };
	 var _reload = function(pluginDir)
	 {
		  var jsFiles = [];
		  _listJsFiles(jsFiles,pluginDir);
		  //
		  // script files whose name begins with _ (underscore)
		  // will not be loaded automatically at startup.
		  // These files are assumed to be dependencies/private to plugins
		  // 
		  // E.g. If you have a plugin called myMiniGame.js in the myMiniGame directory
		  // and which in addition to myMiniGame.js also includes _myMiniGame_currency.js _myMiniGame_events.js etc.
		  // then it's assumed that _myMiniGame_currency.js and _myMiniGame_events.js will be loaded
		  // as dependencies by myMiniGame.js and do not need to be loaded via js reload
		  //
		  for (var i = 0;i < jsFiles.length; i++){
				load(_canonize(jsFiles[i]));
		  }
	 };
	 ScriptCraft.core.load = _load;
	 ScriptCraft.core.reload = _reload;

	 for (var f in ScriptCraft.core){
		  global[f] = ScriptCraft.core[f];
	 }
	 ScriptCraft.core.initialized = true;
	 //
	 // assumes this was loaded from js-plugins/core/
	 //
	 reload(new File(__script).getParentFile().getParentFile());

}());




