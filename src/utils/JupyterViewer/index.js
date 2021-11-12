import "antd/dist/antd.css";
import React from 'react';
import './index.css';
import JupViewer from './JupViewer'

class JupyterNotebook extends React.Component {
  render() {
    return (
      <div className="App">
        <JupViewer
          title={this.props.title}
          subtitle={this.props.subtitle}
          file={this.props.ipynb}
          />
      </div>
    )
  }
}

export default JupyterNotebook