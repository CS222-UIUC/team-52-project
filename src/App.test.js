import { render, screen } from '@testing-library/react';
//import App from './App';
import App from './App.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('correct background', () => {
    render(<App />);
    if (backgroundColor === "rgb(138, 187, 99)") {
        console.log("background is green");
    } else {
        console.log("background isn't green")
    }
  });

