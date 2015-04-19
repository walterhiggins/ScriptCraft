
The index.html in this folder started out as a copy/paste based on / are strongly inspired from the google-blockly/demos/code.

A number of other folders are an exact copy of google-blockly,
and are kept in sync through the build.xml, and are thus on .gitignore.
The file copy is necessary because in JS using something like
<script src="3rd-party/google-blockly/demos/code/code.js">
in index.html won't resolve what that file refers to
through relative path from the included JS, but rel.
to the including html (the one with the <script> tag).
