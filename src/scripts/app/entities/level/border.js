class Border extends Phaser.Sprite {
  constructor(cell1, cell2) {
    super(cell1.game);

    if (!cell1.cells.find(cell2)) {
      throw "Border Error"
    }

    this.level = cell1.level;
    this.cell1 = cell1;
    this.cell2 = cell2;

    let c1toc2 = cell1.directionTo(cell2);
    let c2toc1 = cell2.directionTo(cell1);
    this.cell1.borders.put(c1toc2, this);
    this.cell2.borders.put(c2toc1, this);

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

    if (this.horizontal) {
      this.graphics.moveTo(-this.level.SIZE / 2, 0);
      this.graphics.lineTo(+this.level.SIZE / 2, 0);
    } else {
      this.graphics.moveTo(0, -this.level.SIZE / 2);
      this.graphics.lineTo(0, +this.level.SIZE / 2);
    }
  }

  destroy() {
    this.cell1.borders.removeByValue(this);
    this.cell2.borders.removeByValue(this);
    super.destroy(true);
  }
}
export {Border};
