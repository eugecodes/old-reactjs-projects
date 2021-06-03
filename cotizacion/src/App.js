import React from 'react';

class Cotizacion extends React.Component{
	constructor(props) {
		super(props);
		this.state = { date: "", base: "", stateCotizaciones: {} }; 
	}
	componentDidMount() {
        // get Exchange
        (async () => {
			const response = await fetch('https://api.exchangeratesapi.io/latest');
			const json = await response.json();
			//console.log(json);
			this.setState({date: json.date, base: json.base, stateCotizaciones : json.rates});
		})();
    }
	
    render() {
		console.log("render");
		console.log(this.state.stateCotizaciones);
		let li = Object.entries(this.state.stateCotizaciones);
		return (
		<div>
            <h1>Cotizaciones de productos!!</h1>
			<p>Base: {this.state.base}</p>
			<p>Dates: {this.state.date}</p>
			<ul>
				{
					li.map(([key, value]) => {
						return <li>{key} : { value }</li>
					})
				}
				</ul>
		</div>
        );
    }

}

export default Cotizacion;
