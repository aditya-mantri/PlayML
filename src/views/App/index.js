import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import AppRoute from "../../utils/AppRoute";
import ScrollReveal from "../../utils/AppRoute";
import { createBrowserHistory } from "history";
// import ReactGA from "react-ga";
import * as ml5 from "ml5";

// Layouts
import LayoutDefault from "../../layouts/LayoutDefault";

// Views
import Tour from "../../utils/Tour";
import Home from "../LandingPage/index";
import Regression from "../Algorithms/Regression/index";
import RegressionFront from "../Algorithms/Regression/RegressionFront";
import ImageClassification from "../Algorithms/Classification/ImageClassification/";
import ImageClassificationFront from "../Algorithms/Classification/ImageClassification/ImageClassificationFront";
import CategoricalClassification from "../Algorithms/Classification/CategoricalClassification/";
import CategoricalClassificationFront from "../Algorithms/Classification/CategoricalClassification/CategoricalClassificationFront";
import ObjectClassification from "../Algorithms/Classification/ObjectClassification/";
import ObjectClassificationFront from "../Algorithms/Classification/ObjectClassification/ObjectClassificationFront";
import ImageSegmentation from "../Algorithms/ImageSegmentation/";
import ImageSegmentationFront from "../Algorithms/ImageSegmentation/ImageSegmentationFront";
import Thug from "../Algorithms/thug";
import ThugFront from "../Algorithms/thug/ThugFront";
import SVMFront from "../Algorithms/SVM/SVMfront";


const App = () => {
  const browserHistory = createBrowserHistory();
  return (
    <ScrollReveal
      // ref={childRef}
      children={() => (
        <HashRouter history={browserHistory}>
          <Switch>
            <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
            <AppRoute exact path="/regression" component={RegressionFront} />
            <AppRoute
              exact
              path="/categoricalClassification"
              component={CategoricalClassificationFront}
            />
            <AppRoute
              exact
              path="/imageClassification"
              component={ImageClassificationFront}
            />
            <AppRoute
              exact
              path="/objectClassification"
              component={ObjectClassificationFront}
            />
            <AppRoute
              exact
              path="/imageSegmentation"
              component={ImageSegmentationFront}
            />
            <AppRoute exact path="/thug" component={ThugFront} />
            <AppRoute exact path="/svm" component={SVMFront} />
            <AppRoute
              exact
              path="/regression/Playground"
              component={Regression}
            />
            <AppRoute exact path="/tour" component={Tour} />
            <AppRoute
              exact
              path="/imageClassification/Playground"
              component={ImageClassification}
            />
            <AppRoute
              exact
              path="/objectClassification/Playground"
              component={ObjectClassification}
            />
            <AppRoute
              exact
              path="/categoricalClassification/Playground"
              component={CategoricalClassification}
            />
            <AppRoute
              exact
              path="/imageSegmentation/Playground"
              component={ImageSegmentation}
            />
            <AppRoute exact path="/thug/Playground" component={Thug} />
          </Switch>
        </HashRouter>
      )}
    />
  );
};

export default App;
