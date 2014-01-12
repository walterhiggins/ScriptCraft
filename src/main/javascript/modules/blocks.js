/************************************************************************
## Blocks Module

You hate having to lookup [Data Values][dv] when you use ScriptCraft's
Drone() functions. So do I.  So I created this blocks object which is
a helper object for use in construction.

### Examples

    box( blocks.oak ); // creates a single oak wood block
    box( blocks.sand, 3, 2, 1 ); // creates a block of sand 3 wide x 2 high x 1 long
    box( blocks.wool.green, 2 ); // creates a block of green wool 2 blocks wide

Color aliased properties that were a direct descendant of the blocks
object are no longer used to avoid confusion with carpet and stained
clay blocks. In addition, there's a convenience array `blocks.rainbow`
which is an array of the 7 colors of the rainbow (or closest
approximations).

The blocks module is globally exported by the Drone module.

***/
var blocks = {
    air: 0,
    stone: 1,
    grass: 2,
    dirt: 3,
    cobblestone: 4,
    oak: 5,
    spruce: '5:1',
    birch: '5:2',
    jungle: '5:3',
    sapling: {
        oak: 6,
        spruce: '6:1',
        birch: '6:2',
        jungle: '6:3'
    },
    bedrock: 7,
    water: 8,
    water_still: 9,
    lava: 10,
    lava_still: 11,
    sand: 12,
    gravel: 13,
    gold_ore: 14,
    iron_ore: 15,
    coal_ore: 16,
    wood: 17,
    leaves: 18,
    sponge: 19,
    glass: 20,
    lapis_lazuli_ore: 21,
    lapis_lazuli_block: 22,
    dispenser: 23,
    sandstone: 24,
    note: 25,
    bed: 26,
    powered_rail: 27,
    detector_rail: 28,
    sticky_piston: 29,
    cobweb: 30,
    grass_tall: 31,
    dead_bush: 32,
    piston: 33,
    piston_extn: 34,
    wool: {
      white: 35 // All other colors added below
    },
    dandelion: 37,
    flower_yellow: 37,
    rose: 38,
    flower_red: 38,
    mushroom_brown: 39,
    mushroom_red: 40,
    gold: 41,
    iron: 42,
    tnt: 46,
    bookshelf: 47,
    moss_stone: 48,
    obsidian: 49,
    torch: 50,
    fire: 51,
    monster_spawner: 52,
    stairs: {
        oak: 53,
        cobblestone: 67,
        brick: 108,
        stone: 109,
        nether: 114,
        sandstone: 128,
        spruce: 134,
        birch: 135,
        jungle: 136,
        quartz: 156
    },
    chest: 54,
    redstone_wire: 55,
    diamond_ore: 56,
    diamond: 57,
    crafting_table: 58,
    wheat_seeds: 59,
    farmland: 60,
    furnace: 61,
    furnace_burning: 62,
    sign_post: 63,
    door_wood: 64,
    ladder: 65,
    rail: 66,
    sign: 68,
    lever: 69,
    pressure_plate_stone: 70,
    door_iron: 71,
    pressure_plate_wood: 72,
    redstone_ore: 73,
    redstone_ore_glowing: 74,
    torch_redstone: 75,
    torch_redstone_active: 76,
    stone_button: 77,
    ice: 79,
    snow: 80,
    cactus: 81,
    clay: 82,
    sugar_cane: 83,
    jukebox: 84,
    fence: 85,
    pumpkin: 86,
    netherrack: 87,
    soulsand: 88,
    glowstone: 89,
    netherportal: 90,
    jackolantern: 91,
    cake: 92,
    redstone_repeater: 93,
    redeston_repeater_active: 94,
    chest_locked: 95,
    trapdoor: 96,
    monster_egg: 97,
    brick: {
        stone: 98,
        mossy: '98:1',
        cracked: '98:2',
        chiseled: '98:3',
        red: 45
    },
    mushroom_brown_huge: 99,
    mushroom_red_huge: 100,
    iron_bars: 101,
    glass_pane: 102,
    melon: 103,
    pumpkin_stem: 104,
    melon_stem: 105,
    vines: 106,
    fence_gate: 107,
    mycelium: 110,
    lily_pad: 111,
    nether: 112,
    nether_fence: 113,
    netherwart: 115,
    table_enchantment: 116,
    brewing_stand: 117,
    cauldron: 118,
    endportal: 119,
    endportal_frame: 120,
    endstone: 121,
    dragon_egg: 122,
    redstone_lamp: 123,
    redstone_lamp_active: 124,
    slab: {
        snow: 78,
        stone: 44,
        sandstone: '44:1',
        wooden: '44:2',
        cobblestone: '44:3',
        brick: '44:4',
        stonebrick: '44:5',
        netherbrick:'44:6',
        quartz: '44:7',
        oak: 126,
        spruce: '126:1',
        birch: '126:2',
        jungle: '126:3',
        upper: {
            stone: '44:8',
            sandstone: '44:9',
            wooden: '44:10',
            cobblestone: '44:11',
            brick: '44:12',
            stonebrick: '44:13',
            netherbrick:'44:14',
            quartz: '44:15',
            oak: '126:8',
            spruce: '126:9',
            birch: '126:10',
            jungle: '126:11',
        }
    },
    cocoa: 127,
    emerald_ore: 129,
    enderchest: 130,
    tripwire_hook: 131,
    tripwire: 132,
    emerald: 133,
    command: 137,
    beacon: 138,
    cobblestone_wall: 139,
    flowerpot: 140,
    carrots: 141,
    potatoes: 142,
    button_wood: 143,
    mobhead: 144,
    anvil: 145,
    chest_trapped: 146,
    pressure_plate_weighted_light: 147,
    pressure_plate_weighted_heavy: 148,
    redstone_comparator: 149,
    redstone_comparator_active: 150,
    daylight_sensor: 151,
    redstone: 152,
    netherquartzore: 153,
    hopper: 154,
    quartz: 155,
    rail_activator: 157,
    dropper: 158,
    stained_clay: {
      white: 159 // All other colors added below
    },
    hay: 170,
    carpet: {
      white: 171 // All other colors added below
    },
    hardened_clay: 172,
    coal_block: 173
};

// Add all available colors to colorized block collections

var colors = {
    orange: ':1',
    magenta: ':2',
    lightblue: ':3',
    yellow: ':4',
    lime: ':5',
    pink: ':6',
    gray: ':7',
    lightgray: ':8',
    cyan: ':9',
    purple: ':10',
    blue: ':11',
    brown: ':12',
    green: ':13',
    red: ':14',
    black: ':15'
};
var colorized_blocks = ["wool", "stained_clay", "carpet"];

for (var i = 0, len = colorized_blocks.length; i < len; i++) {
    var block = colorized_blocks[i],
    data_value = blocks[block].white;
    
    for (var color in colors) {
        blocks[block][color] = data_value + colors[color];
    }
};

/*
  rainbow colors - a convenience
  Color aliased properties that were a direct descendant of the blocks
  object are no longer used to avoid confusion with carpet and stained
  clay blocks.
*/
blocks.rainbow = [blocks.wool.red,
                  blocks.wool.orange,
                  blocks.wool.yellow,
                  blocks.wool.lime,
                  blocks.wool.lightblue,
                  blocks.wool.blue,
                  blocks.wool.purple];


module.exports = blocks;
