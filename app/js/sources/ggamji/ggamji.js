var Ggamji = function () {
  this.init();
};

Ggamji.prototype.init = function () {
  var _that = this;

  _that.$input = $('#enter_data');
  _that.inputData = null;
  _that.inputData = null;
  _that.$target = $('#target');
  _that.targetText = _that.$target.text();
  _that.$counter = $('#counter');
  _that.countNumber = 0;

  _that.initEvent();
};

Ggamji.prototype.initEvent = function () {
  var _that = this;

  _that.startGgamji();
  _that.inputEvent();
};

Ggamji.prototype.startGgamji = function () {
  var _that = this;

  $(document).on({
    keydown: function () {
      _that.$input.focus();
    }
  });
};

Ggamji.prototype.inputEvent = function () {
  var _that = this;

  _that.$input.on({
    keydown: function (event) {
      var $self = $(this);
      var inputData = $self.val();

      console.log(event.which);

      switch (event.which) {
        case 13:  // enter key
          if (inputData == _that.targetText) {
            _that.iterationCount();
            _that.resetInput();
          } else {
            _that.wrongAnswerEvent()
          }
          break;
      }
    },
    keyup: function (event) {
      _that.rightAnswerEvent($(this));
    }
  });
};

Ggamji.prototype.rightAnswerEvent = function ($self) {
  var _that = this;
  var inputData = $self.val();

  if (inputData === _that.targetText) {
    _that.$input.addClass('right');
  } else {
    _that.$input.removeClass('right');
  }
};

Ggamji.prototype.wrongAnswerEvent = function () {
  var _that = this;
  var duration = 50;

  _that.$input
    .animate({ marginLeft: -10 }, duration)
    .animate({ marginLeft: 10 }, duration)
    .animate({ marginLeft: -10}, duration)
    .animate({ marginLeft: 10}, duration)
    .animate({ marginLeft: 0 }, duration / 2);
};

Ggamji.prototype.iterationCount = function () {
  var _that = this;

  _that.countNumber++;
  _that.$counter.text(_that.countNumber);
};

Ggamji.prototype.resetInput = function () {
  var _that = this;

  _that.$input.val('');
};
