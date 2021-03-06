import assert from "assert";
import sinon from "sinon";
import { Digital } from "@dtex/mock-io";
import { constrain, normalizeParams, timer } from "j5e/fn";

describe("Fn", function() {

  describe("normalizeParams", function() {

    it("should return valid ioOpts and deviceOpts when passed a provider object", function() {
      const options = normalizeParams({
        io: Digital,
        pin: 13
      });
      assert.equal(Object.is(options.io, Digital), true);
      assert.equal(options.pin, 13);
      assert.equal(typeof options, "object");
      assert.equal(Object.keys(options).length, 2);
    });

    it("should return valid ioOpts and deviceOpts when passed a provider object and device object", function() {
      const options = normalizeParams({
        io: Digital,
        pin: 13,
        someProp: 1
      });
      assert.equal(typeof options, "object");
      assert.equal(Object.is(options.io, Digital), true);
      assert.equal(options.pin, 13);
      assert.equal(Object.keys(options).length, 3);
    });

  });

  describe("constrain", function() {

    it("should return the value when value is in range", function() {
      const result = constrain(128, 0, 255);
      assert.equal(result, 128);
    });

    it("should return the max when value is beyond range", function() {
      const result = constrain(512, 0, 255);
      assert.equal(result, 255);
    });

    it("should return the min when value is below range", function() {
      const result = constrain(1, 128, 255);
      assert.equal(result, 128);
    });

    it("should work with a negative min", function() {
      const result = constrain(128, -128, 255);
      assert.equal(result, 128);
    });

    it("should work with all negative numbers", function() {
      const result = constrain(-128, -255, -0);
      assert.equal(result, -128);
    });

  });

  // describe('setInterval', function() {
  //   it('should return the GLOBAL setInterval by default', function() {
  //     const localSetInterval = setInterval;
  //     assert.equal(Object.is(localSetInterval, GLOBAL.setInterval), true);
  //   });
  // });

});
