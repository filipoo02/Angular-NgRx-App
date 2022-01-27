import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './components/feed/feed.component';
import { FeedService } from './services/feed.service';
import { EffectsModule } from '@ngrx/effects';
import { GetFeedEffect } from './store/effects/getFeed.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { RouterModule } from '@angular/router';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    RouterModule,
    CommonModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducers),
    ErrorMessageModule,
    LoadingModule,
  ],
  exports: [FeedComponent],
  providers: [FeedService],
})
export class FeedModule {}
