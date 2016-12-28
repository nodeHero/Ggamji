var Ggamji = function () {
  this.$input = $('#enter_data');
  this.inputData = '';
  this.$target = $('#target');
  this.targetText = this.$target.text();
  this.$counter = $('#counter');
  this.countNumber = 0;

  this.KEY_ENTER = 13;
  this.KEY_SPACE = 32;

  this.initEvent();
};

Ggamji.prototype = {

  initEvent: function () {
    this.startGgamji();
    this.inputEvent();
  },

  startGgamji: function () {
    var _this = this;

    $(document).on({

      keydown: function () {
        _this.$input.focus();
      }

    });
  },

  inputEvent: function () {
    var _this = this;

    this.$input.on({
      keydown: function (event) {
        switch (event.which) {
          case _this.KEY_ENTER:  // Enter key

            if (_this.inputData === _this.targetText) {
              _this.correctAnswerEvent();
            } else {
              _this.wrongAnswerEvent()
            }
            break;
        }
      },
      input: function () {
        var $this = $(this);
        _this.inputData = $this.val();

        if (_this.inputData === _this.targetText) {
          _this.addCorrectColor();
        } else {
          _this.removeCorrectColor();
        }
      }

    });
  },

  addCorrectColor: function () {
    this.$input.addClass('correct');
  },

  removeCorrectColor: function () {
    this.$input.removeClass('correct');
  },

  correctAnswerEvent: function () {
    this.iterationCount();
    this.resetInput();
  },

  wrongAnswerEvent: function () {
    var duration = 50;

    this.$input
      .animate({marginLeft: -10}, duration)
      .animate({marginLeft: 10}, duration)
      .animate({marginLeft: -10}, duration)
      .animate({marginLeft: 10}, duration)
      .animate({marginLeft: 0}, duration / 2);
  },

  iterationCount: function () {
    this.countNumber++;
    this.$counter.text(this.countNumber);
  },

  resetInput: function () {
    this.$input.val('');
  }

};
