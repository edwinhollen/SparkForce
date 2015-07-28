var SparkForce = (function () {
    function SparkForce(canvas) {
        console.log("Initializing");
        document.title = SparkForce.TITLE + ' (' + SparkForce.VERSION + ')';
        this.ctx = canvas.getContext('2d');
        this.ctx.canvas.width = SparkForce.RENDER_WIDTH;
        this.ctx.canvas.height = SparkForce.RENDER_HEIGHT;
        window.requestAnimationFrame(this.render.bind(this));
    }
    SparkForce.prototype.render = function () {
        window.requestAnimationFrame(this.render.bind(this));
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        var now = new Date().getTime();
    };
    SparkForce.TITLE = 'SparkForce';
    SparkForce.VERSION = '0.0';
    SparkForce.RENDER_WIDTH = 160;
    SparkForce.RENDER_HEIGHT = 120;
    return SparkForce;
})();
//# sourceMappingURL=sparkforce.js.map