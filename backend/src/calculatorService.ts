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
    if (t === 'bike' || t === 'walk') {
      return { co2: 0, label: 'GREEN' };
    }

    const calculator = factory.getCalculator(t);
    if (!calculator) {
      return { co2: 0, label: 'GREEN' };
    }

    const result = this.getCalculatorResult(calculator, t, d, ct, p, c);
    const label = this.labelGenerator.getLabel(result);

    return { co2: result, label };
  }

  private getCalculatorResult(calculator: any, t: any, d: any, ct: any, p: any, c: any): number {
    if (t === 'car') {
      return calculator.calculate(d, ct, p, c);
    }
    if (t === 'train') {
      return calculator.calculate(d, c);
    }
    return calculator.calculate(d);
  }
}

export default new CalculatorService();
