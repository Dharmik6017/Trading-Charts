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
    const filteredData = await this.data().then((data) =>
      data.map((u) => {
        return {
          time: moment(u[0]).format(`YYYY-MM-DD`),
          open: parseFloat(u[1]),
          high: parseFloat(u[2]),
          low: parseFloat(u[3]),
          close: parseFloat(u[4]),
        };
      })
    );
    const chart = createChart(this.props && this.props.containerId, {
      width: 1500,
      height: 600,
    });
    this.chart = chart;
    const lineSeries = chart.addCandlestickSeries({
      upColor: "#6495ED",
      downColor: "#FF6347",
      borderVisible: true,
      wickVisible: true,
      borderColor: "#000000",
      wickColor: "#000000",
      borderUpColor: "#4682B4",
      borderDownColor: "#A52A2A",
      wickUpColor: "#4682B4",
      wickDownColor: "#A52A2A",
    });

    lineSeries.setData(filteredData);
  }

  data = async () => {
    const data = await axios
      .get(
        `https://api.binance.com/api/v3/klines?symbol=EOSETH&interval=1d&limit=1000`
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("error", err);
      });

    return data.data;
  };

  render() {
    return (
      <div>
        Hello Therererrre
        <div id={this.props.containerId} className="LightweightChart"></div>
      </div>
    );
  }
}

export default Graph;
