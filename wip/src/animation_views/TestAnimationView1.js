define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function TestAnimationView1() {
        View.apply(this, arguments);

         this.rootModifier = new StateModifier({
            align: [0.5, 0.0],
            origin: [0.5, 0.0],
            size: this.options.size
        });

        this.mainNode = this.add(this.rootModifier);

    }

    TestAnimationView1.prototype = Object.create(View.prototype);
    TestAnimationView1.prototype.constructor = TestAnimationView1;

    TestAnimationView1.DEFAULT_OPTIONS = {};

    module.exports = TestAnimationView1;
});

