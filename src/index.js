require('file-loader?name=[name].[ext]!./index.html'); // Webpack: to include index.html
import React from 'react'; // ✅ React 18+
import ReactDOM from 'react-dom/client'; // ✅ React 18+
import App from './App';

// ✅ Make sure the element with id="root" exists in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);