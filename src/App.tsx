import { EditorState } from "draft-js";
import * as React from "react";
import "./App.css";

import logo from "./logo.svg";

import UnicornEditor from "./unicorn-editor/UnicornEditor";

interface AppState {
  editorState: EditorState;
}
class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty()
    };
  }
  public render() {
    const { editorState } = this.state;
    return (
      <>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
        </div>
        <UnicornEditor
          editorState={editorState}
          onChange={this.onChange}
          readOnly={true}
        />
      </>
    );
  }

  private onChange = (editorState: EditorState) => {
    this.setState({
      editorState
    });
  };
}

export default App;
