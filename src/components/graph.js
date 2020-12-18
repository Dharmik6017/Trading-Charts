import React, { Component } from "react";
import axios from "axios";
import { createChart } from "lightweight-charts";
import moment from "moment";

class Graph extends Component {
  state = { data: [] };

  static defaultProps = {
    containerId: "lightweight_chart_container",
  };

  chart = null;

  async componentDidMount() {
    await this.data();
  }

  data = async () => {
    await axios
      .get(
        `https://api.binance.com/api/v3/klines?symbol=EOSETH&interval=1d&limit=500`
      )
      .then((res) => {
        console.log("Response", res);
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  render() {
    const filteredData =
      this.state.data &&
      this.state.data.map((u) => {
        return {
          time: moment(u[0]).format(`YYYY-MM-DD`),
          open: parseFloat(u[1]),
          high: parseFloat(u[2]),
          low: parseFloat(u[3]),
          close: parseFloat(u[4]),
        };
      });
    const chart = createChart(this.props.containerId, {
      width: 1500,
      height: 600,
    });
    this.chart = chart;

    const lineSeries = chart.addCandlestickSeries();

    filteredData && lineSeries.setData(filteredData);

    return (
      <div>
        <div id={this.props.containerId} className="LightweightChart"></div>
      </div>
    );
  }
}

export default Graph;
