import React, { Component, Key } from 'react';
import './App.css';

type Forecast = {
    properties: any
}

type Page = {
    id: Key,
    name: string,
    icon: string,
    link: string

}

type State = {
    forecast: Forecast,
    pages: Page[],
    loading: boolean
}

export default class App extends Component<any, State> {
    static displayName = App.name;

    constructor(props: any) {
        super(props);
        this.state = { forecast: {} as Forecast, pages: [], loading: true };
    }

    componentDidMount() {
        this.populateWithData();
    }

    async populateWithData() {
        const weatherForecastResponse = await fetch('weatherforecast');
        const weatherForecastData = await weatherForecastResponse.json();

        const pagesResponse = await fetch('pages');
        const pagesData = await pagesResponse.json();

        this.setState({ forecast: weatherForecastData, pages: pagesData, loading: false });
    }

    static renderData(forecast: Forecast, pages: Page[]) {
        const weatherIcon = './weathericon/svg/' + forecast.properties.timeseries[0].data.next_1_hours.summary.symbol_code + '.svg';

        return (
            <div>
                <h1>Search bar here</h1>
                <form action="https://www.google.com/search" aria-label="Search form" method="get">
                    <input name="q" type="search" placeholder="Search..." />
                </form>
                <h1>Weather forecast</h1>
                <p>Current temperature: {forecast.properties.timeseries[0].data.instant.details.air_temperature}C <img className="favicon" src={weatherIcon} alt="page icon" /></p>

                <h1>Page list</h1>
                <ul className="site-list">
                    {pages.map(page =>
                        <li key={page.id}>
                            <img className="favicon" src={page.icon} alt="page icon" />
                            <a href={page.link}>{page.name}</a>
                        </li>
                    )}
                </ul>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <div className="spinner"></div>
            : App.renderData(this.state.forecast, this.state.pages);

        return ( 
            <div>
                <div className="body">
                    {contents}
                </div>
            </div>
        );
    }
}
