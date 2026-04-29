class TrainCalculator {
  calculate(d: any, c?: any): number {
    var result = 0;
    if (c === 'France') {
      result = d * 0.0032;
    } else if (c === 'Germany') {
      result = d * 0.032;
    } else if (c === 'Poland') {
      result = d * 0.069;
    } else if (c === 'Norway') {
      result = d * 0.001;
    } else {
      result = d * 0.041;
    }
    return result;
  }
}

export default new TrainCalculator();