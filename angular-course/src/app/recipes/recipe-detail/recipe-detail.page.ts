import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit, OnDestroy {

  loadedRecipe!: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('recipeId')) {
        return;
      }

      const recipeId = paramMap.get('recipeId');
      this.loadedRecipe = this.recipesService.getRecipe(recipeId!) as Recipe;
    })
  }

  onDeleteRecipe() {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you really want delete the recipe?',
      buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: () => {
          this.recipesService.deleteRecipe(this.loadedRecipe.id);
          this.router.navigate(['/recipes']);
        }
      }
    ]
    })
    .then(alertEl => {
      alertEl.present();
    });
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy");
  }


  ionViewWillEnter() {
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
