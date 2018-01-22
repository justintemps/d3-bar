import './src/styles/app.css';

const node = document.createElement('p');
const msg = document.createTextNode('Hello world...');
document.body.appendChild(node);
node.appendChild(msg);
