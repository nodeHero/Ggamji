const KEY_ENTER = 13;
const KEY_SPACE = 32;

class Ggamji {

  constructor() {
    this.$input = $('#enter_data');
    this.inputData = '';
    this.$target = $('#target');
    this.targetText = null;
    this.$counter = $('#counter');
    this.countNumber = 0;
    this.sliceWord = null;
    this.sliceData = {};
    this.wordIndex = 0;

    this.initEvent();
  }

  initEvent() {
    this.getSliceData();
    this.setWord();
    this.startGgamji();
    this.inputEvent();
  }

  getSliceData() {
    this.sliceWord = new SliceWord;
    this.sliceData = this.sliceWord.takeWordData;
  }

  setWord(wordIndex) {
    this.$target.text(this.sliceData.totalWord[wordIndex || 0]);
    this.targetText = this.$target.text();
  }

  startGgamji() {
    let _this = this;

    $(document).on({
      keydown: () => {
        _this.$input.focus();
      }
    });
  }

  compareWord(_this) {
    return $.trim(_this.inputData) === _this.targetText
  }

  inputEvent() {
    let _this = this;

    this.$input.on({
      keydown: function (event) {

        switch (event.which) {
          case KEY_ENTER:
            if (_this.compareWord(_this)) {
              _this.correctAnswerEvent();
            } else {
              _this.wrongAnswerEvent()
            }
            break;
          case KEY_SPACE:
            if (_this.compareWord(_this)) {
              _this.correctAnswerEvent();
            }
            break;
        }
      },

      input: function () {
        let $this = $(this);
        _this.inputData = $this.val();

        if (_this.compareWord(_this)) {
          _this.addCorrectColor();
        } else {
          _this.removeCorrectColor();
        }
      }

    });
  }

  addCorrectColor() {
    this.$input.addClass('correct');
  }

  removeCorrectColor() {
    this.$input.removeClass('correct');
  }

  correctAnswerEvent() {
    this.iterationCount();
    this.nextWord();
    this.resetInput();
  }

  wrongAnswerEvent() {
    let duration = 50;

    this.$input
      .animate({marginLeft: -10}, duration)
      .animate({marginLeft: 10}, duration)
      .animate({marginLeft: -10}, duration)
      .animate({marginLeft: 10}, duration)
      .animate({marginLeft: 0}, duration / 2);
  }

  iterationCount() {
    this.countNumber++;
    this.$counter.text(this.countNumber);
  }

  resetInput() {
    this.$input.val('');
  }

  nextWord() {
    this.wordIndex++;
    this.setWord(this.wordIndex);
  }

}
