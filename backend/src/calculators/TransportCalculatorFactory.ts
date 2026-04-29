import carCalculator from './CarCalculator';
import trainCalculator from './TrainCalculator';
import busCalculator from './BusCalculator';

class TransportCalculatorFactory {
  getCalculator(type: string) {
    switch (type) {
      case 'car':
        return carCalculator;
      case 'train':
        return trainCalculator;
      case 'bus':
        return busCalculator;
      default:
        return null;
    }
  }
}

export default new TransportCalculatorFactory();