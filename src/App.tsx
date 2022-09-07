import React, { Component, Key } from 'react';

type Forecast = {
    date: Key,
    temperatureC: any,
    temperatureF: any,
    summary: any
}

type Page = {
    id: Key,
    name: string,
    icon: string,
    link: string

}

type State = {
    forecasts: Forecast[],
    pages: Page[],
    loading: boolean
}

export default class App extends Component<any, State> {
    static displayName = App.name;

    constructor(props: any) {
        super(props);
        this.state = { forecasts: [], pages: [], loading: true };
    }

    componentDidMount() {
        this.populateWithData();
    }

    static renderData(forecasts: Forecast[], pages: Page[]) {
        const image = {
            height: "25px"
        };

        return (
            <div>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Temp. (C)</th>
                            <th>Temp. (F)</th>
                            <th>Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecasts.map(forecast =>
                            <tr key={forecast.date}>
                                <td>{forecast.date}</td>
                                <td>{forecast.temperatureC}</td>
                                <td>{forecast.temperatureF}</td>
                                <td>{forecast.summary}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Icon</th>
                            <th>name</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map(page =>
                            <tr key={page.id}>
                                <img className="favicon" style={image} src={page.icon}/>
                                <a href={page.link}>{page.name}</a>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
            : App.renderData(this.state.forecasts, this.state.pages);

        return (
            <div>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateWithData() {
        const weatherForecastResponse = await fetch('weatherforecast');
        const weatherForecastData = await weatherForecastResponse.json();
        const pagesResponse = await fetch('pages');
        const pagesData = await pagesResponse.json();
        this.setState({ forecasts: weatherForecastData, pages: pagesData, loading: false });
    }
}
