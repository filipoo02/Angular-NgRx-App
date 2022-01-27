import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
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
  queryParamsSubscription: Subscription;
  limit = environment.limit;
  baseUrl: string;
  currentPage: number;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.initializeValues();
    this.initializeListeners();
  }

  fetchData(): void {
    this.store.dispatch(getFeedAction({ url: this.apiUrlProps }));
  }

  initializeListeners(): void{
    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params)=>{
      this.currentPage = Number(params['page'] || '1') 
    })
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingFeedSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }
}
