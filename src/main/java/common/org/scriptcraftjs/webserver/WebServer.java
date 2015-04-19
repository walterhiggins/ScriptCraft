package org.scriptcraftjs.webserver;

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;
import java.net.URI;

import fi.iki.elonen.NanoHTTPD;
import fi.iki.elonen.SimpleWebServer;

/**
 * Simple HTTP Web Server.
 *
 * Currently simply a wrapper around fi.iki.elonen's nanohttpd; in the future
 * could be using Jetty, or com.sun.net.httpserver.HttpServer, or extend my very
 * own antique https://github.com/vorburger/SimpleHTTPServer.
 *
 * Code that is not General HTTP server related but specific to ScriptCraft (or BlocklyCraft) should go into the ScriptCraftWebServer subclass.
 *
 * @author Michael Vorburger & Lauro Canonica
 */
public class WebServer {

	private static final String HOST = WebServer.class.getName() + ".host";
	private static final String PORT = WebServer.class.getName() + ".port";

	// Following are just defaults, can be changed, see below
	private String host = "127.0.0.1";
	private int port = 7070;

	private final File wwwroot;
	private final File httpPostDirectory;
	private NanoHTTPD server;

	public WebServer(File wwwroot, File httpPostDirectory) {
		this.wwwroot = wwwroot;
		this.httpPostDirectory = httpPostDirectory;
	}

	public WebServer(String wwwroot, String httpPostDirectory) {
		this(new File(wwwroot), new File(httpPostDirectory));
	}

	public void start() throws IOException {
		server = createServer();
		server.start();
	}

	protected SimpleWebServer createServer() {
		if (server != null)
			throw new IllegalStateException("HTTP Server is already running");

		String hostSystemProperty = System.getProperty(HOST);
		if (hostSystemProperty != null)
			host = hostSystemProperty;
		String portSystemProperty = System.getProperty(PORT);
		if (portSystemProperty != null)
			port = Integer.parseInt(portSystemProperty);

		boolean quiet = true;
		return new SimpleWebServerWithPOST(host, port, wwwroot, httpPostDirectory, quiet);
	}

	public void stop() {
		server.stop();
		server = null;
	}

	public String getURL() {
		return "http://" + host + ":" + port + "/";
	}

	public void openURL() {
		if (Desktop.isDesktopSupported()) {
			URI uri = URI.create(getURL());
			try {
				Desktop.getDesktop().browse(uri);
			} catch (IOException e) {
				// Never mind.. ;)
			}
		}
	}

}
