import React , {Component} from "react";
import CanvasJSReact from './canvasjs/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {
	render() {
		const options = {
			theme: "dark2",
			animationEnabled: true,
			exportFileName: "Pie Chart",
			exportEnabled: true,
			title:{
				text: this.props.title
			},
			data: [{
				type: "pie",
				showInLegend: true,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>{count}/{totalPoints}</strong> ",
				indexLabel: "{label} - {y}%",
				dataPoints:this.props.dataArray
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
export default PieChart;