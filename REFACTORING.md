# Refactoring — EcoTrip Calculator
**Groupe :** [Matthieu Luiggi, Maxime Sermet, Clément Da Silva]

---

## Principe SOLID appliqué : Single Responsibility Principle

**Problème identifié :**
`backend/src/calculatorService.ts`
La classe calculatorService gère plusieurs responsabilités à la fois :
 - calcul des émissions pour car, train, bus, bike, walk
 - calculs spécifiques par pays
 - génération du label GREEN / ORANGE / RED

**Transformation réalisée :**
Création de deux nouvelles classes distinctes :
- EmissionCalculator — responsable uniquement du calcul des émissions CO2
- LabelGenerator — responsable uniquement de la génération des labels

**Avant :**
```typescript
// backend/src/calculatorService.ts (avant)
class CalculatorService {
  calculate(d: any, t: any, ct: any, p: any, c: any): any {
    var result = 0;
    var lbl = '';

    if (t === 'bike' || t === 'walk') {
      result = 0;
      lbl = 'GREEN';
    } else if (t === 'car') {
      result = this._calculateCar(d, ct, p, c);
      lbl = this._getLabel(result);  // ← responsabilité mélangée
    } else if (t === 'train') {
      result = this._calculateTrain(d, c);
      lbl = this._getLabel(result);
    } else if (t === 'bus') {
      result = d * 0.104;
      lbl = this._getLabel(result);
    }

    return { co2: result, label: lbl };
  }

  _calculateCar(d: any, ct: any, p: any, c: any): number { /* ... */ }
  _calculateTrain(d: any, c: any): number { /* ... */ }
  _getLabel(result: number): string {  // ← méthode hors sujet
    if (result < 5) return 'GREEN';
    else if (result >= 5 && result < 15) return 'ORANGE';
    else return 'RED';
  }
}
```

**Après :**
```typescript
// backend/src/services/EmissionCalculator.ts
class EmissionCalculator {
  calculate(distance: number, type: TransportType, options?: TransportOptions): number {
    switch (type) {
      case 'bike':
      case 'walk':
        return 0;
      case 'car':
        return this.calculateCar(distance, options);
      case 'train':
        return this.calculateTrain(distance, options?.country);
      case 'bus':
        return distance * 0.104;
    }
  }

  private calculateCar(d: number, opts?: TransportOptions): number { /* ... */ }
  private calculateTrain(d: number, country?: string): number { /* ... */ }
}

// backend/src/services/LabelGenerator.ts
class LabelGenerator {
  getLabel(emission: number): Label {
    if (emission < 5) return 'GREEN';
    if (emission < 15) return 'ORANGE';
    return 'RED';
  }
}
```

**Bénéfice concret :**
On peut maintenant modifier les seuils de label sans toucher au calcul d'émissions, et inversement.

---

## Pattern GOF appliqué : Factory Method (Fabrique)

**Problème résolu :**
Le mélange des responsabilités dans `backend/src/calculatorService.ts` : la classe devait à la fois déterminer comment calculer selon le transport et _faire_ le calcul.

**Structure mise en place :**

- Création d'une classe TransportCalculatorFactory.
- Cette classe expose une unique méthode getCalculator(type: string) qui agit comme un distributeur : selon le type demandé ("car", "train", etc.).
- Le CalculatorService principal ne fait plus qu'appeler la Fabrique pour obtenir le bon calculateur, puis exécute le calcul.

**Bénéfice concret :**
Si l'on ajoute un type de transport, seule la Fabrique est impactée pour lier la nouvelle chaîne de caractères à son calcul. 

---

## Object Calisthenics appliquées

Règle #1 — Une seule indentation par méthode
Violation originale : backend/src/calculatorService.ts:27-51
Le bloc calculate utilise plusieurs branches if/else if/else, ce qui crée plusieurs niveaux d'indentation du même côté.

Transformation :
Remplacement des branches imbriquées par des retours et des méthodes pour réduire l'indentation à un seul niveau par méthode.

Bénéfice :
La méthode est plus simple à lire, chaque chemin d'exécution est plus direct et le code est plus facile à déboguer.

### Règle #[N] — [nom de la règle]

[idem]

---

## Ce qu'on ferait ensuite
[Si vous aviez 15 minutes de plus : quelle serait la prochaine transformation prioritaire et pourquoi ?]