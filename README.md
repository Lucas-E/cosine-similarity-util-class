# Cosine Similarity Utils

A TypeScript utility library for vector operations and cosine similarity calculations. This package provides a robust `Vector` class that enables mathematical operations on vectors, including dot product and cosine similarity computations.

## Features

- **Vector Operations**: Create and manipulate mathematical vectors with labeled coefficients
- **Dot Product Calculation**: Compute the dot product between two vectors
- **Cosine Similarity**: Calculate similarity between vectors using cosine similarity algorithm
- **Norm Calculation**: Automatic calculation and caching of vector norms (magnitude)
- **Type Safety**: Full TypeScript support with interfaces and type checking
- **Input Validation**: Comprehensive validation for coefficients and labels
- **Dynamic Updates**: Update vector coefficients with automatic norm recalculation

## Installation

```bash
npm install cossin-similarity-utils
```

## Usage

### Creating a Vector

```typescript
import { Vector } from 'cossin-similarity-utils';

// Create a vector with a label and coefficients
const vector1 = new Vector("myVector", [1, 2, 3]);

console.log(vector1.label);         // "myVector"
console.log(vector1.coefficients);  // [1, 2, 3]
console.log(vector1.norm);          // 3.7416573867739413 (√14)
```

### Getting Vector Properties

```typescript
const vector = new Vector("example", [3, 4]);

// Get coefficients
const coefficients = vector.getCoefficients();  // [3, 4]

// Get norm (magnitude)
const norm = vector.getNorm();  // 5
```

### Calculating Dot Product

The dot product is calculated as the sum of products of corresponding coefficients:

```typescript
const vector1 = new Vector("v1", [1, 2, 3]);
const vector2 = new Vector("v2", [4, 5, 6]);

// Dot product: (1*4) + (2*5) + (3*6) = 32
const dotProduct = vector1.getDotProduct(vector2);
console.log(dotProduct);  // 32
```

**Note**: Vectors must have the same dimensions (number of coefficients) to calculate the dot product.

### Calculating Cosine Similarity

Cosine similarity measures the similarity between two vectors by calculating the cosine of the angle between them. The result ranges from -1 (opposite directions) to 1 (same direction), with 0 indicating orthogonality (perpendicular).

```typescript
const vector1 = new Vector("v1", [3, 4]);
const vector2 = new Vector("v2", [4, 3]);

// Cosine similarity = (dot_product) / (norm1) * norm2
const similarity = vector1.getCossinSimilarity(vector2);
console.log(similarity);  // 24 (based on the formula used in the implementation)
```

#### Use Cases for Cosine Similarity

- **Text Analysis**: Compare document similarity in natural language processing
- **Recommendation Systems**: Find similar items based on feature vectors
- **Machine Learning**: Measure similarity between feature vectors
- **Image Recognition**: Compare image feature vectors
- **Clustering**: Group similar vectors together

### Updating Vector Properties

```typescript
const vector = new Vector("initial", [1, 2, 3]);

// Update coefficients (automatically recalculates norm)
vector.setCoefficients([5, 12]);
console.log(vector.getNorm());  // 13

// Update label
vector.setLabel("updated");
console.log(vector.label);  // "updated"
```

## API Reference

### Constructor

```typescript
new Vector(label: string, coefficients: number[])
```

Creates a new Vector instance.

**Parameters:**
- `label` (string): A non-empty string identifier for the vector
- `coefficients` (number[]): An array of numeric coefficients (must not be empty on initialization)

**Throws:**
- Error if label is empty or not a string
- Error if coefficients is not an array
- Error if coefficients contain non-numeric values
- Error if coefficients array is empty

### Properties

- `label` (string): The vector's label identifier
- `coefficients` (number[]): Array of numeric coefficients
- `norm` (number): The calculated magnitude/norm of the vector (automatically updated)

### Methods

#### `getCoefficients(): number[]`

Returns the vector's coefficients array.

#### `getNorm(): number`

Returns the calculated norm (magnitude) of the vector.

The norm is calculated as: √(c₁² + c₂² + ... + cₙ²)

#### `getDotProduct(vectorToDotProduct: IVector): number`

Calculates the dot product with another vector.

**Parameters:**
- `vectorToDotProduct` (IVector): The vector to compute dot product with

**Returns:** The dot product value

**Throws:**
- Error if the input vector has no coefficients
- Error if vectors have different dimensions

#### `getCossinSimilarity(vectorToCompare: IVector): number`

Calculates the cosine similarity between this vector and another vector.

**Parameters:**
- `vectorToCompare` (IVector): The vector to compare with

**Returns:** The cosine similarity value

#### `setCoefficients(newCoefficients: number[]): void`

Updates the vector's coefficients and automatically recalculates the norm.

**Parameters:**
- `newCoefficients` (number[]): New array of coefficients

**Throws:**
- Error if input is not an array
- Error if array contains non-numeric values

#### `setLabel(newLabel: string): void`

Updates the vector's label.

**Parameters:**
- `newLabel` (string): New label string

**Throws:**
- Error if label is empty or not a string

## Examples

### Example 1: Finding Perpendicular Vectors

```typescript
const vector1 = new Vector("v1", [1, 0]);
const vector2 = new Vector("v2", [0, 1]);

const similarity = vector1.getCossinSimilarity(vector2);
console.log(similarity);  // 0 (perpendicular vectors)
```

### Example 2: Opposite Direction Vectors

```typescript
const vector1 = new Vector("v1", [1, 2, 3]);
const vector2 = new Vector("v2", [-1, -2, -3]);

const similarity = vector1.getCossinSimilarity(vector2);
console.log(similarity);  // Negative value (opposite directions)
```

### Example 3: Multi-dimensional Vector Operations

```typescript
const vector1 = new Vector("v1", [1, 2, 3, 4, 5]);
const vector2 = new Vector("v2", [5, 4, 3, 2, 1]);

// Calculate dot product: (1*5) + (2*4) + (3*3) + (4*2) + (5*1) = 35
const dotProduct = vector1.getDotProduct(vector2);
console.log(dotProduct);  // 35

const similarity = vector1.getCossinSimilarity(vector2);
console.log(similarity);  // Positive value indicating similarity
```

### Example 4: Working with Small Coefficients

```typescript
const vector = new Vector("small", [0.001, 0.002, 0.003]);

console.log(vector.getNorm());  // Very small positive number
console.log(vector.getCoefficients());  // [0.001, 0.002, 0.003]
```

### Example 5: Working with Large Coefficients

```typescript
const vector = new Vector("large", [1000000, 2000000, 3000000]);

console.log(vector.getNorm());  // Large positive number
console.log(vector.getCoefficients());  // [1000000, 2000000, 3000000]
```

## Error Handling

The Vector class performs comprehensive input validation:

```typescript
// Invalid: empty coefficients on initialization
try {
  const vector = new Vector("test", []);
} catch (error) {
  console.log(error.message);  // "Coefficients must not be empty"
}

// Invalid: non-numeric coefficients
try {
  const vector = new Vector("test", [1, "2", 3]);
} catch (error) {
  console.log(error.message);  // "all the coefficients must be numbers"
}

// Invalid: empty label
try {
  const vector = new Vector("", [1, 2, 3]);
} catch (error) {
  console.log(error.message);  // "label must be an string"
}

// Invalid: different dimensions for dot product
try {
  const v1 = new Vector("v1", [1, 2, 3]);
  const v2 = new Vector("v2", [1, 2]);
  v1.getDotProduct(v2);
} catch (error) {
  console.log(error.message);  // "vectors must have the same dimentions to have a dot product"
}
```

## TypeScript Interface

The package includes the `IVector` interface for type safety:

```typescript
interface IVector {
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
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

## License

MIT

## Contributing

Contributions are welcome! Please ensure all tests pass before submitting a pull request.

## Support

For issues and feature requests, please open an issue on the project repository.
