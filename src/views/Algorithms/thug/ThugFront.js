import React, { createRef } from "react";
import { Link } from "react-router-dom";
import { Sidenav, Nav, Icon, Dropdown, Content } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import Header from "../../../components/layout/Header";
import JupyterNotebook from "../../../utils/JupyterViewer";

class ThugFront extends React.Component {
  thugBasics = require("../../../utils/tutorial/Thug_Life/Thug_Life_Basics.ipynb")
  thugFeatureDetection = require("../../../utils/tutorial/Thug_Life/Thug_Life_Feature_Detection.ipynb")
  
  scrollToThugBasics = createRef();
  scrollToThugFeatureDetection = createRef();

  smoothScrollToThugBasics = () => {
    this.scrollToThugBasics.current.scrollIntoView({ behavior: "smooth" });
  };

  smoothScrollToThugFeatureDetection = () => {
    this.scrollToThugFeatureDetection.current.scrollIntoView({ behavior: "smooth" });
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
                    Thug Life
                  </Nav.Item>
                  <Dropdown
                    eventKey="3"
                    title="Theory"
                    icon={<Icon icon="magic" />}
                  >
                    <Dropdown.Item eventKey="3-1" onSelect={this.smoothScrollToThugBasics}>
                      Basics
                    </Dropdown.Item>

                    <Dropdown.Item eventKey="3-2" onSelect={this.smoothScrollToThugFeatureDetection}>
                      Feature Detection
                    </Dropdown.Item>

                    <Link
                      style={{ textDecoration: "inherit", color: "inherit" }}
                      to="/thug/Playground"
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
            <div ref={this.scrollToThugBasics}>
              <Content>
                <JupyterNotebook ipynb={this.thugBasics} />
              </Content>
            </div>
            <div ref={this.scrollToThugFeatureDetection}>
              <Content>
                <JupyterNotebook ipynb={this.thugFeatureDetection} />
              </Content>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ThugFront;