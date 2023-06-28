import Phaser from 'phaser';
//import * as url from './static/assets/swatter.png';

// Import stylesheets
import './style.css';

/* ------------------------------ GAME MECHANICS ---------------------------- */
const SWATTER_COLOR: number = 0xffffff;
const SWATTER_WIDTH: number = 40;
const SWATTER_HEIGHT: number = 40;
const BUG_COLOR: number = 0xff0000;
const BUG_RADIUS: number = 10;
const SCORE_COLOR: number = 0xffffff;

/* --------------------------------- SCENE ------------------------------- */

class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image('swatter', './static/assets/swatter.png');
    //this.load.image('swatter', url);
  }

  create() {
    /* Create BUG */
    this.bug = this.physics.add.sprite(50, 50, null);
    this.bug.body.setCircle(BUG_RADIUS);
    this.bug.setTint(BUG_COLOR);

    /* CREATE SWATTER */
    this.swatter = this.physics.add.sprite(100, 100, 'swatter');
    this.swatter.body.setSize(SWATTER_WIDTH, SWATTER_HEIGHT);
    this.swatter.setTint(SWATTER_COLOR);

    /* MOVE SWATTER */
    this.input.on('pointermove', this.moveSwatter, this);
  }

  private swatter: Phaser.Physics.Arcade.Sprite;
  private bug: Phaser.Physics.Arcade.Sprite;

  update() {
    this.physics.overlap(this.bug, this.swatter, this.squash);
  }

  moveSwatter(pointerEvent: PointerEvent) {
    this.swatter.setX(pointerEvent.x);
    this.swatter.setY(pointerEvent.y);
  }

  squash() {
    console.log('sqaush');
    var randX = Phaser.Math.Between(0, Number(this.game.config.width));
    var randY = Phaser.Math.Between(0, Number(this.game.config.height));
    this.bug.setX(randX);
    this.bug.setY(randY);
  }
}

/* -------------------------------------------------------------------------- */
/*                                RUN GAME.                                   */
/* -------------------------------------------------------------------------- */

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 400,
  backgroundColor: '#000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: Example,
};

const game = new Phaser.Game(config);
