import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import p5 from "p5";
import windowSize from "react-window-size";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Header from "../../../components/layout/Header";
import { DialogView, openState } from "../../../utils/DialogView";

import Tour from "../../../utils/Tour";

import { LRimages, LRdetails } from "../../../utils/TourData/";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    color: '#1f1f1f',
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

class Regression extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
    };

    this.sketch = this.sketch.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  training = [];
  lrSlider = 0.01;

  b = 0;
  m = 0;
  h = window.innerHeight;
  w = window.innerWidth;
  pointColors = ["#7DFF33", "#FF334F", "#FFF633", "#70E2E9", "#D84821"];
  currentPointColor = 0;

  calculateError = () => {
    var sum = 0;
    for (var i = 0; i < this.training.length; i++) {
      var guess = this.m * this.training[i].x + this.b;
      var error = guess - this.training[i].y;
      sum += error * error;
    }

    // Divide by total data points to average
    var avg = sum / this.training.length;
    return avg;
  };

  // Plot all the this.training data
  drawPoints = (p) => {
    //p5.stroke(255);

    for (var i = 0; i < this.training.length; i++) {
      p.stroke(this.pointColors[this.training[i].z]);
      p.fill(this.pointColors[this.training[i].z]);
      p.ellipse(
        this.training[i].x * p.width,
        this.training[i].y * p.height,
        8,
        8
      );
    }
  };

  // Draw the current line
  drawLine = (p) => {
    // Draw a line between any two points (use min and max x)
    var x1 = 0;
    var y1 = this.m * x1 + this.b;
    var x2 = 1;
    var y2 = this.m * x2 + this.b;
    p.stroke(255);
    p.line(
      x1 * p.width * 0.94,
      y1 * p.height,
      x2 * p.width * 0.94,
      y2 * p.height
    );
  };

  sketch(p) {
    p.setup = () => {
      var height = window.innerHeight;
      p.createCanvas(window.innerWidth, height);
    };

    p.draw = () => {
      if (openState === false) {
        var learning_rate = this.lrSlider;
        p.background(0);

        // Calculate the overall error
        var error = this.calculateError();
        var colorNo = 0;
        // Draw everything
        p.fill(255);
        p.rect(this.w * 0.95, 202, this.w * 0.035, 40, 5);
        p.fill(0);
        p.textSize(14);
        p.text("Info", this.w * 0.96, 225);

        for (var y = 0; y <= 160; y = y + 40) {
          p.stroke(255);
          p.fill(this.pointColors[colorNo]);
          colorNo = colorNo + 1;
          // p5.rect(this.w*0.9,y+40,this.w,y);
          p.rect(this.w * 0.95, y, this.w * 0.035, 40, 5);
        }

        this.drawPoints(p);
        this.drawLine(p);

        var deltaB = 0;
        var deltaM = 0;
        for (var i = 0; i < this.training.length; i++) {
          var x = this.training[i].x;
          var y = this.training[i].y;
          var yguess = this.m * x + this.b;
          error = y - yguess;
          deltaB += (2 / this.training.length) * error;
          deltaM += (2 / this.training.length) * x * error;
        }
        this.b += deltaB * learning_rate;
        this.m += deltaM * learning_rate;
      }
    };

    p.mousePressed = () => {
      console.log(openState);
      if (openState === false) {
        if (
          p.mouseX < window.innerWidth * 0.95 &&
          p.mouseY < window.innerHeight &&
          !this.state.open
        )
          this.training.push(
            p.createVector(
              p.mouseX / p.width,
              p.mouseY / p.height,
              this.currentPointColor
            )
          );
        else if (p.mouseY < 40) this.currentPointColor = 0;
        else if (p.mouseY < 80) this.currentPointColor = 1;
        else if (p.mouseY < 120) this.currentPointColor = 2;
        else if (p.mouseY < 160) this.currentPointColor = 3;
        else if (p.mouseY < 200) {
          this.currentPointColor = 4;
        } else if (p.mouseY < 240 && p.mouseY >= 202) this.handleClickOpen();
      }
    };
  }

  render() {
    return (
      <div>
        <Header />
        <DialogView
          content={<Tour images={LRimages} details={LRdetails} />}
          title="VIRTUAL TOUR"
        />

        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <div style={{ width: 600 }}>
            <DialogTitle
              id="customized-dialog-title"
              onClose={this.handleClose}
            >
              STATISTICS
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>SLOPE = {this.m}</Typography>
              <Typography gutterBottom>INTERCEPT = {this.b}</Typography>
              <Typography gutterBottom>
                Y = {this.m} X + {this.b}
              </Typography>
            </DialogContent>
          </div>
        </Dialog>

        <P5Wrapper sketch={this.sketch.bind(this)} />
      </div>
    );
  }
}

export default windowSize(Regression);
