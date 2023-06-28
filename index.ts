import Phaser from 'phaser';

// Import stylesheets
import './style.css';

/* --------------------------------- SCENE ------------------------------- */

class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.baseURL = 'https://neoalchemy.github.io/swatter-phaser-2k9cz5/';
    this.load.image('swatter', 'static/assets/swatter-v2.png');
    this.load.image('bug', 'static/assets/bug.png');
  }

  create() {
    /* Create BUG */
    this.bug = this.physics.add.sprite(50, 50, 'bug');

    /* CREATE SWATTER */
    this.swatter = this.physics.add.sprite(100, 100, 'swatter');

    /* MOVE SWATTER */
    this.input.on('pointermove', this.moveSwatter, this);
  }

  private swatter: Phaser.Physics.Arcade.Sprite;
  private bug: Phaser.Physics.Arcade.Sprite;

  update() {
    this.physics.overlap(this.bug, this.swatter, this.squash, null, this);
  }

  moveSwatter(pointerEvent: PointerEvent) {
    this.swatter.setX(pointerEvent.x);
    this.swatter.setY(pointerEvent.y);
  }

  squash() {
    var randX = Phaser.Math.Between(0, 400);
    var randY = Phaser.Math.Between(0, 400);
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
