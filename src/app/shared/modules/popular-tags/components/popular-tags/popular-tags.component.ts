import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';
import { getPopularTagsAction } from '../../store/actions/popular-tags.action';
import {
  errorPopularTagsSelector,
  isLoadingPopularTagsSelector,
  popularTagsSelector,
} from '../../store/selectors';

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
})
export class PopularTagsComponent implements OnInit {
  tagList$: Observable<PopularTagType[] | any>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchData();
    this.initializeValues();
  }

  initializeValues(): void {
    this.tagList$ = this.store.pipe(select(popularTagsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingPopularTagsSelector));
    this.error$ = this.store.pipe(select(errorPopularTagsSelector));
  }

  fetchData(): void{
    this.store.dispatch(getPopularTagsAction())
  }
}
