// Obtiene todos los botones de la calculadora
let boton = document.getElementsByClassName('btn');

// Obtiene la pantalla de la calculadora
let pantalla = document.getElementById('display');

// Muestra el historial de operaciones
let save = document.getElementById('saveNumber');

// Almacena el resultado acumulado
let num1 = null;

// Almacena el operador actual (+, -, *, /)
let operador = null;

// Indica si el último valor mostrado es un resultado
let resultadoMostrado = false;

// Procesa cuando se pulsa un operador
function procesarOperador(op)
{
    // Si la pantalla está vacía, no hacemos nada
    if (pantalla.value === '')
        return;

    // Si es la primera operación
    if (num1 === null)
    {
        num1 = Number(pantalla.value);
    }
    // Si ya hay una operación pendiente
    else if (operador !== null)
    {
        let num2 = Number(pantalla.value);

        num1 = calcular(num1, operador, num2);

        if (num1 === 'ERROR')
        {
            pantalla.value = 'ERROR';

            num1 = null;
            operador = null;

            return;
        }
    }

    // Guarda el nuevo operador
    operador = op;

    // Actualiza el historial
    save.innerText += pantalla.value + op;

    // Limpia la pantalla para escribir el siguiente número
    pantalla.value = '';

    resultadoMostrado = false;
}

// Realiza la operación matemática
function calcular(a, op, b)
{
    switch (op)
    {
        case '+':
            return a + b;

        case '-':
            return a - b;

        case '*':
            return a * b;

        case '/':
            // Evita divisiones entre cero
            if (b === 0)
                return 'ERROR';

            return a / b;

        default:
            return 'ERROR';
    }
}

// Recorre todos los botones
for (const btn of boton)
{
    btn.addEventListener('click', function ()
    {
        switch (btn.textContent)
        {
            case 'DEL':

                // Borra el último carácter
                pantalla.value = pantalla.value.slice(0, -1);

                break;

            case '+':
                procesarOperador('+');
                break;

            case '-':
                procesarOperador('-');
                break;

            case '*':
                procesarOperador('*');
                break;

            case '/':
                procesarOperador('/');
                break;

            case '=':

                // Solo calcula si existe una operación pendiente
                if (num1 !== null && operador !== null)
                {
                    let num2 = Number(pantalla.value);

                    let resultado = calcular(
                        num1,
                        operador,
                        num2
                    );

                    save.innerText = '';

                    pantalla.value = resultado;

                    if (resultado === 'ERROR')
                    {
                        num1 = null;
                        operador = null;
                    }
                    else
                    {
                        // Permite seguir operando con el resultado
                        num1 = resultado;
                        operador = null;
                    }

                    resultadoMostrado = true;
                }

                break;

            case 'RESET':

                // Reinicia toda la calculadora
                pantalla.value = '';
                save.innerText = '';

                num1 = null;
                operador = null;

                resultadoMostrado = false;

                break;

            default:

                // Si acabamos de mostrar un resultado,
                // comenzamos un nuevo número
                if (resultadoMostrado)
                {
                    pantalla.value = btn.textContent;
                    resultadoMostrado = false;
                }
                else
                {
                    pantalla.value += btn.textContent;
                }

                break;
        }
    });
}
/*
esta forma es válida
for(let i = 0; i < boton.length; i++)
{
    //Asignamos un eventListener a cada boton de la lista
    boton[i].addEventListener('click', () => {
        alert(boton[i].innerHTML);
    });
}
*/

