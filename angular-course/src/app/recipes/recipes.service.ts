import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Schnitzel',
      imageUrl: 'https://static.itdg.com.br/images/auto-auto/c2f986f8419a3c699c7882e8c30458af/schnitzel.jpg',
      ingredients: [ 'French Fries', 'Pork Meat', 'Salad']
    },
    {
      id: 'r2',
      title: 'Spaghetti',
      imageUrl: 'https://www.casaredo.com/blog/wp-content/uploads/2021/01/receita-espaguete-tradicional-perfeito.jpg',
      ingredients: [ 'Spaghetti', 'Meat', 'Tomatoes']
    },
  ]

  constructor() { }

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(recipeId: string) {
    return {...this.recipes.find(recipe => {
      return recipe.id === recipeId;
    })}
  }

  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter(recipe => {
      return recipe.id !== recipeId;
    });
  }
}
