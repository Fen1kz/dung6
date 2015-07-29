'use strict';

import {CompositeMap} from 'app/util/composite-map';

class Cell extends Phaser.Sprite {
    constructor(level, X, Y) {
        super(level.game);

        this.level = level;
        this.X = X;
        this.Y = Y;

        this.cells = new CompositeMap();

        this.x = this.X * this.level.SIZE;
        this.y = this.Y * this.level.SIZE;

        this.anchor.setTo(0.5, 0.5);
        var graphics = this.game.add.graphics();
        graphics.lineStyle(2, 0xdddddd);
        //graphics.lineStyle(2, 0xdddddd);
        graphics.beginFill(0xeeeeee);
        graphics.drawRect(this.width * -.5, this.height * -.5, this.width, this.height);
        //graphics.drawRect(0, 0, this.width, this.height);
        graphics.endFill();
        this.addChild(graphics);

        this.scale.setTo(.5, .5);
        this.alpha = 0;
        this.game.add.tween(this)
            .to({alpha: 1}, 200, Phaser.Easing.Quadratic.InOut, true)
            .chain(this.game.add.tween(this.scale).to({x: 1, y: 1}, 900, Phaser.Easing.Elastic.InOut));

        this.level = level;
        this.level.addChild(this);
    }

    render() {
        console.log('r');
    }
}

export {Cell};
