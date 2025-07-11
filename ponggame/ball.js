class Ball {
    posx;
    posy;
    velx;
    vely;
    inPlay;

    constructor(posx, posy, velx, vely) {
        this.posx = posx;
        this.posy = posy;
        this.velx = velx;
        this.vely = vely;
        this.inPlay = false;
    }


    move() {
        this.posx += this.velx;
        this.posy += this.vely;

    }

    bounce(things) {
        this.bounceWalls();
        for (let thing of things) {
            if (thing instanceof Paddle) {
                if (thing.side == SIDE.LEFT) {
                    let side = this.bounceLeftPaddle(thing);
                    if (side != SIDE.NONE) return side;
                }
                if (thing.side == SIDE.RIGHT) {
                    let side = this.bounceRightPaddle(thing);
                    if (side != SIDE.NONE) return side;
                }
            }
        }
        return SIDE.NONE;
    }

    bounceWalls() {
        if (this.posy - BALL_RADIUS < 0) {
            this.vely = Math.abs(this.vely);
        }
        if (this.posy + BALL_RADIUS > BOARD_HEIGHT) {
            this.vely = -Math.abs(this.vely);
        }
    }

    bounceLeftPaddle(paddle) {
        if (this.posx - BALL_RADIUS > paddle.width) return SIDE.NONE;
        if (this.posx - BALL_RADIUS < 0) return SIDE.RIGHT; // Someone got a point...
        if (this.posy < paddle.posy) return SIDE.NONE;
        if (this.posy > paddle.posy + paddle.height) return SIDE.NONE;
        if (this.velx < 0) {
            this.velx = PADDLE_FORCE * Math.abs(this.velx);
            // add other spin, etc.
        }
        return SIDE.NONE;
    }

    bounceRightPaddle(paddle) {
        if (this.posx + BALL_RADIUS < paddle.posx) return SIDE.NONE;
        if (this.posx + BALL_RADIUS > paddle.posx + paddle.width) return SIDE.LEFT; // Someone got a point...
        if (this.posy < paddle.posy) return SIDE.NONE;
        if (this.posy > paddle.posy + paddle.height) return SIDE.NONE;
        if (this.velx > 0) {
            this.velx = -PADDLE_FORCE * Math.abs(this.velx);
            // add other spin, etc.
            // add sound?
        }
        return SIDE.NONE;
    }
}