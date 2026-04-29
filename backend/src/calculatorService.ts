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

  calculate(distance: any, transportMode: any, carType: any, passengers: any, country: any): any {
    if (transportMode === 'bike' || transportMode === 'walk') {
      return { co2: 0, label: 'GREEN' };
    }

    const calculator = factory.getCalculator(transportMode);
    if (!calculator) {
      return { co2: 0, label: 'GREEN' };
    }

    const co2 = this.getCalculatorResult(calculator, transportMode, distance, carType, passengers, country);
    const label = this.labelGenerator.getLabel(co2);

    return { co2, label };
  }

  private getCalculatorResult(calculator: any, transportMode: any, distance: any, carType: any, passengers: any, country: any): number {
    if (transportMode === 'car') {
      return calculator.calculate(distance, carType, passengers, country);
    }
    if (transportMode === 'train') {
      return calculator.calculate(distance, country);
    }
    return calculator.calculate(distance);
  }
}

export default new CalculatorService();
