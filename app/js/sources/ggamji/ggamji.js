var data = {
  "word1": "hello",
  "Word2": "world",
  "word3": "good"
};

var Ggamji = function () {
  this.$input = $('#enter_data');
  this.inputData = '';
  this.$target = $('#target');
  this.targetText = null;
  this.$counter = $('#counter');
  this.countNumber = 0;
  this.words = null;
  this.currentWordId = 0;

  this.KEY_ENTER = 13;
  this.KEY_SPACE = 32;

  this.initEvent();
};

Ggamji.prototype = {

  initEvent: function () {
    this.requestOneWord(this.currentWordId);
    this.startGgamji();
    this.addInputEventHandler();
    this.addPrevEventHandler();
    this.addNextEventHandler();
  },

  requestOneWord: function (wordId) {
    if (wordId === undefined
      || typeof wordId !== 'number'
      || String(wordId).indexOf('.') !== -1) {
      console.error('wrong word id!');
      return false;
    }

    var _this = this;

    $.ajax({
      url: 'http://localhost:3000/words/' + wordId,
      dataType: 'json',
      success: function (data) {
        if (data.name === undefined) console.log('result is not word!');
        _this.setWord(data);
      },
      error: function (err) {
        console.error(err);
        _this.handleAjaxOneWord(false);
      }
    });
  },

  handleAjaxOneWord: function (result) {
    if (result === false) {
      this.currentWordId--;
    }
  },

  startGgamji: function () {
    var _this = this;

    $(document).on({

      keydown: function () {
        _this.$input.focus();
      }

    });
  },

  setWord: function (data) {
    this.words = data;
    this.$target.text(this.words.name);
    this.targetText = this.words.name;
  },

  nextWord: function () {
    this.currentWordId++;
    this.requestOneWord(this.currentWordId);
  },

  prevWord: function () {
    if (this.currentWordId <= 0) {
      console.error('ggamji.prevWord(): currentWordId is ' + this.currentWordId);
      return;
    } else {
      this.currentWordId--;
    }
    this.requestOneWord(this.currentWordId);
  },

  addInputEventHandler: function () {
    var _this = this;

    this.$input.on({
      keydown: function (event) {
        switch (event.which) {
          case _this.KEY_ENTER:  // Enter key

            _this.examineWord();
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

  addPrevEventHandler: function () {
    var _this = this;

    $('._prevBtn').on('click', function () {
      _this.prevWord();
    });
  },

  addNextEventHandler: function () {
    var _this = this;

    $('._nextBtn').on('click', function () {
      _this.nextWord();
    });
  },

  examineWord: function () {
    if (this.inputData === this.targetText) {
      this.handleCorrectAnswer();
    } else {
      this.handleWrongAnswer()
    }
  },

  addCorrectColor: function () {
    this.$input.addClass('correct');
  },

  removeCorrectColor: function () {
    this.$input.removeClass('correct');
  },

  handleCorrectAnswer: function () {
    this.increaseCount();
    this.resetInput();
  },

  handleWrongAnswer: function () {
    var duration = 50;

    this.$input
      .animate({marginLeft: -10}, duration)
      .animate({marginLeft: 10}, duration)
      .animate({marginLeft: -10}, duration)
      .animate({marginLeft: 10}, duration)
      .animate({marginLeft: 0}, duration / 2);
  },

  increaseCount: function () {
    this.countNumber++;
    this.$counter.text(this.countNumber);
  },

  resetInput: function () {
    this.$input.val('');
  }
};
