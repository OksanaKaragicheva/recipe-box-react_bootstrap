import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Well } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { PanelGroup } from 'react-bootstrap';

class ListOfRecipes extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
    this.delete = this.delete.bind(this);

    this.state = {
      activeKey: '0',
      open: false
    };
  }

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  delete(i) {
    this.props.recipes.splice(i, 1);
    this.setState({
      activeKey: '0',
      recipes: this.props.recipes
    });
    localStorage.setItem(
      "_oksanakaragicheva_recipes",
      JSON.stringify(this.props.recipes)
    );
  }

  render() {
  return (
    <PanelGroup
    accordion
    id="accordion-controlled-example"
    activeKey={this.state.activeKey}
    onSelect={this.handleSelect}
    >
    {this.props.recipes.map((recipe, index) => {
      return (
        <Panel eventKey={index}>
          <Panel.Heading>
            <Panel.Title toggle>{recipe.title}</Panel.Title>
          </Panel.Heading>
          <Panel.Body className="panelStyle" collapsible>
            <Well>
            {recipe.ingredients}
            </Well>
          <ButtonToolbar>
            <Button className="edit" bsStyle="info" onClick={() => this.props.openCardForEdit(index)}><FontAwesomeIcon icon="pencil-alt" />
            </Button>
            <Button className="delete" bsStyle="danger" onClick={() => this.delete(index)}><FontAwesomeIcon icon="trash-alt" />
            </Button>
          </ButtonToolbar>
          </Panel.Body>
          </Panel>
      );
    })
   }
   </PanelGroup>
);
}
}
export default ListOfRecipes;
