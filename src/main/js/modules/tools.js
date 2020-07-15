var core = {
   chain: (base, modifier) => {
      var chain = (object) => modifier(object, chain);
      chain(base);
   },
   file: (...path) => {
      var io = Paths.get(...path).normalize().toFile();
      var thing = {
         add: () => {
            thing.file('..').dir();
            io.createNewFile();
            return thing;
         },
         child: (index) => {
            return io.listFiles()[index] ? core.file(io.listFiles()[index].getPath()) : null;
         },
         dir: () => {
            core.chain(io, (io, loop) => {
               var up = io.getParentFile();
               up && !up.exists() && loop(up);
               io.mkdir();
            });
            return thing;
         },
         get exists () {
            return io.exists();
         },
         file: (...sub) => {
            return core.file(...path, ...sub);
         },
         flush: () => {
            core.chain(io, (io, loop) => {
               var up = io.getParentFile();
               up && !up.listFiles()[0] && up.delete() && loop(up);
            });
            return thing;
         },
         get io () {
            return io;
         },
         json: () => {
            try {
               return JSON.parse(thing.read());
            } catch (error) {
               return null;
            }
         },
         // ES6 modules are not supported on scriptcraft
         /*
         parse: () => {
            io.exists() &&
               context.eval(
                  Source.newBuilder('js', io).mimeType('application/javascript+module').cached(false).build()
               );
            return thing;
         },
         */
         read: () => {
            return io.exists() && !io.isDirectory() ? Files.readString(io.toPath()) : null;
         },
         remove: () => {
            core.chain(io, (io, loop) => {
               io.isDirectory() && [ ...io.listFiles() ].forEach(loop);
               io.exists() && io.delete();
            });
            return thing.flush();
         },
         stream: () => {
            return new FileOutputStream(io);
         },
         transfer: (to, action) => {
            core.chain([ io, to ], (io, loop) => {
               if (io[0].isDirectory()) {
                  io[1].mkdir();
                  [ ...io[0].listFiles() ].forEach((from) => {
                     loop([ from, Paths.get(io[1].getPath(), from.getName()).toFile() ]);
                  });
               } else if (io[0].exists() && !io[1].exists()) {
                  Files[action](io[0].toPath(), io[1].toPath(), StandardCopyOption.REPLACE_EXISTING);
               }
            });
            return thing.flush();
         },
         write: (content) => {
            io.exists() && !io.isDirectory() && Files.writeString(io.toPath(), content);
            return thing;
         },
         unzip: (to) => {
            core.unzip(new FileInputStream(io), to);
         }
      };
      return thing;
   },
   unzip: (from, to) => {
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
