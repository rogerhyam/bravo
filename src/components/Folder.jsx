import DraggableTypes from "./DraggableTypes";
import MyHerbariumPart from "./MyHerbariumPart";

class Folder extends MyHerbariumPart {
  constructor(props) {
    super(props);
    this.state = { style: this.styleBlurred };
  }

  styleBlurred = {
    backgroundColor: "white"
  };

  styleFocussed = {
    backgroundColor: "gray"
  };

  handleDragEnter = e => {
    this.setState({ style: this.styleFocussed });
  };

  handleDragLeave = e => {
    this.setState({ style: this.styleBlurred });
  };

  handleDragOver = e => {
    e.preventDefault();
  };

  handleDrop = e => {
    console.log("dropped on folder");
    e.preventDefault(); // no other behaviour
    e.stopPropagation(); // don't get other components to fire

    // we lose focus on the drop no matter what
    this.setState({ style: this.styleBlurred });

    switch (e.dataTransfer.getData("type")) {
      case DraggableTypes.FOLDER:
        console.log("Folder dropped");
        break;
      case DraggableTypes.SPECIMEN:
        console.log("Specimen dropped");
        console.log(e.dataTransfer.getData("specimenId"));
        // FIXME - Add specimen to folder!!
        break;
      // nothing for other drop types
      default:
        return false;
    }
  };

  handleDragStart = e => {
    console.log("folder drag start");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("folderId", "folder 12939");
    e.dataTransfer.setData("type", DraggableTypes.FOLDER);
    e.dataTransfer.setDragImage(e.target, 10, 10);
  };

  render() {
    return null;
  }
}

export default Folder;
