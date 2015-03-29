#!/usr/bin/env node
/*jshint esnext: true */
"use strict";

class Numbers {
  constructor(array) {
    this.numbers = array.map(Numbers.parseNumber);
  }
  
  static parseNumber(object) {
    let number = +object;
    if (isNaN(number)) {
      throw new Error("Object cannot be converted to a number");
    }
    return number;
  }

  sum() {
    return this.numbers.reduce((previousValue, currentValue) =>
      previousValue + currentValue, 0);
  }
}

(function() {
  let numbers = new Numbers(process.argv.splice(2));
  console.log(numbers.sum());
})();
