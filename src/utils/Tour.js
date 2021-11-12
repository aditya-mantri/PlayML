import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
  center: {
    display: "inline-block",
  },
  root: {
    maxWidth: "100%",
  },
  lower: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function App(props) {
  const classes = useStyles();
  const images = props.images
  const details = props.details
  const [contentIndex, setContentIndex] = useState(0);

  const onNextClickHandler = () => {
    if (contentIndex >= details.length - 1) {
      setContentIndex(details.length - 1);
    } else {
      setContentIndex(contentIndex + 1);
    }
  };

  const onBackClickHandler = () => {
    if (contentIndex <= 0) {
      setContentIndex(0);
    } else {
      setContentIndex(contentIndex - 1);
    }
  };
  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={images[contentIndex]}
            title="Tutorial"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {details[contentIndex]}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.lower}>
          <Button size="small" color="primary" onClick={onBackClickHandler}>
            Back
          </Button>
          <Button size="small" color="primary" onClick={onNextClickHandler}>
            Next
          </Button>

          <Typography variant="body2" color="textSecondary">
            {contentIndex + 1}/{details.length}
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
}
