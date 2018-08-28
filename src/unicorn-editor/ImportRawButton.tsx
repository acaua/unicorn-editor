import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import * as React from "react";

interface ImportRawButtonProps {
  editorState: EditorState;
  setEditorState: (content: EditorState) => void;
}

interface ImportRawButtonState {
  rawContentString?: string;
}

export default class ImportRawButton extends React.Component<
  ImportRawButtonProps,
  ImportRawButtonState
> {
  constructor(props: ImportRawButtonProps) {
    super(props);
    this.state = { rawContentString: undefined };
  }

  public render() {
    const { rawContentString } = this.state;
    return (
      <div>
        <div>
          <button type="button" onClick={this.importRawContent}>
            Import Raw content
          </button>
          <button type="button" onClick={this.logRawContent}>
            Log Raw content
          </button>
        </div>
        <textarea
          onChange={this.onRawContentStringChange}
          value={rawContentString}
        />
      </div>
    );
  }

  private importRawContent = () => {
    const { rawContentString } = this.state;
    const { setEditorState } = this.props;

    try {
      const rawContent = JSON.parse(rawContentString || "");
      // tslint:disable-next-line:no-console
      console.log(JSON.stringify(rawContent));
      setEditorState(EditorState.createWithContent(convertFromRaw(rawContent)));
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e);
    }
  };

  private onRawContentStringChange = (e: any) =>
    this.setState({ rawContentString: e.target.value });

  private logRawContent = () => {
    const rawContent = convertToRaw(this.props.editorState.getCurrentContent());
    // tslint:disable-next-line:no-console
    console.log(JSON.stringify(rawContent, null, 2));
  };
}
