// ПАТТЕРН СТРОИТЕЛЬ
// Позволяет создавать сложные объекты пошагово.
// Строитель даёт возможность использовать один и тот же код строительства
// для получения разных представлений объектов.

class Salad {
  ingredients: string[] = [];

  addIngredient(ingredient: string) {
    this.ingredients.push(ingredient);
  }

  listIngredients() {
    console.log('Salad ingredients: ' + this.ingredients.join(', '));
  }
}

interface SaladBuilder {
  buildIngredient1(): void;
  buildIngredient2(): void;
  buildIngredient3(): void;
  getSalad(): Salad;
}

class ConcreteSaladBuilder implements SaladBuilder {
  private salad: Salad = new Salad();

  constructor() {
    this.reset();
  }

  reset() {
    this.salad = new Salad();
  }

  buildIngredient1() {
    this.salad.addIngredient('Cucumber');
  }

  buildIngredient2() {
    this.salad.addIngredient('Tomato');
  }

  buildIngredient3() {
    this.salad.addIngredient('Avocado');
  }

  getSalad() {
    const result = this.salad;
    this.reset();
    return result;
  }
}

class Director {
  private builder: SaladBuilder = new ConcreteSaladBuilder();

  setBuilder(builder: SaladBuilder) {
    this.builder = builder;
  }

  buildMiniSalad() {
    this.builder.buildIngredient1();
    this.builder.buildIngredient2();
  }

  buildMaxSalad() {
    this.builder.buildIngredient1();
    this.builder.buildIngredient2();
    this.builder.buildIngredient3();
  }
}

// Два салата
const director = new Director();
const builder = new ConcreteSaladBuilder();

director.setBuilder(builder);

console.log('Minimal salad recipe:');
director.buildMiniSalad();
builder.getSalad().listIngredients();

console.log('Full salad recipe:');
director.buildMaxSalad();
builder.getSalad().listIngredients();
