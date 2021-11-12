import React from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-core";
import "./object.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Progress } from "rsuite";
import Header from "../../../../components/layout/Header";
import Tour from "../../../../utils/Tour";
import { DialogView } from "../../../../utils/DialogView";

import { ODimages, ODdetails } from "../../../../utils/TourData/";
import { Typography } from "@material-ui/core";

const { Circle } = Progress;
class ObjectClassification extends React.Component {
  // reference to both the video and canvas

  localStream;
  videoRef = React.createRef();
  canvasRef = React.createRef();
  state = { model: null };

  // we are gonna use inline style
  styles = {
    position: "fixed",
    top: 100,
    left: 340,
  };
  background = {
    width: 120,
    height: 100,
    backgroundColor: "white",
    borderRadius: 5
  };

  detectFromVideoFrame = (model, video) => {
    model.detect(video).then(
      (predictions) => {
        if (!predictions) {
          return;
        }
        this.showDetections(predictions);

        requestAnimationFrame(() => {
          this.detectFromVideoFrame(model, video);
        });
      },
      (error) => {
        console.log("Couldn't start the webcam");
        console.error(error);
      }
    );
  };

  showDetections = (predictions) => {
    if (!this.canvasRef.current) {
      return;
    }
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const font = "24px nucleo";
    ctx.font = font;
    ctx.textBaseline = "top";

    predictions.forEach((prediction) => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draw the bounding box.
      ctx.strokeStyle = "#2fff00";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = "#2fff00";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10);
      // draw top left rectangle
      ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
      // draw bottom left rectangle
      ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);

      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
      ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
    });
  };

  componentDidMount() {
    if (
      navigator.mediaDevices.getUserMedia ||
      navigator.mediaDevices.webkitGetUserMedia
    ) {
      // define a Promise that'll be used to load the webcam and read its frames
      const webcamPromise = navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then(
          (stream) => {
            // pass the current frame to the window.stream
            window.stream = stream;
            this.localStream = stream;
            // pass the stream to the videoRef
            this.videoRef.current.srcObject = stream;

            return new Promise((resolve) => {
              this.videoRef.current.onloadedmetadata = () => {
                resolve();
              };
            });
          },
          (error) => {
            console.log("Couldn't start the webcam");
            console.error(error);
          }
        );

      // define a Promise that'll be used to load the model
      const loadlModelPromise = cocoSsd.load();

      // resolve all the Promises
      Promise.all([loadlModelPromise, webcamPromise])
        .then((values) => {
          if (!this.state.model) {
            this.setState({ model: true });
            console.log(this.state.model);
          }

          this.detectFromVideoFrame(values[0], this.videoRef.current);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  componentWillUnmount() {
    if (this.localStream)
      this.localStream.getTracks().forEach((track) => track.stop());
  }

  // here we are returning the video frame and canvas to draw,
  // so we are in someway drawing our video "on the go"
  render() {
    return (
      <div>
        <Header />
        <DialogView
          content={
            <div>
              <Tour images={ODimages} details={ODdetails} />
            </div>
          }
          title="Virtual Tour"
        />
        <div style={{ display: "flex" }}>
          <div style={{ padding: "75" }}>
            <video
              style={this.styles}
              autoPlay
              muted
              ref={this.videoRef}
              width="720"
              height="600"
            />

            <canvas
              style={this.styles}
              ref={this.canvasRef}
              width="720"
              height="600"
            />
          </div>
          <div style={this.background}>
            {!this.state.model ? (
              <div>
                <div style={{ width: 60, margin: "auto" ,paddingTop:3 }}>
                  <CircularProgress />
                </div>
                <div>
                  <Typography
                    color="textPrimary"
                    variant="caption"
                    display="block"
                    align="center"
                    gutterBottom
                  >
                    Loading Model
                  </Typography>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ width: 60, margin: "auto" ,paddingTop:3}}>
                  <Circle percent={100} status="success" />
                </div>
                <div>
                  <Typography
                    color="textPrimary"
                    variant="caption"
                    display="block"
                    align="center"
                    gutterBottom
                  >
                    Model Loaded
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ObjectClassification;
