import './style.css';

//Como importar imagenes
//import Icon from './icon.png';
//const myIcon = new Image();
//myIcon.src = Icon;
//element.appendChild(myIcon);

function component() {
  const element = document.createElement('div');

  element.innerHTML = 'Hello webpack';

  return element;
}

document.body.appendChild(component());