import 'phaser';
import GameOverScene from './GameOverScene';
import LocalStorage from '../Objects/LocalStorage';

let score = 0
let platforms
let diamonds
let cursors
let spaceField
let youWin
var sprite
var scoreText

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('tiles', './assets/cybernoid.png', 16, 16);
    this.load.image('phaser', 'assets/phaser-ship.png');
    this.load.image('ground', './assets/platform.png')
    this.load.image('diamond', './assets/apple.png')
    this.load.image('sky', 'assets/space.png');
    this.load.spritesheet('woof',
      './assets/woof.png',
      { frameWidth: 32, frameHeight: 48 }
    );
  }

  create() {
    this.spaceField = this.add.tileSprite(0, 0, 1600, 1400, 'sky')

    sprite = this.physics.add.sprite(300, 90, 'phaser');
    sprite.setBounce(0.2);
    sprite.setCollideWorldBounds(true);

    localStorage.setItem('score', 0);
    platforms = this.physics.add.staticGroup();
    platforms.enableBody = true
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    let ledge = platforms.create(400, 450, 'ground')
    ledge.body.immovable = true

    this.physics.add.collider(sprite, platforms);

    diamonds = this.physics.add.group({
      key: 'diamond',
      repeat: 11,
    });

    diamonds.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    for (var i = 0; i < 12; i++) {
      const diamond = diamonds.create(i * 70, 0, 'diamond')
      diamond.body.gravity.y = 1000
      diamond.body.bounce.y = 0.3 + Math.random() * 0.2
    }

    this.physics.add.collider(diamonds, platforms);
    this.scoreText = this.add.text(16, 16, `Score: ${LocalStorage.readLocalStorage()}`, { fontSize: '32px', fill: '#FFF' })
    cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.spaceField.tilePositionY += 2;
    sprite.body.setVelocityX(0);
    sprite.body.setVelocityY(0);

    if (cursors.up.isDown) {
      sprite.body.setVelocityY(-200)
    }
    else if (cursors.down.isDown) {
      sprite.body.setVelocityY(200)
    }

    if (cursors.left.isDown) {
      sprite.body.setVelocityX(-200);
    }
    else if (cursors.right.isDown) {
      sprite.body.setVelocityX(200)
    }

    this.physics.add.overlap(sprite, diamonds, collectDiamond, null, this)

    if (score === 100) {
      // alert('You win!')
      // score = 0
      this.scoreText.setText(`Score: ${LocalStorage.readLocalStorage()}`);
      this.scene.start('GameOver');
    }
  }
};

function collectDiamond(sprite, diamond) {
  diamond.disableBody(true, true);
  score += 10;
  this.scoreText.setText('Score: ' + score);

  if (diamonds.countActive(true) === 0) {
    diamonds.children.iterate(function (child) {

      child.enableBody(true, child.x, 0, true, true);

    });

    var x = (sprite.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
  }
}