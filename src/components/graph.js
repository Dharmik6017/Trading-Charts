import React, { Component } from "react";
import { createChart } from "lightweight-charts";
import moment from "moment";
import binanace from "../apis/binanace";

class Graph extends Component {
  state = { data: [] };

  static defaultProps = {
    containerId: "lightweight_chart_container",
  };

  async componentDidMount() {
    await this.getData();

    const { containerId } = this.props;
    const { data } = this.state;
    const width = window.innerWidth;
    const chart = createChart(containerId, {
      width: width / 1.2,
      height: 600,
      layout: {
        backgroundColor: "#191B20",
        textColor: "#fff",
      },
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0.1)",
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0.1)",
        },
      },

      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
    });
    const lineSeries = chart.addCandlestickSeries({
      upColor: "#02C076",
      downColor: "#D9304E",
      borderVisible: true,
      wickVisible: true,
      borderUpColor: "#02C076",
      borderDownColor: "#D9304E",
      wickDownColor: "#D9304E",
      wickUpColor: "#02C076",
    });

    lineSeries.setData(data);
  }

  getData = async () => {
    const response = await binanace.get("/klines", {
      params: {
        symbol: "ETHBTC",
        interval: "1d",
        limit: "1000",
      },
    });

    const filteredData = response.data.map((u) => {
      return {
        time: moment(u[0]).format(`YYYY-MM-DD`),
        open: parseFloat(u[1]),
        high: parseFloat(u[2]),
        low: parseFloat(u[3]),
        close: parseFloat(u[4]),
      };
    });
    this.setState({ data: filteredData });
  };

  render() {
    return <div id={this.props.containerId}></div>;
  }
}

export default Graph;
