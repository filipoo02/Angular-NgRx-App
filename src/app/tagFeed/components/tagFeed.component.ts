import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, Subscriber, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tagFeed.component.html',
  styleUrls: ['./tagFeed.component.scss'],
})
export class TagFeedComponent implements OnInit, OnDestroy {
  tagName: string;
  apiUrl: string;
  urlSlugSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.urlSlugSubscription = this.route.params.subscribe(
      (params) => {
        this.tagName = params['slug'];
        this.apiUrl = `/articles?tag=${this.tagName}`
      }
    );
  }

  ngOnDestroy(): void {
    this.urlSlugSubscription.unsubscribe();
  }
}
