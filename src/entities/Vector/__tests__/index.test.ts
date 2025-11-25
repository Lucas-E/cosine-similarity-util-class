import { Vector } from "../index";

describe("Vector", () => {
  describe("Constructor and initialization", () => {
    it("should create a vector with valid label and coefficients", () => {
      const vector = new Vector("testVector", [1, 2, 3]);

      expect(vector.label).toBe("testVector");
      expect(vector.coefficients).toEqual([1, 2, 3]);
      expect(vector.norm).toBeCloseTo(Math.sqrt(14), 10);
    });

    it("should throw error when coefficients are empty", () => {
      expect(() => new Vector("test", [])).toThrow(
        "Coefficients must not be empty"
      );
    });

    it("should throw error when label is empty string", () => {
      expect(() => new Vector("", [1, 2, 3])).toThrow(
        "label must be an string"
      );
    });

    it("should throw error when label is not a string", () => {
      expect(() => new Vector(123 as any, [1, 2, 3])).toThrow(
        "label must be an string"
      );
    });

    it("should throw error when coefficients is not an array", () => {
      expect(() => new Vector("test", "not an array" as any)).toThrow(
        "coefficients must be an array"
      );
    });

    it("should throw error when coefficients contain non-number values", () => {
      expect(() => new Vector("test", [1, "2", 3] as any)).toThrow(
        "all the coefficients must be numbers"
      );
    });
  });

  describe("getCoefficients", () => {
    it("should return the coefficients array", () => {
      const vector = new Vector("test", [1, 2, 3]);
      expect(vector.getCoefficients()).toEqual([1, 2, 3]);
    });
  });

  describe("getNorm", () => {
    it("should return the correct norm for positive coefficients", () => {
      const vector = new Vector("test", [3, 4]);
      expect(vector.getNorm()).toBe(5);
    });

    it("should return the correct norm for negative coefficients", () => {
      const vector = new Vector("test", [-3, -4]);
      expect(vector.getNorm()).toBe(5);
    });

    it("should return the correct norm for mixed coefficients", () => {
      const vector = new Vector("test", [1, -2, 2]);
      expect(vector.getNorm()).toBe(3);
    });

    it("should return the correct norm for single coefficient", () => {
      const vector = new Vector("test", [5]);
      expect(vector.getNorm()).toBe(5);
    });
  });

  describe("getDotProduct", () => {
    it("should calculate dot product correctly for two vectors", () => {
      const vector1 = new Vector("v1", [1, 2, 3]);
      const vector2 = new Vector("v2", [4, 5, 6]);

      // 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32
      expect(vector1.getDotProduct(vector2)).toBe(32);
    });

    it("should calculate dot product correctly with negative values", () => {
      const vector1 = new Vector("v1", [1, -2, 3]);
      const vector2 = new Vector("v2", [-4, 5, 6]);

      // 1*(-4) + (-2)*5 + 3*6 = -4 - 10 + 18 = 4
      expect(vector1.getDotProduct(vector2)).toBe(4);
    });

    it("should return 0 for perpendicular vectors", () => {
      const vector1 = new Vector("v1", [1, 0]);
      const vector2 = new Vector("v2", [0, 1]);

      expect(vector1.getDotProduct(vector2)).toBe(0);
    });

    it("should throw error when vector has no coefficients", () => {
      const vector1 = new Vector("v1", [1, 2, 3]);
      const vector2 = { coefficients: undefined } as any;

      expect(() => vector1.getDotProduct(vector2)).toThrow(
        "vectorToDotProduct must have coefficients"
      );
    });

    it("should throw error when vectors have different dimensions", () => {
      const vector1 = new Vector("v1", [1, 2, 3]);
      const vector2 = new Vector("v2", [1, 2]);

      expect(() => vector1.getDotProduct(vector2)).toThrow(
        "vectors must have the same dimentions to have a dot product"
      );
    });
  });

  describe("getCossinSimilarity", () => {
    it("should return 1 for identical unit vectors", () => {
      const vector1 = new Vector("v1", [1, 0, 0]);
      const vector2 = new Vector("v2", [1, 0, 0]);

      expect(vector1.getCossinSimilarity(vector2)).toBeCloseTo(1, 10);
    });

    it("should return 0 for perpendicular vectors", () => {
      const vector1 = new Vector("v1", [1, 0]);
      const vector2 = new Vector("v2", [0, 1]);

      expect(vector1.getCossinSimilarity(vector2)).toBeCloseTo(0, 10);
    });

    it("should calculate similarity correctly for non-unit vectors", () => {
      const vector1 = new Vector("v1", [3, 4]);
      const vector2 = new Vector("v2", [4, 3]);

      // dot product = 3*4 + 4*3 = 24
      // norm1 = 5, norm2 = 5
      // similarity = 24 / (5 * 5) = 24/25 = 0.96
      const similarity = vector1.getCossinSimilarity(vector2);
      expect(similarity).toBeCloseTo(0.96, 10);
    });

    it("should handle negative coefficients correctly", () => {
      const vector1 = new Vector("v1", [1, 2, 3]);
      const vector2 = new Vector("v2", [-1, -2, -3]);

      // These vectors point in opposite directions
      // dot product = -1 - 4 - 9 = -14
      // norms = sqrt(14) each
      // similarity = -14 / (sqrt(14) * sqrt(14)) = -14 / 14 = -1
      const similarity = vector1.getCossinSimilarity(vector2);
      expect(similarity).toBeCloseTo(-1, 10);
    });
  });

  describe("setCoefficients", () => {
    it("should update coefficients and recalculate norm", () => {
      const vector = new Vector("test", [1, 2, 3]);

      vector.setCoefficients([3, 4]);

      expect(vector.coefficients).toEqual([3, 4]);
      expect(vector.getNorm()).toBe(5);
    });

    it("should throw error when setting non-array coefficients", () => {
      const vector = new Vector("test", [1, 2, 3]);

      expect(() => vector.setCoefficients("not an array" as any)).toThrow(
        "coefficients must be an array"
      );
    });

    it("should throw error when setting coefficients with non-number values", () => {
      const vector = new Vector("test", [1, 2, 3]);

      expect(() => vector.setCoefficients([1, "2", 3] as any)).toThrow(
        "all the coefficients must be numbers"
      );
    });

    it("should allow setting empty coefficients array", () => {
      const vector = new Vector("test", [1, 2, 3]);

      vector.setCoefficients([]);

      expect(vector.coefficients).toEqual([]);
      expect(vector.getNorm()).toBe(0);
    });
  });

  describe("setLabel", () => {
    it("should throw error when setting empty label", () => {
      const vector = new Vector("test", [1, 2, 3]);

      expect(() => vector.setLabel("")).toThrow(
        "label must be an string"
      );
    });

    it("should throw error when setting non-string label", () => {
      const vector = new Vector("test", [1, 2, 3]);

      expect(() => vector.setLabel(123 as any)).toThrow(
        "label must be an string"
      );
    });

    it("should throw error when setting null label", () => {
      const vector = new Vector("test", [1, 2, 3]);

      expect(() => vector.setLabel(null as any)).toThrow(
        "label must be an string"
      );
    });
  });

  describe("Integration tests", () => {
    it("should work correctly with zero coefficients", () => {
      const vector = new Vector("test", [0, 0, 0]);

      expect(vector.getNorm()).toBe(0);
    });

    it("should handle very small coefficients", () => {
      const vector = new Vector("test", [0.001, 0.002, 0.003]);

      expect(vector.getNorm()).toBeGreaterThan(0);
      expect(vector.getCoefficients()).toEqual([0.001, 0.002, 0.003]);
    });

    it("should handle very large coefficients", () => {
      const vector = new Vector("test", [1000000, 2000000, 3000000]);

      expect(vector.getNorm()).toBeGreaterThan(0);
      expect(vector.getCoefficients()).toEqual([1000000, 2000000, 3000000]);
    });

    it("should calculate dot product and similarity for multi-dimensional vectors", () => {
      const vector1 = new Vector("v1", [1, 2, 3, 4, 5]);
      const vector2 = new Vector("v2", [5, 4, 3, 2, 1]);

      // dot product = 1*5 + 2*4 + 3*3 + 4*2 + 5*1 = 5 + 8 + 9 + 8 + 5 = 35
      expect(vector1.getDotProduct(vector2)).toBe(35);

      const similarity = vector1.getCossinSimilarity(vector2);
      expect(similarity).toBeGreaterThan(0);
    });
  });
});
