const yesBtn = document.querySelector('#yesBtn');
const noBtn = document.querySelector('#noBtn');

let isMoving = false;
let moveTimeout;
let messageCount = 0;
let cursorTimeout;
let lastCursorMoveTime = 0;
let randomMovementInterval;

// Arreglo de mensajes divertidos
const funnyMessages = [
    '¡Vamos, di que sí! 🥺',
    'No seas timido/a 💕',
    'El amor está en el aire 💖',
    '¡Piénsalo bien! 😊',
    'Las oportunidades únicas vienen una vez 🌟',
    '¡Da una oportunidad al amor! 💝',
    'Seré el mejor/la mejor novia/o 🥰',
    '¡Confía en mí! 💞',
    'Juntos podemos todo 💑',
    'Crearemos momentos hermosos ✨',
    '¿Qué dices? ¿Sí? 😍',
    'La vida es mejor en pareja 💏',
    '¡Haz clic en SI y cambiemos el mundo! 🌍',
    'Pensándolo bien... ¿sí? 😘',
    'Dos corazones, una decisión 💓',
    '¡Eres increíble! Sí que sí 🤩',
    'Nos merecemos ser felices 💕',
    'Mi corazón dice que sí 💗',
    '¡El sí es la respuesta correcta! ✅',
    'Si dices no, lloraré 😭💔',
    'Ok, di NO... pero yo seguiré esperando 😢',
    '¿Última oportunidad? 🥺👉👈',
    'Pensándolo mejor... looser 💅',
    '¡Tengo chocolates! 🍫 Sí?',
    'Regalo sorpresa si dices sí! 🎁'
];

const noTexts = [
    'NO',
    'Nope',
    'Claro que no',
    'Jamás',
    'Ni en sueños',
    'Imposible',
    'Definitivamente NO',
    'Mentira',
    'Nel',
    'Ni hablar'
];

function showRandomMessage() {
    messageCount++;
    const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

    const message = document.createElement('div');
    message.innerHTML = randomMessage;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--accent-color);
        color: white;
        padding: 1.2rem 2.5rem;
        border-radius: 30px;
        font-size: 1.3rem;
        font-weight: bold;
        box-shadow: 0 8px 30px var(--shadow-pink);
        z-index: 1000;
        animation: popUp 0.5s ease;
        max-width: 90vw;
        text-align: center;
        border: 3px solid var(--accent-light);
    `;

    document.body.appendChild(message);

    setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
        }, 500);
    }, 2500);
}

function changeButtonText() {
    if (Math.random() > 0.6) {
        const randomText = noTexts[Math.floor(Math.random() * noTexts.length)];
        noBtn.textContent = randomText;

        setTimeout(() => {
            noBtn.textContent = 'NO';
        }, 3000);
    }
}

function shakeButton() {
    noBtn.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 500);
}

function makeButtonSmaller() {
    if (Math.random() > 0.5) {
        noBtn.style.transform = 'scale(0.7)';
        setTimeout(() => {
            noBtn.style.transform = 'scale(1)';
        }, 1000);
    }
}

function changeButtonColor() {
    if (Math.random() > 0.5) {
        const colors = [
            'linear-gradient(135deg, #ff6b6b, #ee5a6f)',
            'linear-gradient(135deg, #f093fb, #f5576c)',
            'linear-gradient(135deg, #fa709a, #fee140)',
            'linear-gradient(135deg, #30cfd0, #330867)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        noBtn.style.background = randomColor;

        setTimeout(() => {
            noBtn.style.background = 'var(--secondary-gradient)';
        }, 2000);
    }
}

function moveButton() {
    if (isMoving) return;

    const buttonGroup = document.querySelector('.button-group');
    const groupWidth = buttonGroup.offsetWidth;
    const groupHeight = buttonGroup.offsetHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const margin = 10;
    const maxX = groupWidth - btnWidth - margin;
    const maxY = groupHeight - btnHeight - margin;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    noBtn.style.position = 'absolute';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.zIndex = '10';
    noBtn.classList.add('moving');

    const rotation = Math.random() * 20 - 10;
    noBtn.style.transform = `scale(0.85) rotate(${rotation}deg)`;

    isMoving = true;

    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
        noBtn.style.transform = 'scale(1) rotate(0deg)';
        noBtn.classList.remove('moving');
        isMoving = false;
    }, 300);
}

// Función para movimiento aleatorio continuo
function startRandomMovement() {
    const moveRandomly = () => {
        if (!isMoving) {
            moveButton();
        }

        // Siguiente movimiento en tiempo aleatorio (2-4 segundos)
        const nextMoveTime = Math.random() * 2000 + 2000; // 2000-4000ms
        randomMovementInterval = setTimeout(moveRandomly, nextMoveTime);
    };

    // Primer movimiento después de 3 segundos
    randomMovementInterval = setTimeout(moveRandomly, 3000);
}

// Función para detener el movimiento aleatorio (si es necesario)
function stopRandomMovement() {
    clearTimeout(randomMovementInterval);
}

// Función para mover el botón lejos del cursor
function moveButtonAwayFromCursor(cursorX, cursorY) {
    if (isMoving) return;

    const buttonGroup = document.querySelector('.button-group');
    const groupRect = buttonGroup.getBoundingClientRect();
    const groupWidth = buttonGroup.offsetWidth;
    const groupHeight = buttonGroup.offsetHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const margin = 20;
    const safeDistance = 120; // Distancia mínima del cursor
    const maxX = groupWidth - btnWidth - margin;
    const maxY = groupHeight - btnHeight - margin;

    // Calcular posición opuesta al cursor
    const cursorRelativeX = cursorX - groupRect.left;
    const cursorRelativeY = cursorY - groupRect.top;

    // Generar posiciones hasta encontrar una segura
    let attempts = 0;
    let newX, newY;
    let safePosition = false;

    while (!safePosition && attempts < 20) {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;

        const buttonCenterX = newX + btnWidth / 2;
        const buttonCenterY = newY + btnHeight / 2;

        const distance = Math.sqrt(
            Math.pow(cursorRelativeX - buttonCenterX, 2) +
            Math.pow(cursorRelativeY - buttonCenterY, 2)
        );

        if (distance >= safeDistance) {
            safePosition = true;
        }
        attempts++;
    }

    // Aplicar movimiento
    noBtn.style.position = 'absolute';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.zIndex = '10';
    noBtn.classList.add('moving');

    const rotation = Math.random() * 20 - 10;
    noBtn.style.transform = `scale(0.85) rotate(${rotation}deg)`;

    isMoving = true;

    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
        noBtn.style.transform = 'scale(1) rotate(0deg)';
        noBtn.classList.remove('moving');
        isMoving = false;
    }, 300);
}

// Función para seguir el cursor
function followCursor(e) {
    const now = Date.now();

    // Throttle para evitar movimiento excesivo
    if (now - lastCursorMoveTime < 100) return;

    lastCursorMoveTime = now;

    const cursorX = e.clientX;
    const cursorY = e.clientY;

    const buttonRect = noBtn.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    const distance = Math.sqrt(
        Math.pow(cursorX - buttonCenterX, 2) +
        Math.pow(cursorY - buttonCenterY, 2)
    );

    // Si el cursor está cerca, moverse
    if (distance < 150) {
        moveButtonAwayFromCursor(cursorX, cursorY);

        // Movimiento continuo cuando está cerca
        clearTimeout(cursorTimeout);
        cursorTimeout = setTimeout(() => {
            followCursor({ clientX: cursorX, clientY: cursorY });
        }, 400);
    }
}

// Efectos especiales aleatorios
function randomEffect() {
    const effects = ['message', 'text', 'shake', 'smaller', 'color'];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];

    switch (randomEffect) {
        case 'message':
            showRandomMessage();
            break;
        case 'text':
            changeButtonText();
            break;
        case 'shake':
            shakeButton();
            break;
        case 'smaller':
            makeButtonSmaller();
            break;
        case 'color':
            changeButtonColor();
            break;
    }
}

// Event Listeners
noBtn.addEventListener('mouseover', function() {
    moveButton();
    if (Math.random() > 0.7) {
        randomEffect();
    }
});

// Seguimiento del cursor
document.addEventListener('mousemove', followCursor);

// Seguimiento del touch para móviles
document.addEventListener('touchmove', function(e) {
    if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        followCursor({ clientX: touch.clientX, clientY: touch.clientY });
    }
}, { passive: true });

noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    moveButton();
    showRandomMessage();

    // Si el touch está muy cerca, movimiento inmediato
    if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        const buttonRect = noBtn.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;

        const distance = Math.sqrt(
            Math.pow(touch.clientX - buttonCenterX, 2) +
            Math.pow(touch.clientY - buttonCenterY, 2)
        );

        if (distance < 100) {
            moveButtonAwayFromCursor(touch.clientX, touch.clientY);
        }
    }
});

noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    showRandomMessage();
    moveButton();
    shakeButton();

    // Múltiples efectos aleatorios
    setTimeout(() => randomEffect(), 200);
    setTimeout(() => randomEffect(), 500);

    // Mensaje especial después de muchos intentos
    if (messageCount >= 3) {
        setTimeout(() => {
            const specialMessage = document.createElement('div');
            specialMessage.innerHTML = 'Okay, último intento... 🥺💔';
            specialMessage.style.cssText = `
                position: fixed;
                top: 40%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 1.5rem 3rem;
                border-radius: 35px;
                font-size: 1.4rem;
                font-weight: bold;
                box-shadow: 0 10px 40px rgba(102, 126, 234, 0.6);
                z-index: 1000;
                animation: popUp 0.5s ease;
                border: 4px solid #ffd4e5;
            `;
            document.body.appendChild(specialMessage);

            setTimeout(() => {
                specialMessage.style.animation = 'fadeOut 0.5s ease';
                setTimeout(() => {
                    if (document.body.contains(specialMessage)) {
                        document.body.removeChild(specialMessage);
                    }
                }, 500);
            }, 3000);
        }, 1000);
    }
});

// Animaciones CSS
if (!document.querySelector('#message-animations')) {
    const style = document.createElement('style');
    style.id = 'message-animations';
    style.textContent = `
        @keyframes popUp {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        @keyframes fadeOut {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.9); }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}

// Iniciar movimiento aleatorio continuo cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        startRandomMovement();
    }, 1000);
});