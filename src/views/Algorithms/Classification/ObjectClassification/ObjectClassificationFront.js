import React, { createRef } from "react";
import { Link } from "react-router-dom";
import { Sidenav, Nav, Icon, Dropdown, Content } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import Header from "../../../../components/layout/Header";
import JupyterNotebook from "../../../../utils/JupyterViewer";

class ObjectClassificationFront extends React.Component {
  objectClassificationDefiniton = require("../../../../utils/tutorial/Object_Classification/Object_Classification_Definition.ipynb")
  objectClassificationConvolutions = require("../../../../utils/tutorial/Object_Classification/Object_Classification_CNN.ipynb")
  objectClassificationCode = require("../../../../utils/tutorial/Object_Classification/Object_Classification_Code.ipynb")
  
  scrollToObjectClassificationDefinition = createRef();
  scrollToObjectClassificationConvolutions = createRef();
  scrollToObjectClassificationCode = createRef();

  smoothScrollToObjectClassificationDefinition = () => {
    this.scrollToObjectClassificationDefinition.current.scrollIntoView({ behavior: "smooth" });
  };

  smoothScrollToObjectClassificationConvolutions = () => {
    this.scrollToObjectClassificationConvolutions.current.scrollIntoView({ behavior: "smooth" });
  };

  smoothScrollToObjectClassificationCode = () => {
    this.scrollToObjectClassificationCode.current.scrollIntoView({ behavior: "smooth" });
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
                    Object Classification
                  </Nav.Item>
                  <Dropdown
                    eventKey="3"
                    title="Theory"
                    icon={<Icon icon="magic" />}
                  >
                    <Dropdown.Item eventKey="3-1" onSelect={this.smoothScrollToObjectClassificationDefinition}>
                      Definition
                    </Dropdown.Item>

                    <Dropdown.Item eventKey="3-2" onSelect={this.smoothScrollToObjectClassificationConvolutions}>
                      CNN
                    </Dropdown.Item>

                    <Dropdown.Item eventKey="3-3" onSelect={this.smoothScrollToObjectClassificationCode}>
                    Code
                    </Dropdown.Item>
                    <Link
                      style={{ textDecoration: "inherit", color: "inherit" }}
                      to="/objectClassification/Playground"
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
            <div ref={this.scrollToObjectClassificationDefinition}>
              <Content>
                <JupyterNotebook ipynb={this.objectClassificationDefiniton} />
              </Content>
            </div>
            <div ref={this.scrollToObjectClassificationConvolutions}>
              <Content>
                <JupyterNotebook ipynb={this.objectClassificationConvolutions} />
              </Content>
            </div>
            <div ref={this.scrollToObjectClassificationCode}>
              <Content>
                <JupyterNotebook ipynb={this.objectClassificationCode} />
              </Content>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ObjectClassificationFront;
