import React, { createRef } from "react";
import { Link } from "react-router-dom";
import { Sidenav, Nav, Icon, Dropdown, Content } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import Header from "../../../components/layout/Header";
import JupyterNotebook from "../../../utils/JupyterViewer";

class RegressionFront extends React.Component {
  linearRegression = require("../../../utils/tutorial/Linear_Regression/Linear_Regression.ipynb");
  gradientDescent = require("../../../utils/tutorial/Linear_Regression/GradientDescent.ipynb");
  
  scrollToLinearRegression = createRef();
  scrollToGradientDescent = createRef();

  smoothScrollToLinearRegression = () => {
    this.scrollToLinearRegression.current.scrollIntoView({ behavior: "smooth" });
  };

  smoothScrollToGradientDescent = () => {
    this.scrollToGradientDescent.current.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    return (
      <div>
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "row",
            height: "100%",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <div style={{ width: 250 }}>
            <Sidenav
              defaultOpenKeys={["3", "4"]}
              activeKey="1"
              appearance="inverse"
            >
              <Sidenav.Body>
                <Nav>
                  <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />}>
                    Linear Regression
                  </Nav.Item>
                  <Dropdown
                    eventKey="3"
                    title="Theory"
                    icon={<Icon icon="magic" />}
                  >
                    <Dropdown.Item eventKey="3-1" onSelect={this.smoothScrollToLinearRegression}>
                      Definition
                    </Dropdown.Item>

                    <Dropdown.Item eventKey="3-2" onSelect={this.smoothScrollToGradientDescent}>
                      Gradient Descent
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="3-3">Code</Dropdown.Item>
                    <Link
                      style={{ textDecoration: "inherit", color: "inherit" }}
                      to="/regression/Playground"
                    >
                      <Dropdown.Item eventKey="3-4">PlayGround</Dropdown.Item>
                    </Link>
                  </Dropdown>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </div>
          <div
            style={{
              position: "fixed",
              height: "100%",
              width: "100%",
              overflowY: "scroll",
              top: "0",
              bottom: "0",
              marginTop: "60px",
              marginLeft: "100px",
            }}
          >
            <div ref={this.scrollToLinearRegression}>
              <Content>
                <JupyterNotebook ipynb={this.linearRegression} />
              </Content>
            </div>
            <div ref={this.scrollToGradientDescent}>
              <Content>
                <JupyterNotebook ipynb={this.gradientDescent} />
              </Content>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegressionFront;
