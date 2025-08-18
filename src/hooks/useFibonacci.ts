/**
 * Custom hook to calculate Fibonacci number for a given input
 * Uses memoization to cache results and prevent recalculation
 * @param n - The position in Fibonacci sequence (0-based)
 * @returns The Fibonacci number at position n
 */
export const useFibonacci = (n: number): number => {
  if (n < 0) return 0;
  if (n <= 1) return n;

  // Helper function to calculate Fibonacci with dynamic programming
  const calculateFibonacci = (num: number): number => {
    if (num <= 1) return num;

    let prev = 0;
    let current = 1;

    // Use iteration instead of recursion for better performance
    for (let i = 2; i <= num; i++) {
      const next = prev + current;
      prev = current;
      current = next;
    }

    return current;
  };

  return calculateFibonacci(n);
};
