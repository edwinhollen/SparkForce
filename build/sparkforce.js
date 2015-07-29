var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SparkForce = (function () {
    function SparkForce(canvas) {
        this.title = 'SparkForce';
        this.version = '0.0';
        this.renderWidth = 160;
        this.renderHeight = 120;
        this.entities = [];
        console.log("Initializing");
        document.title = this.title + ' (' + this.version + ')';
        this.ctx = canvas.getContext('2d');
        this.ctx.canvas.width = this.renderWidth;
        this.ctx.canvas.height = this.renderHeight;
        for (var i = 0; i < 10; i++) {
            this.entities.push(new Entity(new PositionComponent(chance.integer({ min: 0, max: this.renderHeight }), chance.integer({ min: 0, max: this.renderHeight })), new HitboxComponent(0, 0, chance.integer({ min: 2, max: 7 }), chance.integer({ min: 2, max: 7 }))));
        }
        window.requestAnimationFrame(this.render.bind(this));
    }
    SparkForce.prototype.render = function () {
        var _this = this;
        window.requestAnimationFrame(this.render.bind(this));
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = 'orange';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.entitiesWith([PositionComponent, HitboxComponent]).forEach(function (entity) {
            var position = entity.getComponent(PositionComponent);
            var hitbox = entity.getComponent(HitboxComponent);
            var baseX = position.x + hitbox.x;
            var baseY = position.y + hitbox.y;
            _this.ctx.fillStyle = 'green';
            _this.ctx.moveTo(baseX, baseY);
            _this.ctx.beginPath();
            hitbox.points.forEach(function (point) {
                _this.ctx.lineTo(baseX + point.x, baseY + point.y);
            });
            _this.ctx.fill();
            _this.ctx.closePath();
        });
    };
    SparkForce.prototype.entitiesWith = function (componentTypes) {
        return this.entities.filter(function (entity) {
            return entity.hasComponents(componentTypes);
        });
    };
    return SparkForce;
})();
var Entity = (function () {
    function Entity() {
        var _this = this;
        var components = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            components[_i - 0] = arguments[_i];
        }
        this.components = [];
        components.forEach(function (c) {
            _this.components.push(c);
        });
    }
    Entity.prototype.getComponents = function (t) {
        return this.components.filter(function (c) {
            return (c instanceof t);
        });
    };
    Entity.prototype.getComponent = function (t) {
        return this.getComponents(t)[0];
    };
    Entity.prototype.hasComponent = function (t) {
        return this.getComponents(t).length > 0;
    };
    Entity.prototype.hasComponents = function (ts) {
        var _this = this;
        return ts.every(function (t) {
            return _this.hasComponent(t);
        });
    };
    return Entity;
})();
var Point = (function () {
    function Point(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    return Point;
})();
var Polygon = (function () {
    function Polygon() {
        var _this = this;
        var points = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            points[_i - 0] = arguments[_i];
        }
        this.points = [];
        points.forEach(function (p) {
            _this.points.push(p);
        });
    }
    return Polygon;
})();
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(x, y, width, height) {
        _super.call(this, new Point(x, y), new Point(x + width, y), new Point(x + width, y + height), new Point(x, y + height));
    }
    Object.defineProperty(Rectangle.prototype, "x", {
        get: function () {
            return this.points[0].x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "y", {
        get: function () {
            return this.points[0].y;
        },
        enumerable: true,
        configurable: true
    });
    return Rectangle;
})(Polygon);
var PositionComponent = (function (_super) {
    __extends(PositionComponent, _super);
    function PositionComponent(x, y) {
        _super.call(this, x, y);
    }
    return PositionComponent;
})(Point);
var HitboxComponent = (function (_super) {
    __extends(HitboxComponent, _super);
    function HitboxComponent(x, y, width, height) {
        _super.call(this, x, y, width, height);
    }
    return HitboxComponent;
})(Rectangle);
//# sourceMappingURL=sparkforce.js.map