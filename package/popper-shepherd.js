"use strict";
/* global Popper */

var c = 0;
function unique() {
  return c++;
}

function Tour(options) {
  // @TODO: add validations
  if (!options) {
    options = {};
  }
  this.options = options;
  this.steps = [];
  this.current = 0;
}
Tour.prototype[Symbol.toStringTag] = 'Tour';

function addStep(step) {
  this.steps.push(step);
  return this;
}
Tour.prototype.addStep = addStep;

function run(step) {
  var newDiv = document.createElement("div");
  var newContent = document.createTextNode("Hi there and greetings!");
  newDiv.appendChild(newContent);
  step.element = newDiv;
  var popper = new Popper(
    step.attachTo['element'],
    step.element,
    {
      placement: step.attachTo['position']
    }
  );
  document.body.appendChild(step.element);
}
Tour.prototype.run = run;

function prepareStep(step) {
  var attach = step['attachTo'].split(' ');
  step['attachTo'] = {
    element: document.querySelector(attach[0]),
    position: attach[1]
  };
  return step;
}
Tour.prototype.prepareStep = prepareStep;


/*~
 * stability: stable
 * type: |
 *   forall a: (a) => Tour a
 */
function of(options) {
  return new Tour(options);
}

function add(tour) {
  return function(step) {
    step = Object.assign({
      id: unique(),
      title: 'Example',
      text: 'This is a example step, please add title and text to step object to display something different.',
    }, step);

    if (!Object.keys(step).some(key => key == "attachTo")) {
      throw "you should provide an 'attachTo' key at Tour.step";
    }

    return tour.addStep(step);
  }
}

/*~
 * stability: stable
 * type: |
 *   forall a: Tour a => Tour a
 */
function runTour(tour) {
  var step = tour.prepareStep(tour.steps[tour.current]);
  return tour.run(step);
}

function stopTour(tour) {

}

// run . addStep . addStep . of

if (typeof exports === 'object') {
  // Node, CommonJS-like
  module.exports = {
    Tour: Tour,
    of: of,
    add: add,
    run: runTour,
    stop: stopTour
  };
} else {
  window.Shepherd = {
    Tour: Tour,
    of: of,
    add: add,
    run: runTour,
    stop: stopTour
  };
}
