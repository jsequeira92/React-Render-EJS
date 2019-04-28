import React from "react";
import ReactDOM from "react-dom";
import ejs from "ejs";
import renderHTML from "react-render-html";

class Template extends React.Component {
  constructor(props) {
    super(props);
    const { template } = props;
    this.state = {
      template,
      prevTemplate: template
    };
    this.data = {
      portal_url: "#",
      portal_logo: "#",
      portal_name: "Name",
      invoice_number: "INV"
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.template !== state.template) {
      return {
        template: props.template,
        prevTemplate: state.template
      };
    }
  };

  render() {
    const { template, prevTemplate } = this.state;
    let html = ejs.render(prevTemplate, this.data);
    try {
      html = ejs.render(template, this.data);
    } catch (error) {
      console.log(`Error in your template ${error}`);
    }
    return <div>{renderHTML(html)}</div>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      template: "<html><body><p>hi</p></body></html>",
      templateRender: ""
    };
  }
  render() {
    const { template, templateRender } = this.state;
    return (
      <div className="App">
        <button
          onClick={() => {
            console.log(template);
            this.setState(prevState => ({
              templateRender: prevState.template
            }));
          }}
        >
          Click
        </button>
        <div
          style={{
            display: "flex"
          }}
        >
          <div style={{ width: "50%" }}>
            <textarea
              style={{ width: "100%" }}
              onChange={event => {
                const template = event.target.value;
                setTimeout(
                  template => {
                    const currTemplate = this.state.template;
                    if (template === currTemplate) {
                      this.setState({
                        templateRender: template
                      });
                    }
                  },
                  1500,
                  template
                );
                this.setState({
                  template
                });
              }}
              value={template}
              rows={100}
            />
          </div>
          <div style={{ width: "50%", padding: "10px 20px" }}>
            <Template template={templateRender} />
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
