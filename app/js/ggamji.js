var Ggamji = function () {
  this.init();
};


Ggamji.prototype.init = function () {
  var _that = this;
  _that.$input = $('#enter_data');

  _that.initEvent();
};

Ggamji.prototype.initEvent = function () {
  var _that = this;

  _that.inputEvent();
};

Ggamji.prototype.inputEvent = function () {
  var _that = this;

  _that.$input.on({
    keydown: function (e) {
      console.log(e.which);
    }
  });
};
