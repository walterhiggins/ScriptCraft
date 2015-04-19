package org.scriptcraftjs.webserver;

import fi.iki.elonen.ServerRunner;


/**
 * Web Server for BlocklyCraft in ScriptCraft.
 *
 * General HTTP server code that is not related to ScriptCraft (or BlocklyCraft) should go into the WebServer parent class.
 *
 * @author Michael Vorburger & Lauro Canonica
 */
public class ScriptCraftWebServer extends WebServer {

	private static final String SCRIPTCRAFT_WWW_DIRECTORY = "scriptcraft/www";
	private static final String BLOCKLYCRAFT_POST_DIRECTORY = "scriptcraft/plugins/blocklycraft";

	public ScriptCraftWebServer() {
		super(SCRIPTCRAFT_WWW_DIRECTORY, BLOCKLYCRAFT_POST_DIRECTORY);
	}

	public ScriptCraftWebServer(String wwwroot, String httpPostDirectory) {
		super(wwwroot, httpPostDirectory);
	}

	public String getStartedLogMessage() {
		return "HTTP web server for content in " + SCRIPTCRAFT_WWW_DIRECTORY + " now available on " + getURL();
	}

	public static void main(String[] args) {
		ScriptCraftWebServer webServer = new ScriptCraftWebServer("src/main/js/www", "src/main/js/plugins/blocklycraft");
		System.out.println(webServer.getStartedLogMessage());
		webServer.openURL();
		ServerRunner.executeInstance(webServer.createServer());
	}

}
