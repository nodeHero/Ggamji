var Ggamji = function () {
  this.$input = $('#enter_data');
  this.$target = $('#target');
  this.targetText = this.$target.text();
  this.$counter = $('#counter');
  this.countNumber = 0;

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
        var $this = $(this);

        var inputData = $this.val();

        switch (event.which) {
          case 13:  // Enter key

            if (inputData == _this.targetText) {
              _this.iterationCount();
              _this.resetInput();
            } else {
              _this.wrongAnswerEvent()
            }
            break;
        }
      }

    });
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
