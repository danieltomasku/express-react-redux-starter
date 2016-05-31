import React from 'react'
import ReactDOM from 'react-dom'
import ExampleSite from '../../components/ExampleSite'


// Capture Site target in DOM
var target = document.getElementById('ExampleSite');
ReactDOM.render(<ExampleSite wrapper={target} />,target);

