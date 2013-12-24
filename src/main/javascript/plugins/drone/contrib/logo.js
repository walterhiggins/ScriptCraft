var Drone = require('../drone').Drone;

//
// Constructs the JS logo
// https://raw.github.com/voodootikigod/logo.js/master/js.png
//
// fg
//   the material that the letters JS will be made of
// bg
//   the material that the square will be made of
//
Drone.extend('logojs', function(fg, bg) {

    // foreground defaults to gray wool
    if (typeof fg == "undefined")
        fg = '35:7';
    // background defaults to gold blocks
    if (typeof bg == "undefined")
        bg = 41;

    // Draw the sqaure
    this.chkpt('logojs-start')
        .up()
        .box(bg, 100, 100, 1);

    // Draw the J, starting with the hook
    this.right(30).up(13)
        .box(fg)
        .right().down()
        .box(fg, 1, 3, 1)
        .right().down()
        .box(fg, 1, 5, 1)
        .right().down()
        .box(fg, 1, 7, 1)
        .right()
        .box(fg, 1, 8, 1)
        .right().down()
        .box(fg, 1, 10, 1)
        .right()
        .box(fg, 1, 9, 1)
        .right()
        .box(fg, 1, 8, 1)
        .right().down()
        .box(fg, 2, 8, 1)
        .right(2)
        .box(fg, 4, 7, 1)
        .right(4)
        .box(fg, 1, 8, 1)
        .right()
        .box(fg, 1, 9, 1)
        .right().up()
        .box(fg, 3, 10, 1)
        .right(3).up()
        .box(fg, 2, 9, 1)
        .right(2).up()
        .box(fg, 2, 8, 1)
        .right(2).up()
        .box(fg, 1, 7, 1)
        .right().up()
        .box(fg, 1, 6, 1)
        .right().up()
        .box(fg, 1, 5, 1)
        .right().up(2)
        .box(fg, 1, 3, 1)
        .left(9).up(3)
        .box(fg, 10, 31, 1)

    // Draw the S
    // It's drawn in three strokes from bottom to top. Look for when
    // it switches from .right() to .left() then back again

        // move to starting point for S
        .right(22).down(6)
        // stroke 1
        .box(fg)
        .right().down()
        .box(fg, 1, 3, 1)
        .right().down()
        .box(fg, 1, 5, 1)
        .right().down()
        .box(fg, 1, 7, 1)
        .right()
        .box(fg, 1, 8, 1)
        .right().down()
        .box(fg, 1, 10, 1)
        .right()
        .box(fg, 1, 9, 1)
        .right()
        .box(fg, 1, 8, 1)
        .right().down()
        .box(fg, 2, 8, 1)
        .right(2)
        .box(fg, 4, 7, 1)
        .right(4)
        .box(fg, 2, 8, 1)
        .right(2)
        .box(fg, 1, 9, 1)
        .right().up()
        .box(fg, 1, 9, 1)
        .right()
        .box(fg, 1, 10, 1)
        .right()
        .box(fg, 1, 22, 1)
        .right().up()
        .box(fg, 2, 20, 1)
        .right().up()
        .box(fg, 1, 18, 1)
        .right().up()
        .box(fg, 1, 17, 1)
        .right().up()
        .box(fg, 1, 15, 1)
        .right().up()
        .box(fg, 1, 13, 1)
        .right().up(2)
        .box(fg, 1, 9, 1)
        .right().up(2)
        .box(fg, 1, 5, 1)
        // stroke 2
        .left(8).up(4)
        .box(fg, 1, 9, 1)
        .left().up()
        .box(fg, 1, 9, 1)
        .left().up()
        .box(fg, 1, 8, 1)
        .left(2).up()
        .box(fg, 2, 8, 1)
        .left(2).up()
        .box(fg, 2, 7, 1)
        .left(2).up()
        .box(fg, 2, 7, 1)
        .left()
        .box(fg, 1, 8, 1)
        .left().up()
        .box(fg, 1, 8, 1)
        .left()
        .box(fg, 1, 9, 1)
        .left(2).up()
        .box(fg, 2, 19, 1)
        .left().up()
        .box(fg, 1, 17, 1)
        .left()
        .box(fg, 1, 16, 1)
        .left().up()
        .box(fg, 1, 14, 1)
        .left().up(2)
        .box(fg, 1, 10, 1)
        .left().up(2)
        .box(fg, 1, 6, 1)
        // stroke 3
        .right(7).up(6)
        .box(fg, 1, 8, 1)
        .right().up()
        .box(fg, 1, 7, 1)
        .right().up()
        .box(fg, 2, 7, 1)
        .right(2).up()
        .box(fg, 4, 6, 1)
        .right(4).down()
        .box(fg, 2, 7, 1)
        .right().down()
        .box(fg, 1, 8, 1)
        .right()
        .box(fg, 1, 7, 1)
        .right().down()
        .box(fg, 1, 8, 1)
        .right().down()
        .box(fg, 1, 9, 1)
        .right().down()
        .box(fg, 1, 9, 1)
        .right().up()
        .box(fg, 1, 8, 1)
        .right().up()
        .box(fg, 1, 6, 1)
        .right().up()
        .box(fg, 1, 5, 1)
        .right().up()
        .box(fg, 1, 3, 1)
        .right().up()
        .box(fg);

    this.move('logojs-start');

    return this;
});
//
// Makes a cube of JS logos!
// This is a wrapper for logojs() so look at its docs
//
// Until the drone can rotate on its Z axis we can't
// use logojs() to create top/bottom sides of cube.
//
Drone.extend('logojscube', function(fg, bg) {

    this.chkpt('jscube-start')
        .logojs(fg, bg);

    this.move('jscube-start')
        .right(100)
        .turn(3)
        .logojs(fg, bg);

    this.move('jscube-start')
        .right(100)
        .turn(3)
        .right(100)
        .turn(3)
        .logojs(fg, bg);

    this.move('jscube-start')
        .right(100)
        .turn(3)
        .right(100)
        .turn(3)
        .right(100)
        .turn(3)
        .logojs(fg, bg);

    return this;
});
