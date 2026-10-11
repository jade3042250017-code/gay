/*
 * *****
 * WRITTEN BY FLORIAN RAPPL, 2012.
 * florian-rappl.de
 * mail@florian-rappl.de
 * *****
 */

var AUDIOPATH = 'Content/audio/';
var BASEPATH   = 'Content/';
var DIV        = '<div />';
var CLS_FIGURE = 'figure';
var CLS_MATTER = 'matter';

var directions = {
    none  : 0,
    left  : 1,
    up    : 2,
    right : 3,
    down  : 4,
};

var mario_states = {
    normal : 0,
    fire   : 1,
    cape   : 2, // Nuevo estado
};

var size_states = {
    small : 1,
    big   : 2,
    mega  : 3, // Nuevo estado (3 bloques de alto)
};

var ground_blocking = {
    none   : 0,
    left   : 1,
    top    : 2,
    right  : 4,
    bottom : 8,
    all    : 15,
};

var collision_type = {
    none       : 0,
    horizontal : 1,
    vertical   : 2,
};

var death_modes = {
    normal : 0,
    shell  : 1,
};

var images = {
    enemies : BASEPATH + 'mario-enemies.png',
    sprites : BASEPATH + 'mario-sprites.png',
    objects : BASEPATH + 'mario-objects.png',
    peach   : BASEPATH + 'mario-peach.png',
};

// Ajuste de física para mayor fluidez
var constants = {
    interval        : 20,
    bounce          : 16,
    cooldown        : 20,
    gravity         : 1.6, // Gravedad suave para una caída fluida
    start_lives     : 3,
    max_width       : 400,
    max_height      : 15,
    jumping_v       : 31,  // Salto más alto y responsivo
    walking_v       : 6.5, // Movimiento un poco más rápido
    mushroom_v      : 3,
    ballmonster_v   : 2,
    spiked_turtle_v : 1.5,
    small_turtle_v  : 3,
    big_turtle_v    : 2,
    shell_v         : 12,  // Caparazones más rápidos
    shell_wait      : 25,
    star_vx         : 4,
    star_vy         : 16,
    bullet_v        : 12,
    max_coins       : 100,
    pipeplant_count : 150,
    pipeplant_v     : 1,
    invincible      : 11000,
    invulnerable    : 1000,
    blinkfactor     : 5,
};

var mushroom_mode = {
    mushroom : 0,
    plant    : 1,
};

var c2u = function(s) {
    return 'url(' + s + ')';
};

// Detección exacta de cajas de colisión AABB entre entidades
var q2q = function(figure, opponent) {
    var figW = figure.width || 32;
    var figH = (figure.state || 1) * 32;
    
    var oppW = opponent.width || 32;
    var oppH = (opponent.state || 1) * 32;

    if (figure.x + figW <= opponent.x) return false;
    if (figure.x >= opponent.x + oppW) return false;
    if (figure.y + figH <= opponent.y) return false;
    if (figure.y >= opponent.y + oppH) return false;

    return true;
};

Math.sign = function(x) {
    if (x > 0) return 1;
    if (x < 0) return -1;
    return 0;
};