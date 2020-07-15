var FileInputStream = Java.type('java.io.FileInputStream');
var FileOutputStream = Java.type('java.io.FileOutputStream');
var Files = Java.type('java.nio.file.Files');
var Paths = Java.type('java.nio.file.Paths');
var Scanner = Java.type('java.util.Scanner');
// ES modules are not supported on scriptcraft
// const Source = Java.type('org.graalvm.polyglot.Source');
var StandardCopyOption = Java.type('java.nio.file.StandardCopyOption');
var URL = Java.type('java.net.URL');
var ZipInputStream = Java.type('java.util.zip.ZipInputStream');

/**
 * @type {{
 *    chain: core$chain,
 *    fetch: core$fetch,
 *    file: core$file,
 *    unzip: core$unzip
 * }}
 */
var core = {
   /**
    * @callback core$chain
    * @param {any} base
    * @param {function} modifier
    * @returns {void}
    */
   chain: function (base, modifier) {
      var chain = function (object) {
         return modifier(object, chain);
      }
      chain(base);
   },
   /**
    * @callback core$fetch$json
    * @returns {any}
    */
   /**
    * @callback core$fetch$read
    * @returns {string}
    */
   /**
    * @callback core$fetch$stream
    * @returns {any}
    */
   /**
    * @callback core$fetch$unzip
    * @param {any} to
    * @returns {core$file$}
    */
   /**
    * @callback core$fetch
    * @param {string} from
    * @returns {{
    *    json: core$fetch$json,
    *    read: core$fetch$read,
    *    stream: core$fetch$stream,
    *    unzip: core$fetch$unzip
    * }}
    */
   fetch: function (from) {
      var link = new URL(from).openConnection();
      link.setDoOutput(true);
      link.setRequestMethod('GET');
      link.setInstanceFollowRedirects(true);
      var code = link.getResponseCode();
      if (code === 200) {
         var thing = {
            json: function () {
               try {
                  return JSON.parse(thing.read());
               } catch (error) {
                  return null;
               }
            },
            read: function () {
               return new Scanner(thing.stream()).useDelimiter('\\A').next();
            },
            stream: function () {
               return link.getInputStream();
            },
            unzip: function (to) {
               return core.unzip(thing.stream(), to);
            }
         };
         return thing;
      } else {
         throw code;
      }
   },
   /**
    * @callback core$file$add
    * @returns {core$file$}
    */
   /**
    * @callback core$file$child
    * @param {number} index
    * @returns {core$file$}
    */
   /**
    * @callback core$file$dir
    * @returns {core$file$}
    */
   /**
    * @callback core$file$file
    * @param {...string} sub
    * @returns {core$file$}
    */
   /**
    * @callback core$file$flush
    * @returns {core$file$}
    */
   /**
    * @callback core$file$json
    * @returns {any}
    */
   /**
    * @callback core$file$parse
    * @returns {core$file$}
    */
   /**
    * @callback core$file$remove
    * @returns {core$file$}
    */
   /**
    * @callback core$file$stream
    * @returns {any}
    */
   /**
    * @callback core$file$transfer
    * @param {any} to
    * @param {string} action
    * @returns {core$file$}
    */
   /**
    * @callback core$file$write
    * @param {string} content
    * @returns {core$file$}
    */
   /**
    * @callback core$file$unzip
    * @param {any} to
    * @returns {core$file$}
    */
   /**
    * @typedef {{
    *    add: core$file$add,
    *    child: core$file$child,
    *    dir: core$file$dir,
    *    exists: boolean,
    *    file: core$file$file,
    *    flush: core$file$flush,
    *    io: any,
    *    json: core$file$json,
    *    parse: core$file$parse,
    *    read: core$file$read,
    *    remove: core$file$remove,
    *    stream: core$file$stream,
    *    transfer: core$file$transfer,
    *    write: core$file$write,
    *    unzip: core$file$unzip
    * }} core$file$
    */
   /**
    * @callback core$file
    * @param {string[]} path
    * @returns {core$file$}
    */
   file: function () {
      var path = [].slice.apply(arguments);
      var io = eval('Paths.get(' + path.map(JSON.stringify) + ')').normalize().toFile();
      var thing = {
         add: function () {
            thing.file('..').dir();
            io.createNewFile();
            return thing;
         },
         child: function (index) {
            return io.listFiles()[index] ? core.file(io.listFiles()[index].getPath()) : null;
         },
         dir: function () {
            core.chain(io, function (io, loop) {
               var up = io.getParentFile();
               up && !up.exists() && loop(up);
               io.mkdir();
            });
            return thing;
         },
         get exists () {
            return io.exists();
         },
         file: function () {
            return core.file.apply(null, path.concat([].slice.apply(arguments)));
         },
         flush: function () {
            core.chain(io, function (io, loop) {
               var up = io.getParentFile();
               up && !up.listFiles()[0] && up.delete() && loop(up);
            });
            return thing;
         },
         get io () {
            return io;
         },
         json: function () {
            try {
               return JSON.parse(thing.read());
            } catch (error) {
               return null;
            }
         },
         // ES modules are not supported on scriptcraft
         /*
         parse: () => {
            io.exists() &&
               context.eval(
                  Source.newBuilder('js', io).mimeType('application/javascript+module').cached(false).build()
               );
            return thing;
         },
         */
         read: function () {
            return io.exists() && !io.isDirectory() ? [].slice.apply(Files.readAllLines(io.toPath()).toArray()).join('\n') : null;
         },
         remove: function () {
            core.chain(io, function (io, loop) {
               io.isDirectory() && [].slice.apply(io.listFiles()).forEach(loop);
               io.exists() && io.delete();
            });
            return thing.flush();
         },
         stream: function () {
            return new FileOutputStream(io);
         },
         transfer: function (to, action) {
            core.chain([ io, to ], function (io, loop) {
               if (io[0].isDirectory()) {
                  io[1].mkdir();
                  [].slice.apply(io[0].listFiles()).forEach(function (from) {
                     loop([ from, Paths.get(io[1].getPath(), from.getName()).toFile() ]);
                  });
               } else if (io[0].exists() && !io[1].exists()) {
                  Files[action](io[0].toPath(), io[1].toPath(), StandardCopyOption.REPLACE_EXISTING);
               }
            });
            return thing.flush();
         },
         write: function (content){
            io.exists() && !io.isDirectory() && Files.writeString(io.toPath(), content);
            return thing;
         },
         unzip: function (to) {
            core.unzip(new FileInputStream(io), to);
         }
      };
      return thing;
   },
   /**
    * @callback core$unzip
    * @param {any} from
    * @param {any} to
    * @returns {core$file$}
    */
   unzip: function (from, to) {
      var stream = new ZipInputStream(from);
      try {
         var entry;
         while ((entry = stream.getNextEntry())) {
            var file = core.file(to.getPath(), entry.getName());
            if (entry.isDirectory()) {
               file.dir();
            } else {
               var output = file.add().stream();
               try {
                  stream.transferTo(output);
                  output.close();
               } catch (error) {
                  output.close();
                  throw error;
               }
            }
            stream.closeEntry();
         }
         stream.close();
         from.close();
         return core.file(to.getPath());
      } catch (error) {
         stream.close();
         from.close();
         throw error;
      }
   }
}
module.exports = core;
