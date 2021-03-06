import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import {
  editCabinetCancel,
  editCabinetSave
} from "../redux/actions/cabinetActions";

import CabinetFolderEditForm from "./CabinetFolderEditForm";

class CabinetEditForm extends CabinetFolderEditForm {
  constructor(props) {
    super(props);
    this.state = { description: "", title: "" };
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.editCabinetSave(
      this.props.cabinetId,
      this.state.title,
      this.state.description
    );
    this.setState({ description: "", title: "" });
  };

  render() {
    let title = "Edit Cabinet";
    if (this.props.cabinetId === "_NEW_") title = "New Cabinet";

    return (
      <Form>
        <Modal
          show={this.props.cabinetId ? true : false}
          onHide={this.props.editCabinetCancel}
        >
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                onChange={this.handleTitleChange}
              />
              <Form.Control.Feedback type="invalid">
                You must supply a title.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Description"
                onChange={this.handleDescriptionChange}
              />
            </Form.Group>
            <Form.Text className="text-muted">
              A longer description of the cabinet's contents. Max 500
              characters.
            </Form.Text>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.editCabinetCancel}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return { cabinetId: state.cabinets.editingCabinetId };
};
export default connect(mapStateToProps, { editCabinetCancel, editCabinetSave })(
  CabinetEditForm
);
//export default CabinetEditForm;
