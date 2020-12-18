import React, { Component } from "react";
import { createChart } from "lightweight-charts";
import moment from "moment";
import binanace from "../apis/binanace";

class Chart extends Component {
  state = { data: [] }; //Defining a State variable

  static defaultProps = {
    containerId: "lightweight_chart_container", // Added Default Prop for display Chart
  };

  async componentDidMount() {
    await this.getData();

    const { containerId } = this.props;
    const { data } = this.state;
    const chart = createChart(containerId, {
      width: 1000,
      height: 400,
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
    const Candlestick = chart.addCandlestickSeries({
      upColor: "#02C076",
      downColor: "#D9304E",
      borderVisible: true,
      wickVisible: true,
      borderUpColor: "#02C076",
      borderDownColor: "#D9304E",
      wickDownColor: "#D9304E",
      wickUpColor: "#02C076",
    });

    Candlestick.setData(data);
  }

  getData = async () => {
    const response = await binanace.get("/klines", {
      params: {
        symbol: "ETHBTC", //Passed symbol of Etherium to BitCoin
        interval: "1d", // Passed a interval in day you can change it to hours and many more
        limit: "1000", // Limit of 1000 days data
      },
    });

    // We are getting data into array of array but chart need a data of Array of object and Key Value pair
    // that's why we are filtering data in Array of object and in Key Value Pair

    const filteredData = response.data.map((u) => {
      return {
        time: moment(u[0]).format(`YYYY-MM-DD`),
        open: parseFloat(u[1]),
        high: parseFloat(u[2]),
        low: parseFloat(u[3]),
        close: parseFloat(u[4]),
      };
    });
    this.setState({ data: filteredData }); // setting filtered data into state variable
  };

  render() {
    return <div id={this.props.containerId}></div>;
  }
}

export default Chart;
