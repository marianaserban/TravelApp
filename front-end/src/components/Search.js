import React, { Component } from 'react'
import './Search.css';
import Navbar from './Navbar';
import { get } from '../Axios'
import { getId, setId } from '../Utils'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: getId(),
      origin: '',
      destination: '',
      mean_of_transport: 'METRO',
      observations: '',
      reviews: []
    };

    this.handleFiltersChange = this.handleFiltersChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFiltersChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.getSearchResults();
  }

  async getSearchResults() {
    let params = {
      mean_of_transport: this.state.mean_of_transport
    };

    if (this.state.origin.length)
      params.origin = this.state.origin;
    if (this.state.destination.length)
      params.destination = this.state.destination;
    if (this.state.observations.length)
      params.observations = this.state.orobservationsigin;

    let res = await get("http://localhost:8080/reviews/search", params)
    console.log('rezultate search', res);
    this.setState({ reviews: res })
  }

  render() {
    return (
      <div className="search-page">
        {this.state.id && <Navbar />}
        <form className="search-filter" onSubmit={this.handleFormSubmit}>
          <input
            name="observations"
            type="text"
            placeholder="Cauta dupa observatii..."
            value={this.state.observations}
            onChange={this.handleFiltersChange} />
          <input
            name="origin"
            type="text"
            placeholder="Origine..."
            value={this.state.origin}
            onChange={this.handleFiltersChange} />
          <input
            name="destination"
            type="text"
            placeholder="Destinatie..."
            value={this.state.destination}
            onChange={this.handleFiltersChange} />
          <br />
          <select
            name="mean_of_transport"
            value={this.state.mean_of_transport}
            onChange={this.handleFiltersChange}>
              <option value="BUS">Bus</option>
              <option value="TRAM">Tram</option>
              <option value="METRO">Metro</option>
          </select>
          <button
            type="submit"
            className="search-button"
            onClick={this.handleFormSubmit}>
              Cauta!
          </button>
        </form>
        <div className="search-reviews">
          {this.state.reviews.map(review => (
            <div className="search-review-item" key={review.id}>
              De la {review.origin} la {review.destination}<br />
              Cu {review.meanOfTransport} la ora {review.departureHour}<br />
              Am facut {review.tripDuration} de minute
              A fost {review.crowdedness}<br />
              Observatii: {review.observations}...<br/>
              Nivel de satisfactie: {review.satisfactionLevel}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
