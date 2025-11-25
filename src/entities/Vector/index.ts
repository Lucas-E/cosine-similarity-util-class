import type { IVector } from "./@types/Vector.interface";

export class Vector implements IVector {
  coefficients: number[] = [];
  label: string = "";
  norm: number = 0;
  constructor(label: string, coefficients: number[]) {
    this.initCoefficients(coefficients);
    this.initLabel(label);
    this.initNorm();
  }

  //init methods
  protected initLabel(label: string) {
    this.setLabel(label);
  }
  protected initCoefficients(coefficients: number[]) {
    this.setCoefficients(coefficients);
  }
  protected initNorm() {
    if (!this.coefficients?.length)
      throw new Error("Coefficients must not be empty");
    this.norm = this.calculateNorm();
  }

  //getters
  getCoefficients() {
    return this.coefficients;
  }
  getNorm() {
    return this.norm;
  }
  protected calculateNorm() {
    const squareSum = this.coefficients.reduce((acc, cur) => {
      return acc + cur * cur;
    }, 0);
    return Math.sqrt(squareSum);
  }

  getDotProduct(vectorToDotProduct: IVector) {
    if (!vectorToDotProduct?.coefficients) {
      throw new Error("vectorToDotProduct must have coefficients");
    }
    if (vectorToDotProduct.coefficients.length !== this.coefficients.length)
      throw new Error(
        "vectors must have the same dimentions to have a dot product"
      );
    return this.coefficients.reduce((acc, cur, index) => {
      return acc + cur * (vectorToDotProduct.coefficients[index] as number);
    }, 0);
  }
  getCossinSimilarity(vectorToCompare: IVector) {
    const dotProduct = this.getDotProduct(vectorToCompare);
    const currentNorme = this.getNorm();
    const comparedVectorNorm = vectorToCompare.getNorm();
    return dotProduct / (currentNorme * comparedVectorNorm);
  }

  //setters
  setCoefficients(newCoefficients: number[]) {
    if (!(newCoefficients instanceof Array)) {
      throw new Error("coefficients must be an array");
    }
    const containNonNumber = newCoefficients.find(
      (el) => !(typeof el === "number")
    );
    if (containNonNumber) {
      throw new Error("all the coefficients must be numbers");
    }
    this.coefficients = newCoefficients;
    const calculatedNorm = this.calculateNorm();
    this.norm = calculatedNorm;
  }
  setLabel(newLabel: string) {
    if (!newLabel || !(typeof newLabel === "string"))
      throw new Error("label must be an string");
    this.label = newLabel
  }
}
