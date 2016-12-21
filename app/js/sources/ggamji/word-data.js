/*
{
  "title": "Hercules And The Wagoner",
  "contents": "A Carter was driving a wagon along a country lane, when the wheels sank down deep into a rut. The rustic driver, stupefied and aghast, stood looking at the wagon, and did nothing but utter loud cries to Hercules to come and help him. Hercules, it is said, appeared and thus addressed him: 'Put your shoulders to the wheels, my man. Goad on your bullocks, and never more pray to me for help, until you have done your best to help yourself, or depend upon it you will henceforth pray in vain.' Self-help is the best help."
};
*/

class SliceWord {

  constructor() {
    this.storyData = "A Carter was driving a wagon along a country lane, when the wheels sank down deep into a rut. The rustic driver, stupefied and aghast, stood looking at the wagon, and did nothing but utter loud cries to Hercules to come and help him. Hercules, it is said, appeared and thus addressed him: 'Put your shoulders to the wheels, my man. Goad on your bullocks, and never more pray to me for help, until you have done your best to help yourself, or depend upon it you will henceforth pray in vain.' Self-help is the best help.";

    this.getStoryLoad();
  }

  getStoryLoad() {
    this.totalWord = this.storyData.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, '').toLowerCase().split(' ');
    for (var i = 0; i < this.totalWord.length; i++) {
      if (this.totalWord[i].length <= 1) this.totalWord.splice(i, 1);
    }
    this.totalWordLength = this.totalWord.length;
  }

  get takeWordData() {
    return {
      totalWord: this.totalWord,
      wordLength: this.totalWordLength
    }
  }

}
