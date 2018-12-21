// @flow
import React, { PropTypes } from 'react';
import Item from './Item';
import type { SearchResult } from '../type';
import '../style/List.scss';

const List = ({
  results,
  resultCount
}: {
  results: Array<SearchResult>,
  resultCount: number
}) => (
  <div className="list-wrapper">
    {resultCount > 0 ? results.map((item, i) => <Item  key={item.trackId || i} {...item} />) : null}

  </div>
);

export default List;
