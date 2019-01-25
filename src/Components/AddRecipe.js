import React, { Component } from 'react';
import ListOfRecipes from '../Components/ListOfRecipes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';


class AddRecipe extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getValidationStateTitle = this.getValidationStateTitle.bind(this);
    this.getValidationStateIngredients = this.getValidationStateIngredients.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.addRecipeButModal = this.addRecipeButModal.bind(this);
    this.openCardForEdit = this.openCardForEdit.bind(this);

    this.state = {
      index: 0,
      show: false,
      title: '',
      ingredients: '',
      modalHeader: "Add a Recipe",
      addButHeader: "Add",
      recipes: JSON.parse(localStorage.getItem("_oksanakaragicheva_recipes"))
    };
  }

  componentWillMount() {
    if (localStorage.getItem("_oksanakaragicheva_recipes") === null) {
      localStorage.setItem(
        "_oksanakaragicheva_recipes",
        JSON.stringify([
          {
            title: "Borsch",
            ingredients: "potato, meat, cabbage, onion, carrot, beet"
          }
        ])
      );
      this.setState({
        recipes: JSON.parse(localStorage.getItem("_oksanakaragicheva_recipes"))
      });
    }
  }

  getValidationStateTitle() {
    const titleLength = this.state.title.length;
    if (titleLength >= 1) return 'success';
    else if (titleLength === 0) return 'error';
    return null;
  }

  getValidationStateIngredients() {
    const ingredientsLength = this.state.ingredients.length;
    if (ingredientsLength >= 1) return 'success';
    else if (ingredientsLength === 0) return 'error';
    return null;
  }

  handleTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleIngredients(e) {
    this.setState({ ingredients: e.target.value });
  }

  handleClose() {
    this.setState({
      show: false,
      modalHeader: "Add a Recipe",
      addButHeader: "Add",
      title: "",
      ingredients: ""
    });
  }

  handleShow() {
    this.setState({ show: true });
  }

  addRecipeButModal() {
    this.setState({
      show: false,
      title: this.state.title,
      ingredients: this.state.ingredients,
      modalHeader: "Add a Recipe",
      addButHeader: "Add",
      recipes:
        this.state.addButHeader === "Add"
          ? [
              ...this.state.recipes,
              { title: this.state.title, ingredients: this.state.ingredients }
            ]
          : this.state.recipes
              .slice(0, this.state.index)
              .concat(
                {
                  title: this.state.title,
                  ingredients: this.state.ingredients
                },
                this.state.recipes.slice(this.state.index + 1)
              )
    });
    this.setState({
      title: "",
      ingredients: ""
    });

    localStorage.setItem(
      "_oksanakaragicheva_recipes",
      JSON.stringify(
        this.state.addButHeader === "Add"
          ? [
              ...this.state.recipes,
              { title: this.state.title, ingredients: this.state.ingredients }
            ]
          : this.state.recipes
              .slice(0, this.state.index)
              .concat(
                {
                  title: this.state.title,
                  ingredients: this.state.ingredients
                },
                this.state.recipes.slice(this.state.index + 1)
              )
      )
    );
  }

  openCardForEdit(i) {
    this.setState({
      index: i,
      show: true,
      title: this.state.recipes[i].title,
      ingredients: this.state.recipes[i].ingredients,
      modalHeader: "Edit a Recipe",
      addButHeader: "Edit"
    });
  }

  render() {
     return (
      <div>
      <div id="mainButtonContainer">
        <Button id="addRecipeMain" bsSize="large" onClick={this.handleShow} block>
          Add Recipe
        </Button>
      </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title id="modalTitle">{this.state.modalHeader}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
            <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationStateTitle()}
            >
              <ControlLabel>Title</ControlLabel>
              <FormControl
              type="text"
              value={this.state.title}
              placeholder="Enter title"
              onChange={this.handleTitle}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation is based on string length</HelpBlock>
            </FormGroup>
            <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationStateIngredients()}
            >
              <ControlLabel>Ingredients</ControlLabel>
              <FormControl
              componentClass="textarea"
              value={this.state.ingredients}
              placeholder="Enter ingredients"
              onChange={this.handleIngredients}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation is based on string length</HelpBlock>
           </FormGroup>
           </form>
         </Modal.Body>
         <Modal.Footer>
            <Button id="addBut" onClick={this.addRecipeButModal}>{this.state.addButHeader}
            </Button>
            <Button id="closeBut" onClick={this.handleClose}><FontAwesomeIcon icon="times" /></Button>
         </Modal.Footer>
      </Modal>
      <ListOfRecipes recipes={this.state.recipes} openCardForEdit={this.openCardForEdit} />
      </div>
    );
  }
}

export default AddRecipe;
