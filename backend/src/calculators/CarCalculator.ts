class CarCalculator {
  calculate(d: any, ct?: any, p?: any, c?: any): number {
    var result = 0;
    if (ct === 'thermal') {
      result = d * 0.192;
    } else if (ct === 'electric') {
      if (c === 'France') {
        result = d * 0.012;
      } else if (c === 'Germany') {
        result = d * 0.045;
      } else if (c === 'Poland') {
        result = d * 0.078;
      } else {
        result = d * 0.04;
      }
    } else if (ct === 'hybrid') {
      result = d * 0.098;
    }

    if (p > 0) {
      result = result / p;
    }

    return result;
  }
}

export default new CarCalculator();