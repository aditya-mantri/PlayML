import React, { createRef } from "react";
import { Link } from "react-router-dom";
import { Sidenav, Nav, Icon, Dropdown, Content } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import Header from "../../../components/layout/Header";
import JupyterNotebook from "../../../utils/JupyterViewer";


class SVMfront extends React.Component {
  SupportVectorMachine = require("../../../utils/tutorial/Support vector machine/SupportVectorMachine.ipynb");
  scrollToSVM = createRef();

  code = () => {
    this.scrollToSVM.current.scrollIntoView({
      behavior: "smooth",
    });
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
                    Support Vector Machine
                  </Nav.Item>
                  <Dropdown
                    eventKey="3"
                    title="Theory"
                    icon={<Icon icon="magic" />}
                  >
                    <Dropdown.Item eventKey="3-1" onSelect={this.code}>
                      Code
                    </Dropdown.Item>

                    {/* <Dropdown.Item eventKey="3-3">Code</Dropdown.Item> */}
                    <Link
                      style={{ textDecoration: "none", color: "#0000" }}
                      to="/svm"
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
            <div ref={this.scrollToSVM}>
              <Content>
                <JupyterNotebook title = "Support Vector Machine" ipynb={this.SupportVectorMachine} />
              </Content>
            </div>
            {}
          </div>
        </div>
      </div>
    );
  }
}

export default SVMfront;
