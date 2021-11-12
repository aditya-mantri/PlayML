import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./styles.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Header from "../../../components/layout/Header";
import Tour from "../../../utils/Tour";
import { DialogView } from "../../../utils/DialogView";

import { TLimages, TLdetails } from "../../../utils/TourData/";

const width = "15%";
const height = "10%";

const styles = {
  Border: {
    flex: "1",
    position: "relative",
    top: `calc(${() => height} - 3px)`,
    left: `calc(${() => width} - 3px)`,
    width: `calc(100% - ${() => width} * 2 - 4px)`,
    height: `calc(100% - ${() => height} * 2 - 4px)`,
    border: "6px solid white",
    borderRadius: "10px",
  },
  Center: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    bottom: "-35px",
  },
};

const BootstrapButton = withStyles({
  root: {
    marginRight: "10px",
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#8080ff",
    borderColor: "black",
    width: "150px",
    borderRadius: "10%",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#00cc33",
      borderColor: " #1aa260",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#00cc33",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "#00cc33",
    },
  },
})(Button);

const videoConstraints = {
  facingMode: "user",
};

const Thug = () => {
  const webcamRef = React.useRef(null);
  const [uri, setUri] = useState(require("./output-word.jpg"));
  const [loading, setLoading] = useState(false);

  async function imgseg(bimg) {
    axios
      .post("https://localhost:8000/thug/", {
        body: bimg,
      })
      .then(function (response) {
        setLoading(false);
        setUri(response.data);
        console.log(response.data);
        console.log(typeof uri);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setLoading(true)
    imgseg(imageSrc);
  }, [webcamRef]);
  return (
    <div>
      <Header />
      <DialogView
        content={
          <div>
            <Tour images={TLimages} details={TLdetails} />
          </div>
        }
        title="Virtual Tour"
      />
      <div style={{ backgroundColor: "black" }}>
        <div style={{ display: "flex" }}>
          <div style={styles.Border}>
            <Webcam
              audio={false}
              height={800}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={1000}
              videoConstraints={videoConstraints}
            />
            <div style={styles.Center}>
              <BootstrapButton
                variant="contained"
                color="primary"
                disableRipple
                onClick={capture}
              >
                CAPTURE PHOTO
              </BootstrapButton>
            </div>
          </div>
          <div style={styles.Border}>
          {loading ? (
              <div className="vertical-center">
                <CircularProgress />
              </div>
            ) : (
              <img src={uri} width="100%" height="100%" alt="base64 test"></img>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Thug;
