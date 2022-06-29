import React, { Component } from 'react';
import { Grid, GridItem, Box } from '@chakra-ui/react';

import { getAllCountries } from '../../apis/countries';

export class CountriesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countriesList: []
    };
  }

  async componentDidMount() {
    this.setState({ countriesList: (await getAllCountries()).data });
  }

  renderCountries() {
    if (this.state.countriesList.length === 0) return <Box>There is no Countries</Box>;

    return this.state.countriesList.slice(0, 100).map((item, index) => (
      <GridItem w="100%" h="10" bg="blue.500" key={index}>
        <h1>{item.name.common}</h1>
      </GridItem>
    ));
  }

  render() {
    console.log(this.state.countriesList);
    return (
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {this.renderCountries()}
      </Grid>
    );
  }
}
