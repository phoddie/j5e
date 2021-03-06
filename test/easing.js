import expectWrapper from "chai";
import * as easing from "j5e/easing";

const expect = expectWrapper.expect;

const inputs = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1];
const results = {
  "linear": [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1],
  "inQuad": [0, 0.01, 0.0625, 0.25, 0.5625, 0.81, 1],
  "outQuad": [0, 0.19, 0.4375, 0.75, 0.9375, 0.99, 1],
  "inOutQuad": [0, 0.02, 0.125, 0.5, 0.875, 0.98, 1],
  "inCube": [0, 0.001, 0.015625, 0.125, 0.421875, 0.729, 1],
  "outCube": [0, 0.270999, 0.578125, 0.875, 0.984375, 0.999, 1],
  "inOutCube": [0, 0.004, 0.0625, 0.5, 0.9375, 0.996, 1],
  "inQuart": [0, 0.0001, 0.00390625, 0.0625, 0.31640625, 0.6561, 1],
  "outQuart": [0, 0.3439, 0.683594, 0.9375, 0.996094, 0.9999, 1],
  "inOutQuart": [0, 0.0008, 0.03125, 0.5, 0.96875, 0.9992, 1],
  "inQuint": [0, 0.00001, 0.000977, 0.03125, 0.237305, 0.59049, 1],
  "outQuint": [0, 0.40951, 0.762695, 0.96875, 0.999023, 0.99999, 1],
  "inOutQuint": [0, 0.00016, 0.015625, 0.5, 0.984375, 0.99984, 1],
  "inSine": [0, 0.012312, 0.07612, 0.292893, 0.617317, 0.843566, 1],
  "outSine": [0, 0.156434, 0.382683, 0.707107, 0.92388, 0.987688, 1],
  "inOutSine": [0, 0.024472, 0.146447, 0.5, 0.853553, 0.975528, 1],
  "inExpo": [0, 0.001953, 0.005524, 0.03125, 0.176777, 0.5, 1],
  "outExpo": [0, 0.5, 0.823223, 0.96875, 0.994476, 0.998047, 1],
  "inOutExpo": [0, 0.001953, 0.015625, 0.5, 0.984375, 0.998047, 1],
  "inCirc": [0, 0.005013, 0.031754, 0.133975, 0.338562, 0.56411, 1],
  "outCirc": [0, 0.43589, 0.661438, 0.866025, 0.968246, 0.994987, 1],
  "inOutCirc": [0, 0.010102, 0.066987, 0.5, 0.933013, 0.989898, 1],
  "inBack": [0, -0.014314, -0.064137, -0.087698, 0.18259, 0.591172, 1],
  "outBack": [0, 0.408828, 0.81741, 1.087697, 1.064137, 1.014314, 1],
  "inOutBack": [0, -0.037519, -0.099682, 0.5, 1.099682, 1.037519, 1],
  "outBounce": [0, 0.075625, 0.472656, 0.765625, 0.972656, 0.988125, 1],
  "inBounce": [0, 0.011875, 0.027344, 0.234375, 0.527344, 0.924375, 1],
  "inOutBounce": [0, 0.03, 0.117188, 0.5, 0.882813, 0.97, 1]
};

describe("easing", function() {

  Object.keys(results).forEach(ef => {
    describe(ef, function() {
      it("It should return the expected values", function() {
        inputs.forEach((val, idx) => {
          expect(Math.abs(easing[ef](val) - results[ef][idx])).to.be.below(0.000001);
        });
      });
    });
  });

});



