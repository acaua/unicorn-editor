import { EditorState } from "draft-js";
import * as React from "react";

interface ImageButtonProps {
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
  addImage: (editorState: EditorState, imageUrl: string) => EditorState;
}

export default class ImageButton extends React.Component<
  ImageButtonProps,
  any
> {
  // constructor(props: ImageButtonProps) {
  //   super(props);
  // }
  private input: HTMLInputElement | null;

  public render() {
    return (
      <button type="button" onClick={this.onClick} title="Add an Image">
        Add an image
        <input
          type="file"
          ref={c => {
            this.input = c;
          }}
          onChange={this.onChange}
          style={{ display: "none" }}
        />
      </button>
    );
  }

  private onClick = () => {
    if (this.input) {
      this.input.value = "";
      this.input.click();
    }
  };

  private onChange = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file.type.indexOf("image/") === 0) {
      const { editorState, setEditorState, addImage } = this.props;
      const src = URL.createObjectURL(file);

      const newState = addImage(editorState, src);
      setEditorState(newState);
    }
  };
}
