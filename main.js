//textos de ejemplo
const textos = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

// almacena la lista de palabras y el índice de la palabra que el jugador está escribiendo actualmente
let palabras = [];
let palabraIndice = 0;
let startTime = Date.now();

// elementos de la pagina
const textoElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('texto-tipeado');

document.getElementById('inicio').addEventListener('click', () => {
    // elegimos el texto de ejemplo a mostrar
    const textoIndice = Math.floor(Math.random() * textos.length);
    const texto = textos[textoIndice];
    palabras = texto.split(' ');
    palabraIndice = 0;
  
    // Actualizamos la interfaz de usuario
    const spanPalabras = palabras.map(function(palabra) { return `<span>${palabra} </span>`});
    textoElement.innerHTML = spanPalabras.join('');
    textoElement.childNodes[0].className = 'highlight';
    messageElement.innerText = '';

    typedValueElement.value = '';
    typedValueElement.focus();

    startTime = new Date().getTime();
});

// control del juego
typedValueElement.addEventListener('input', () => {
    const currentWord = palabras[palabraIndice];
    const typedValue = typedValueElement.value;
    if (typedValue === currentWord && palabraIndice === palabras.length - 1) {
      const elapsedTime = new Date().getTime() - startTime;
      const message = `FELICITACIONES! Finalizaste en ${elapsedTime / 1000} segundos.`;
      messageElement.innerText = message;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      typedValueElement.value = '';
      palabraIndice++;
      for (const palabraElement of textoElement.childNodes) {
        palabraElement.className = '';
      }
      textoElement.childNodes[palabraIndice].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      typedValueElement.className = '';
    } else {
      typedValueElement.className = 'error';
    }
  });
