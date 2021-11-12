import React , {Component} from "react";
import CanvasJSReact from './canvasjs/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Spline extends Component {
	render() {
		const options = {
            theme: "dark2",
            animationEnabled: true,
            exportFileName: "Pie Chart",
			exportEnabled: true,
			title:{
				text: this.props.title
			},
			axisY: {
				title: this.props.Yaxis,
				includeZero: false
			},
			data: [{
                type: "spline",
                toolTipContent: "Epoch : {x}<br> Error : {y}",
				dataPoints: this.props.data
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default Spline