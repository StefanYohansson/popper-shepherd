require('jsdom-global')();
var assert = require('chai').assert;
var Popper = require('popper.js');
window.Popper = Popper;
global.Popper = Popper;
var Shepherd = require('../package/popper-shepherd.js');

function newTour() {
  return Shepherd.of();
}

function addStep(tour) {
  return function(options) {
    return Shepherd.add(tour)(options);
  };
}

function runTour(tour) {
  return Shepherd.run(tour);
}

describe('Tour', function() {
  describe('#of', function() {
    it('should instantiate a new Tour reference with default options', function() {
      var tour = newTour();
      assert.typeOf(tour.options, 'object');
      assert.equal(tour.current, 0);
    });
  });

  describe('#add', function() {
    it('should add a new step', function() {
      var tour = newTour();
      var newStep = addStep(tour);
      newStep({
        title: 'gore',
        text: 'feelings',
        attachTo: '.reference bottom'
      });
      assert.equal(tour.steps.length, 1);

      newStep({
        title: 'gore',
        text: 'feelings',
        attachTo: '.reference2 left'
      });
      assert.equal(tour.steps.length, 2);
    });
  });

  /*
   * Run test is not working
   * why?
   * Popper uses Range from level 2 dom api
   * jsdom doesn't support it yet
   * https://github.com/tmpvar/jsdom/issues/317
   * Oct 27 2017
  describe('#run', function() {
    it('should run one step', function() {
      document.body.innerHTML = `
      <html>
        <body>
          <button class="reference">
            Reference button
          </button>
        </body>
      </html>
      `;
      var tour = newTour();
      var newStep = addStep(tour);
      newStep({
        title: 'gore',
        text: 'feelings',
        attachTo: '.reference bottom'
      });
      runTour(tour);
    });
  });
  */
});
