import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";

import p5 from "p5";
import * as ml5 from "ml5";

import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import Header from "../../../../components/layout/Header";
import PieChart from "../../../../utils/Chart/Pie";
import Spline from "../../../../utils/Chart/Spline";
import Tour from "../../../../utils/Tour";
import { DialogView, openState } from "../../../../utils/DialogView";
import { CCimages, CCdetails } from "../../../../utils/TourData/";

const styles = (muiBaseTheme) => ({
  card: {
    maxWidth: 800,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "3px 3px 5px 6px rgba(255,255,255,0.6)",
    "&:hover": {
      boxShadow: "3px 3px 5px 6px rgba(255,255,255,1)",
    },
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3,
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`,
  },
  heading: {
    fontWeight: "bold",
    color: "black",
  },
  subheading: {
    lineHeight: 1.8,
  },
});

const InstructionCard = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography
          className={"MuiTypography--heading"}
          color="textPrimary"
          variant={"h5"}
          gutterBottom
        >
          INSTRUCTIONS
        </Typography>
        <Tour images={CCimages} details={CCdetails} />
      </CardContent>
    </Card>
  );
});

export default class CategoricalClassification extends Component {
  constructor() {
    super();

    this.sketch = this.sketch.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  options = {
    inputs: ["x", "y"],
    outputs: ["label"],
    task: "classification",
    debug: "true",
  };
  model = ml5.neuralNetwork(this.options);
  dataArray = [];
  dataPoints = [];
  points = 0;
  predictedPoints = 0;
  error = [];
  targetLabel = "M";
  state = {
    action: "collection",
    open: "false",
    data: null,
    errorList: null,
  };

  handleClickTrain = () => {
    this.setState({ action: "training" });
    console.log("Training Started");
    for (var i = 0; i < this.dataArray.length; i++) {
      this.dataArray[i].y = (this.dataArray[i].count * 100) / this.points;
      this.dataArray[i].totalPoints = this.points;
    }
    this.setState({ data: this.dataArray });
    this.model.normalizeData();
    let options = {
      epochs: 200,
    };
    this.model.train(options, this.whileTraining, this.finishedTraining);
  };

  whileTraining = (epoch, loss) => {
    this.error.push({ x: epoch + 1, y: loss.loss });
    console.log(epoch);
  };

  finishedTraining = () => {
    this.setState({ action: "prediction" });
    console.log("Boom!!! Training Finished");
    this.setState({ errorList: this.error });
    console.log(this.error);
  };

  finalResults = (p, error, results) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(results);
    p.stroke(0);
    p.fill(0, 0, 255, 100);
    p.ellipse(p.mouseX, p.mouseY, 24);
    p.fill(0);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.text(results[0].label, p.mouseX, p.mouseY);
  };

  clearModel = () => {
    this.dataArray = [];
    this.dataPoints = [];
    this.points = 0;
    this.error = [];
    this.targetLabel = "M";
    this.setstate = {
      action: "collection",
      open: "false",
      data: null,
      errorList: null,
    };
    window.location.reload(false);
  };

  sketch(p) {
    p.setup = () => {
      p.createCanvas(500, 550);
      p.background(200);

      console.log(this.dataPoints);
    };

    p.keyPressed = () => {
      if (p.key.match(/^[A-Za-z]+$/) && p.key.length === 1)
        this.targetLabel = p.key.toUpperCase();
    };

    p.draw = () => {
      if (this.state.action !== "collection") {
        for (var i = 0; i < this.dataPoints.length; i++) {
          p.stroke(0);
          p.noFill();
          p.ellipse(this.dataPoints[i].x, this.dataPoints[i].y, 24);
          p.fill(0);
          p.noStroke();
          p.textAlign(p.CENTER, p.CENTER);
          p.text(
            this.dataPoints[i].label,
            this.dataPoints[i].x,
            this.dataPoints[i].y
          );
        }
      }
    };

    p.mousePressed = () => {
      console.log(openState);
      if (openState === false) {
        let inputs = {
          x: p.mouseX,
          y: p.mouseY,
        };
        if (
          this.state.action === "collection" &&
          inputs.x >= 0 &&
          inputs.y >= 0 &&
          inputs.x <= 500 &&
          inputs.y <= 500
        ) {
          let target = {
            label: this.targetLabel,
          };

          if (inputs && target) {
            this.model.addData(inputs, target);
            this.dataPoints.push({
              x: inputs.x,
              y: inputs.y,
              label: target.label,
            });
            this.points++;
            var flag = 0;
            for (var i = 0; i < this.dataArray.length; i++) {
              if (this.dataArray[i].label === target.label) {
                flag = 1;
                this.dataArray[i].count++;
              }
            }
            if (flag === 0)
              this.dataArray.push({
                count: 1,
                label: target.label,
                y: 0,
                totalPoints: 0,
              });
            console.log(this.dataArray);
          }

          p.stroke(0);
          p.noFill();
          p.ellipse(p.mouseX, p.mouseY, 24);
          p.fill(0);
          p.noStroke();
          p.textAlign(p.CENTER, p.CENTER);
          p.text(this.targetLabel, p.mouseX, p.mouseY);
        } else if (this.state.action === "prediction") {
          this.model.classify(inputs, this.finalResults.bind(this, p));
        }
      }
    };
  }

  render() {
    return (
      <div>
        <Header />
        <DialogView
          content={
            <div>
              <Tour images={CCimages} details={CCdetails} />
            </div>
          }
          title="Virtual Tour"
        />
        <div style={{ display: "flex", padding: 10 }}>
          <div style={{ paddingRight: 10 }}>
            <Button
              type="submit"
              //fullWidth
              variant="contained"
              color="secondary"
              onClick={this.handleClickTrain}
            >
              Train
            </Button>
          </div>
          <div>
            <Tooltip
              title={
                "Clear button will clean the entire screen, i.e every datapoint will be erased so as the graphs."
              }
              arrow="true"
            >
              <Button
                type="submit"
                //fullWidth
                variant="contained"
                color="secondary"
                onClick={this.clearModel}
              >
                Clear
              </Button>
            </Tooltip>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding:10 , paddingRight: 75}}>
          <div
            style={{
              padding: 20,
              boxShadow: "3px 3px 5px 6px rgba(255,255,255,0.6)"
            }}
          >
            <P5Wrapper sketch={this.sketch.bind(this)} />
          </div>
          <div style={{ paddingRight: 20, width: 600, height: 600 }}>
            <InstructionCard />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "1", padding: 10 }}>
            <PieChart dataArray={this.state.data} title="Pie Chart " />
          </div>
          <div style={{ flex: "1", padding: 10 }}>
            <Spline
              data={this.state.errorList}
              title="Error vs Epoch"
              Yaxis="Error"
            />
          </div>
        </div>
      </div>
    );
  }
}
