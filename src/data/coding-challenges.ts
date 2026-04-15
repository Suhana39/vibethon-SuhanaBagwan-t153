export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  starterCode: string;
  hint: string;
}

export const codingChallenges: CodingChallenge[] = [
  {
    id: "hello-numpy",
    title: "NumPy Array Basics",
    description: "Create a NumPy array with values [1, 2, 3, 4, 5] and print its mean.",
    level: "beginner",
    starterCode: `import numpy as np

# Create an array with values 1 to 5
arr = np.array([1, 2, 3, 4, 5])

# Calculate and print the mean
print("Array:", arr)
print("Mean:", np.mean(arr))
print("Sum:", np.sum(arr))
print("Standard Deviation:", np.std(arr))`,
    hint: "Use np.array() to create the array and np.mean() to calculate the average.",
  },
  {
    id: "linear-regression",
    title: "Simple Linear Regression",
    description: "Implement a simple linear regression to predict house prices based on square footage.",
    level: "intermediate",
    starterCode: "# Simple Linear Regression from scratch\nimport numpy as np\n\n# Sample data: square footage vs price (in thousands)\nX = np.array([600, 800, 1000, 1200, 1400, 1600])\ny = np.array([150, 200, 250, 300, 350, 400])\n\n# Calculate slope (m) and intercept (b)\nn = len(X)\nm = (n * np.sum(X * y) - np.sum(X) * np.sum(y)) / (n * np.sum(X**2) - np.sum(X)**2)\nb = (np.sum(y) - m * np.sum(X)) / n\n\nprint(f\"Slope: {m:.4f}\")\nprint(f\"Intercept: {b:.4f}\")\nprint(f\"Equation: price = {m:.2f} * sqft + {b:.2f}\")\n\n# Predict for 1100 sqft\nprediction = m * 1100 + b\nprint(f\"Predicted price for 1100 sqft: ${prediction:.0f}k\")",
    hint: "Use the formula: m = (nΣxy - ΣxΣy) / (nΣx² - (Σx)²)",
  },
  {
    id: "gradient-descent",
    title: "Gradient Descent",
    description: "Implement gradient descent to minimize a simple quadratic function f(x) = x².",
    level: "advanced",
    starterCode: `# Gradient Descent to minimize f(x) = x^2
# Derivative: f'(x) = 2x

learning_rate = 0.1
x = 10.0  # Starting point
iterations = 50

print(f"Starting at x = {x}, f(x) = {x**2}")
print("-" * 40)

for i in range(iterations):
    gradient = 2 * x  # derivative of x^2
    x = x - learning_rate * gradient
    if i % 10 == 0 or i == iterations - 1:
        print(f"Iteration {i+1}: x = {x:.6f}, f(x) = {x**2:.6f}")

print(f"\\nFinal: x = {x:.6f} (should be close to 0)")`,
    hint: "Update rule: x_new = x_old - learning_rate * gradient",
  },
];
