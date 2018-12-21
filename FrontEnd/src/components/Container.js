// @flow
import React from 'react';
import List from './List';
import emitter from '../emitter';
import { getApiUrl } from '../utils';

import '../style/Container.scss';
import type { HeaderState, ContainerState } from '../type';

class Container extends React.PureComponent<{}, ContainerState> {
  state: ContainerState = {
    status: 'init',
    data: {}
  };


  headerState;

  // Send the required request to Itunes API
  async getSearchResult(headerState: HeaderState) {
    try {
      this.setState({ status: 'loading' });
      const resp = await fetch(getApiUrl(headerState));
      const json = await resp.json();
      console.log(json);
      this.setState({
        data: { ...json },
        status: json.resultCount ? '' : 'noContent'
      });
    } catch (e) {
      this.setState({ status: 'error' });
    }
  }


  componentDidMount() {
    emitter.on('search', this.getSearchResult.bind(this));

  }

  componentWillUnmount() {
    emitter.removeListener('search');
  }

  // Render the list of the received data
  render() {
    const { status, data } = this.state;
    return (
      <div className="container">
        {<List {...data} />}

      </div>

    );
  }
}

export default Container;
