import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy {

  recipes!: Recipe[];

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {  
    console.log("ngOnInit");
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy");
  }


  ionViewWillEnter() {
    this.recipes = this.recipesService.getAllRecipes();
    console.log("ionViewWillEnter");
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave");
  }

  ionViewDidLeave() {
    console.log("ionViewDidLeave");
  }

}
