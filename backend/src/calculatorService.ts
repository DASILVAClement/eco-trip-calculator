import factory from './calculators/TransportCalculatorFactory';

type TransportType = 'bike' | 'walk' | 'car' | 'train' | 'bus';
type CarType = 'thermal' | 'electric' | 'hybrid';
type Country = 'France' | 'Germany' | 'Poland' | 'Norway' | 'other';
type Label = 'GREEN' | 'ORANGE' | 'RED';

class LabelGenerator {
  getLabel(emission: number): Label {
    if (emission < 5) {
      return 'GREEN';
    } else if (emission >= 5 && emission < 15) {
      return 'ORANGE';
    } else {
      return 'RED';
    }
  }
}

class CalculatorService {
  private labelGenerator: LabelGenerator;

  constructor() {
    this.labelGenerator = new LabelGenerator();
  }

  calculate(d: any, t: any, ct: any, p: any, c: any): any {
    var result = 0;
    var lbl = '';

    if (t === 'bike' || t === 'walk') {
      result = 0;
      lbl = 'GREEN';
    } else {
      const calculator = factory.getCalculator(t);
      if (calculator) {
        if (t === 'car') {
          result = calculator.calculate(d, ct, p, c);
        } else if (t === 'train') {
          result = calculator.calculate(d, c);
        } else if (t === 'bus') {
          result = calculator.calculate(d);
        }
        lbl = this.labelGenerator.getLabel(result);
      }
    }

    return { co2: result, label: lbl };
  }
}

export default new CalculatorService();
