import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getFeedAction } from '../../store/actions/feed.action';
import {
  errorSelector,
  feedSelector,
  isLoadingFeedSelector,
} from '../../store/selectors';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input('apiUrl') apiUrlProps: string;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  feed$: Observable<GetFeedResponseInterface | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchData();
    this.initializeValues();
  }

  fetchData(): void {
    this.store.dispatch(getFeedAction({ url: this.apiUrlProps }));
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingFeedSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
  }
}
