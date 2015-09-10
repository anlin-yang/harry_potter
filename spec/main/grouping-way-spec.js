var GroupingWay = require('../../main/grouping-way.js');

describe("GroupingWay", function() {
  var theGroupingWay;
  beforeEach(function() {
    theGroupingWay = new GroupingWay();
  });

  describe("constructor", function() {
    it("should include groupingItems Array in this object.", function() {
      expect(theGroupingWay.groupingItems instanceof Array).toBe(true);
    });
  });
});
