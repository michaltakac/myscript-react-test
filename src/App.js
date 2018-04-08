/* global MathExpression */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as MyScriptJS from 'myscript/src/myscript'
import 'myscript/dist/myscript.min.css';
console.log(window)
const editorStyle = {
  'minWidth': '500px',
  'minHeight': '500px',
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={editorStyle} ref="editor">

				</div>
				<button onClick={this.convert}>Convert</button>
      </div>
    );
  }
  componentDidMount() {
    this.editor = MyScriptJS.register(this.refs.editor, {
      recognitionParams: {
        type: 'MATH',
        protocol: 'WEBSOCKET',
        apiVersion: 'V4',
        server: {
          scheme: 'https',
          host: 'webdemoapi.myscript.com',
          applicationKey: '6ff2e0d1-e131-4503-9c2b-4bce98b54850',
          hmacKey: '2a3a6078-9657-4d2c-8aab-9d62ab3d98b8',
				},
				v4: {
					math: {
						mimeTypes: ['application/x-latex']
					}
				}
      },
    });
		window.addEventListener("resize", () => {this.editor.resize()});
		console.log(this.editor)
		this.editor.domElement.addEventListener('exported', function (evt) {
			const exports = evt.detail.exports;
			if (exports && exports['application/x-latex']) {
				console.log(exports['application/x-latex']);
			}
		})
	}
	convert = () => {
		this.editor.convert()
		setTimeout(() => {
			console.log(this.editor)
			const latex = this.editor.model.exports['application/x-latex']
			const func = MathExpression.fromLatex(latex)
			console.log(func.evaluate({ x:3 }))
		}, 2000)
	}
}

export default App;
