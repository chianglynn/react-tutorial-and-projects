import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import SingleMovie from './SingleMovie';

function App() {
  return (
    <Switch>
      <Route exact path="/"><Home /></Route>
      {/* <Route path="/movies/:id"><SingleMovie/></Route> */}
      <Route path="/movies/:id" children={<SingleMovie />} />
    </Switch>
  );
}

export default App;