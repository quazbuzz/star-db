import React, { Component } from 'react';

import { PlanetList } from '../sw-components/lists';
import { PlanetDetails } from '../sw-components/index';
import ErrorBoundry from '../error-boundry';
import Row from '../row';

export default class PeoplePage extends Component {
  constructor() {
    super();

    this.onItemSelected = (id) => {
      this.setState({
        selectedItem: id,
      });
    };

    this.state = {
      selectedItem: '2',
    };
  }

  render() {
    const { selectedItem } = this.state;

    const personList = (
      <PlanetList onItemSelected={this.onItemSelected} />
    );

    const personDetails = (
      <PlanetDetails itemId={selectedItem} />
    );

    return (
      <ErrorBoundry>
        <Row left={personList} right={personDetails} />
      </ErrorBoundry>
    );
  }
}
