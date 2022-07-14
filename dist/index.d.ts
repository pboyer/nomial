/**
 * Class representing a polynomial.
 */
export declare class Polynomial {
    readonly coefficients: readonly number[];
    readonly degree: number;
    /**
     * @param coefficients coefficients in order of increasing power eg 1 + 2x + 3x^2 - 12x^3 => [1, 2, 3, -12]
     */
    constructor(coefficients: readonly number[]);
    evaluate(x: number): number;
    derivative(): Polynomial;
}
/**
 * Find the roots of polynomial using the method described in
 * High-Performance Polynomial Root Finding for Graphics (Yuksel 2022)
 *
 * @param f polynomial to find the roots of
 * @param startInterval beginning of interval to search (defaults to -1000)
 * @param endInterval end of interval to search (defaults to 1000)
 * @param epsilon tolerance for root finding (defaults to 1e-6)
 * @returns An array of roots
 */
export declare function polynomialRoots(f: Polynomial, startInterval?: number, endInterval?: number, epsilon?: number): number[];
