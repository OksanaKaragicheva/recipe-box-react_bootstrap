import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import AddRecipe from './Components/AddRecipe';
import './App.sass';

library.add(faTimes, faPencilAlt, faTrashAlt);

class App extends Component {
  render() {
    return (
      <div>
        <AddRecipe />
      </div>
    );
  }
}

export default App;
