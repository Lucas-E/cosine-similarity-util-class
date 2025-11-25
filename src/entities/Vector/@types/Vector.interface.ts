export interface IVector{
    /**
     * Vector coefficients
     * The coefficients must be numbers
     */
    coefficients: number[];
    label: string;
    norm: number;
    getNorm: () => number;
    getCoefficients: () => number[];
    getCossinSimilarity: (vectorToCompare: IVector) => number;
    getDotProduct: (vectorToDotProduct: IVector) => number;
    setLabel: (newLabel: string) => void;
    setCoefficients: (newCoefficients: number[]) => void;
}