import React from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import Image from "../elements/Image";
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import SimpleForm from "../../utils/Chatbot"


const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Nucleo',
  headerBgColor: '#EF6C00',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#EF6C00',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {
  const outerClasses = classNames(
    "features-split section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <div className={splitClasses}>
            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <h3 className="mt-0 mb-12">
                  <Link
                    to={{
                      pathname: "/regression",
                      
                    }}
                  >
                    Linear Regression
                  </Link>
                </h3>
                <p className="m-0">
                  Linear regression attempts to model the relationship between
                  two variables by fitting a linear equation to observed data.
                  One variable is considered to be an explanatory variable, and
                  the other is considered to be a dependent variable. For
                  example, a modeler might want to relate the weights of
                  individuals to their heights using a linear regression model.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  src={require("../../assets/img/regression.png")}
                  alt="Features split 01"
                  width={528}
                  height={396}
                />
              </div>
            </div>

            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-right"
                data-reveal-container=".split-item"
              >
                <h3 className="mt-0 mb-12">
                  <h3 className="mt-0 mb-12">
                    <Link
                      to={{
                        pathname: "/imageSegmentation",
                        
                      }}
                    >
                      Image Segmentation
                    </Link>
                  </h3>
                </h3>
                <p className="m-0">
                  Image segmentation is a commonly used technique in digital
                  image processing and analysis to partition an image into
                  multiple parts or regions, often based on the characteristics
                  of the pixels in the image. Image segmentation could involve
                  separating foreground from background, or clustering regions
                  of pixels based on similarities in color or shape.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  src={require("../../assets/img/segmentation.png")}
                  alt="Features split 02"
                  width={528}
                  height={396}
                />
              </div>
            </div>

            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <h3 className="mt-0 mb-12">
                  <h3 className="mt-0 mb-12">
                    <Link
                      to={{
                        pathname: "/objectClassification",
                        
                      }}
                    >
                      Object Detection
                    </Link>
                  </h3>
                </h3>
                <p className="m-0">
                  Object detection is a computer technology related to computer
                  vision and image processing that deals with detecting
                  instances of semantic objects of a certain class in digital
                  images and videos.The goal of object detection is to replicate
                  this intelligence using a computer.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  src={require("../../assets/img/object.png")}
                  alt="Features split 03"
                  width={528}
                  height={396}
                />
              </div>
            </div>

            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <h3 className="mt-0 mb-12">
                  <Link
                    to={{
                      pathname: "/imageClassification",
                      
                    }}
                  >
                    Image Classification
                  </Link>
                </h3>
                <p className="m-0">
                  Image classification, a topic of pattern recognition in
                  computer vision, is an approach of classification based on
                  contextual information in images. "Contextual" means this
                  approach is focusing on the relationship of the nearby pixels,
                  which is also called neighbourhood.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  src={require("../../assets/img/image.gif")}
                  alt="Features split 03"
                  width={528}
                  height={396}
                />
              </div>
            </div>

            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <h3 className="mt-0 mb-12">
                  <Link
                    to={{
                      pathname: "/categoricalClassification",
                      
                    }}
                  >
                    Categorical Classification
                  </Link>
                </h3>
                <p className="m-0">
                  Categorical Data is the data that generally takes a limited
                  number of possible values. Also, the data in the category need
                  not be numerical, it can be textual in nature. All machine
                  learning models are some kind of mathematical model that need
                  numbers to work with. This is one of the primary reasons we
                  need to pre-process the categorical data before we can feed it
                  to machine learning models.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  src={require("../../assets/img/categorical.png")}
                  alt="Features split 03"
                  width={528}
                  height={396}
                />
              </div>
            </div>

            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <h3 className="mt-0 mb-12">
                  <Link
                    to={{
                      pathname: "/svm",
                    }}
                  >
                    Support Vector Machines
                  </Link>
                </h3>
                <p className="m-0">
                Support Vector Machine or SVM is one of the most popular Supervised Learning algorithms,
                primarily, it is used for classification problems to create the best line or decision boundary 
                that can segregate n-dimensional space into classes so that we can easily put the 
                new data point in the correct category in the future.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  src={require("../../assets/img/svm.jpeg")}
                  alt="Features split 03"
                  width={528}
                  height={396}
                />
              </div>
            </div>

            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <h3 className="mt-0 mb-12">
                  <Link
                    to={{
                      pathname: "/thug",
                      
                    }}
                  >
                    Thug Life
                  </Link>
                </h3>
                <p className="m-0">Dont be a bitch be a Thug.</p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  src={require("../../assets/img/thug.jpg")}
                  alt="Features split 01"
                  width={528}
                  height={396}
                />
              </div>
            </div>
          </div>
          <ThemeProvider theme={theme}>
          <SimpleForm />
          </ThemeProvider>
        </div>
      </div>
    </section>
  );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default withRouter(FeaturesSplit);
