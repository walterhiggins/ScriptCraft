package org.scriptcraftjs.webserver;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;

import fi.iki.elonen.NanoHTTPD;
import fi.iki.elonen.SimpleWebServer;

/**
 * POST support for fi.iki.elonen's nanohttpd SimpleWebServer.
 *
 * Saves POST'ed content as files into a fixed directory.
 *
 * @author Michael Vorburger
 */
public class SimpleWebServerWithPOST extends SimpleWebServer {

	private static final String CONTENT_LENGTH = "content-length";

	private static final String FILE_SUFFIX = "clientScript.js";

	private final File httpPostDirectory;

	public SimpleWebServerWithPOST(String host, int port, File wwwroot, File httpPostDirectory, boolean quiet) {
		super(host, port, wwwroot, quiet);
		this.httpPostDirectory = httpPostDirectory;
	}

	public Response serve(IHTTPSession session) {
		if (!Method.POST.equals(session.getMethod())) {
			return super.serve(session);
		} // else: handle a POST now...

//        if (session.getUri().length() < 2) {
//            return createResponse(Response.Status.BAD_REQUEST, NanoHTTPD.MIME_PLAINTEXT, "URI too short to POST to: " + session.getUri());
//        }
//        String uri = session.getUri().substring(1);
//        // TODO for real security, probably need to handle (un)escaped / etc. here as well?
//        if (uri.contains("/") || uri.contains("\\") || uri.contains("..")) {
//            // throw new IllegalArgumentException("Invalid POST URI: " + uri);
//            return createResponse(Response.Status.FORBIDDEN, NanoHTTPD.MIME_PLAINTEXT, "Invalid POST URI: " + uri);
//        }

        Map<String, String> headers = session.getHeaders();
        if (!headers.containsKey(CONTENT_LENGTH)) {
            return createResponse(Response.Status.BAD_REQUEST, NanoHTTPD.MIME_PLAINTEXT, "Missing header " + CONTENT_LENGTH);
        }
        int size = Integer.parseInt(headers.get(CONTENT_LENGTH));

        String IP = headers.get("http-client-ip").replaceAll("[:.]", "");
        File file = new File(httpPostDirectory, /*uri*/ IP + "_" + FILE_SUFFIX);
        InputStream is = session.getInputStream();
        try {
			copy(is, size, file);
		} catch (IOException e) {
			e.printStackTrace(); // TODO real logging.. but PITA in ScriptScraft, as it targets two Server APIs
            return createResponse(Response.Status.INTERNAL_ERROR, NanoHTTPD.MIME_PLAINTEXT, e.getMessage());
		}

        return createResponse(Response.Status.OK, NanoHTTPD.MIME_PLAINTEXT, "OK");
	}

	protected void copy(InputStream is, int size, File targetFile) throws IOException {
        // when moving to Java 7, use java.nio.file.Files.copy(InputStream, Path, CopyOption...)
		// similar utility is also found in com.google.common.io.Files or org.apache.commons.io.IOUtils or (better) FileUtils
		OutputStream os = new FileOutputStream(targetFile);
		try {
		    int bytesRead = 0;
			byte[] buffer = new byte[8 * 1024];
		    // @see fi.iki.elonen.NanoHTTPD.HTTPSession.parseBody(Map<String, String>)
		    while (bytesRead >= 0 && size > 0) {
			bytesRead = is.read(buffer, 0, (int)Math.min(size, buffer.length));
			size -= bytesRead;
			if (bytesRead > 0) {
				os.write(buffer, 0, bytesRead);
			}
		    }
		} finally {
	        safeClose(os);
	        // do *NOT* safeClose(is);
		}
	}
}
