import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { PopularTagsComponent } from './components/popular-tags/popular-tags.component';
import { PopularTagsService } from './services/popular-tags.service';
import { LoadingModule } from '../loading/loading.module';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { reducers } from './store/reducers';
import { GetPopularTagsEffect } from './store/effects/getPopularTags.effects';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PopularTagsComponent],
  imports: [
    CommonModule,
    LoadingModule,
    ErrorMessageModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffect]),
    RouterModule
  ],
  providers: [PopularTagsService],
  exports: [PopularTagsComponent],
})
export class PopularTagsModule {}
