"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polynomialRoots = exports.Polynomial = void 0;
/**
 * Class representing a polynomial.
 */
class Polynomial {
    /**
     * @param coefficients coefficients in order of increasing power eg 1 + 2x + 3x^2 - 12x^3 => [1, 2, 3, -12]
     */
    constructor(coefficients) {
        this.coefficients = coefficients;
        this.degree = coefficients.length - 1;
    }
    evaluate(x) {
        let result = 0;
        for (let i = 0, l = this.coefficients.length; i < l; i++) {
            result += this.coefficients[i] * Math.pow(x, i);
        }
        return result;
    }
    derivative() {
        if (this.degree === 0) {
            throw new Error("Cannot take derivative of constant polynomial");
        }
        const coefficients = [];
        for (let i = 1; i < this.coefficients.length; i++) {
            coefficients.push(this.coefficients[i] * i);
        }
        return new Polynomial(coefficients);
    }
}
exports.Polynomial = Polynomial;
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
function polynomialRoots(f, startInterval = -1000, endInterval = 1000, epsilon = 1e-6) {
    if (f.degree === 2) {
        return findQuadraticRoots(f, startInterval, endInterval);
    }
    const derivative = f.derivative();
    const rootsOfDerivative = polynomialRoots(derivative, startInterval, endInterval, epsilon);
    rootsOfDerivative.push(endInterval);
    let a = startInterval;
    const roots = [];
    for (let i = 0; i < rootsOfDerivative.length; i++) {
        let b = rootsOfDerivative[i];
        if (Math.sign(f.evaluate(a)) !== Math.sign(f.evaluate(b))) {
            roots.push(findRoot(f, derivative, a, b, epsilon));
        }
        a = b;
    }
    return roots;
}
exports.polynomialRoots = polynomialRoots;
function findQuadraticRoots(f, startInterval, endInterval) {
    const c = f.coefficients[0];
    const b = f.coefficients[1];
    const a = f.coefficients[2];
    const delta = b * b - 4 * a * c;
    if (delta >= 0) {
        const d = Math.sqrt(delta);
        const q = -0.5 * (b + multSign(d, b));
        const rv0 = q / a;
        const rv1 = c / q;
        const res = [];
        const aa = Math.min(rv0, rv1);
        const bb = Math.max(rv0, rv1);
        if (aa >= startInterval && aa <= endInterval) {
            res.push(aa);
        }
        if (bb >= startInterval && bb <= endInterval) {
            res.push(bb);
        }
        return res;
    }
    return [];
}
function multSign(v, sign) {
    return v * (sign < 0 ? -1 : 1);
}
// Following http://www.cemyuksel.com/research/polynomials/polynomial_roots_hpg2022_supplemental.pdf
function findRoot(f, deriv, x1, x2, epsilon) {
    let xr = (x1 + x2) / 2;
    if (Math.abs(x2 - x1) <= 2 * epsilon) {
        return xr;
    }
    if (f.degree === 3) {
        let xn = -0;
        for (let i = 0; i < 10; i++) {
            xn = xr - f.evaluate(xr) / deriv.evaluate(xr);
            xn = Math.max(x1, Math.min(x2, xn));
            if (Math.abs(xr - xn) <= epsilon) {
                return xn;
            }
            xr = xn;
        }
        if (xr < x1 || xr > x2) {
            xr = (x1 + x2) / 2;
        }
    }
    const y1 = f.evaluate(x1);
    let yr = f.evaluate(xr);
    while (true) {
        if (Math.sign(yr) === Math.sign(y1)) {
            x1 = xr;
        }
        else {
            x2 = xr;
        }
        let xn = xr - yr / deriv.evaluate(xr);
        if (x1 < xn && xn < x2) {
            if (Math.abs(xr - xn) > epsilon) {
                xr = xn;
                yr = f.evaluate(xr);
            }
            else {
                if (Math.sign(yr) === Math.sign(y1)) {
                    xr = xn + epsilon;
                }
                else {
                    xr = xn - epsilon;
                }
                const y = f.evaluate(xr);
                if (Math.sign(y) !== Math.sign(yr)) {
                    return xn;
                }
                else {
                    yr = y;
                }
            }
        }
        else {
            xr = (x1 + x2) / 2;
            if (xr === x1 || xr === x2 || x2 - x1 <= 2 * epsilon) {
                return xr;
            }
            else {
                yr = f.evaluate(xr);
            }
        }
    }
}
