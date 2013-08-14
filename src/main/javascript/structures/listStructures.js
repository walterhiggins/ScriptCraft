Drone.extend("listStructures", function(page_number) {
  var dashes = function(num) { return (new Array(num + 1)).join("-"); },
      entries = [],
      pages = [],
      page_data;

  if (!page_number || page_number < 0) { page_number = 1; }
  for (var entry in Drone.clipBoard) { entries.push(entry); }
  echo(entries.length);
  entries.sort(function(a, b) { return a < b ? -1 : a > b ? 1 : 0; }).reverse();
  for (var i = ~~(entries.length / 8); i; i--) {
    var a = [];
    for (var j = 0; j < 8; j++) { a.push(entries.pop()); }
    pages.push(a);
  }

  if (entries.length % 8) {
    pages.push([]);
    for (i = entries.length; i; i--) {
      pages[pages.length - 1].push(entries.pop());
    }
  }

  if (page_number > pages.length) { page_number = pages.length; }
  page_data = pages[page_number - 1];

  echo(dashes(9) + " Structures (" + page_number + "/" + pages.length + ") " + dashes(23));
  echo("Use listStructures(n) to get page n of structures.");
  for (i = 0; i < page_data.length; i++) {
    echo(page_data[i]);
  }
});
