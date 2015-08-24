class Border extends Phaser.Sprite {
  constructor(cell1, cell2) {
    super(cell1.game);

    if (!cell1.cells.findKey(cell2)) {
      throw "Border Error"
    }

    var c1toc2 = cell1.directionTo(cell2);
    if (cell2) var c2toc1 = cell2.directionTo(cell1);

    this.level = cell1.level;
    this.level.borders.push(this);
    this.cell1 = cell1;
    //if (cell2) {
      this.cell2 = cell2;
    //} else {
    //  this.cell2 = {x, y}
    //}

    this.cell1.borders.put(c1toc2, this, false);
    if (cell2) this.cell2.borders.put(c2toc1, this, false);

    this.x = (cell1.x + cell2.x) * .5;
    this.y = (cell1.y + cell2.y) * .5;
    //console.log(`Connected (${cell1.X},${cell1.Y}) | | (${cell2.X},${cell2.Y})`);
    //console.log(`Connected (${cell1.x},${cell1.y}) | (${this.x}, ${this.y}) | (${cell2.x},${cell2.y})`);

    this.horizontal = cell1.X === cell2.X;
    this.anchor.setTo(0.5, 0.5);

    this.level.addChild(this);
    this.graphics = this.game.add.graphics();
    this.addChild(this.graphics);

    this.draw();
  }

  draw() {
    this.graphics.clear();
    this.graphics.lineStyle(4, 0x0);

    //if (this.horizontal) {
    //  this.graphics.moveTo(-.5 * this.game.c.SIZE, this.game.c.SIZE);
    //  this.graphics.lineTo(.5 * this.game.c.SIZE, this.game.c.SIZE);
    //} else {
    //  this.graphics.moveTo(this.game.c.SIZE, -.5 * this.game.c.SIZE);
    //  this.graphics.lineTo(this.game.c.SIZE, .5 * this.game.c.SIZE);
    //}
    if (this.horizontal) {
      this.graphics.moveTo(-.5 * this.game.c.SIZE, 0);
      this.graphics.lineTo(.5 * this.game.c.SIZE, 0);
    } else {
      this.graphics.moveTo(0, -.5 * this.game.c.SIZE);
      this.graphics.lineTo(0, .5 * this.game.c.SIZE);
    }

    //if (this.horizontal) {
    //  this.graphics.moveTo(-this.game.c.SIZE / 2, 0);
    //  this.graphics.lineTo(+this.game.c.SIZE / 2, 0);
    //} else {
    //  this.graphics.moveTo(0, -this.game.c.SIZE / 2);
    //  this.graphics.lineTo(0, +this.game.c.SIZE / 2);
    //}
  }

  destroy() {
    _.remove(this.level.borders, this);
    this.cell1.borders.removeByValue(this);
    if (this.cell2.borders) this.cell2.borders.removeByValue(this);
    super.destroy(true);
  }
}
export {Border};
