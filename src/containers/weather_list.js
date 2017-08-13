import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines'
import Chart from '../components/chart'
import GoogleMap from '../components/google_map'

class WeatherList extends Component {

  renderWeather(cityData){
    const name = cityData.city.name
    const temps = []
    const pressures = []
    const humidities = []
    let { lon, lat } = cityData.city.coord
    cityData.list.map( weather =>  {
      temps.push(weather.main.temp)
      pressures.push(weather.main.pressure)
      humidities.push(weather.main.humidity)
    })

    return (
      <tr key={name}>
        <td> <GoogleMap lon={lon} lat={lat}/> </td>
        <td>
          <Chart data={temps} color="red" units="K"/>
        </td>
        <td>
          <Chart data={pressures} color="blue" units="hPa"/>
        </td>
        <td>
          <Chart data={humidities} color="green" units="%"/>
        </td>
      </tr>
    )
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps({ weather }) {
  return { weather } //same as writing {weather : weather} or { weather: state.weather }
}

export default connect(mapStateToProps)(WeatherList)
