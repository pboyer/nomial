/**
 * Find the roots of polynomial using the method described in
 * High-Performance Polynomial Root Finding for Graphics (Yuksel 2022)
 *
 * @param coeffs coeffs of the polynomial
 * @param startInterval beginning of interval to search (defaults to -1000)
 * @param endInterval end of interval to search (defaults to 1000)
 * @param epsilon tolerance for root finding (defaults to 1e-6)
 * @returns An array of roots
 */
export default function polynomialRoots(coeffs: number[], startInterval?: number, endInterval?: number, epsilon?: number): number[];
export declare function evaluate(coeffs: number[], x: number): number;
export declare function derivative(coeffs: number[]): number[];
