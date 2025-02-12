function Seguro (marca, year, tipo) {
    this.marca = marca;
    this.year = year;   
    this.tipo = tipo;
}
//realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function(){

    let cantidad;
    const base = 3000;
    

    switch(this.marca){
        case '1': cantidad = base * 1.15;
        break;
        case '2': cantidad = base * 1.05;
        break;
        case '3': cantidad = base * 1.35;
        default: break;
        }
        //leer el año
        const diferencia = new Date().getFullYear() - this.year;

        cantidad -= ((diferencia * 3) * cantidad) / 100;

        if(this.tipo == 'basico'){
            cantidad *= 1.30;
        } else {
            cantidad *= 1.50;
        }
        return cantidad
}

function UI() {}

//muestra opciones de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
    min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
};

//mostrar alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');
    if(tipo == 'error'){
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //Insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'))


    const resultado = document.querySelectorAll('#resultado div');
    console.log(resultado);

    //Limpiar el resultado anterior
    if (resultado.length != '') {
        for(let i=0; i<resultado.length;i++){
        console.log(resultado[i]);
    
            resultado[i].remove(resultado[i]);
        }
    }

    setTimeout(() => {
        div.remove();
     }, 3000);
} 



UI.prototype.mostrarResultado = (total, seguro) => { 
    //crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
    <p class="header">Tu Resumen</p>
        <p class="header">total: ${total}</p>
    `;
    const resultadoDiv = document.querySelector('#resultado');
    resultadoDiv.appendChild(div);

    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    setTimeout(() => {
            spinner.style.display = 'none';
    } , 3000);
  } 

// Instanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {

    ui.llenarOpciones();
});

addEventListeners();
function addEventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    const marca = document.querySelector('#marca').value
    const year = document.querySelector('#year').value
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    } else {
        ui.mostrarMensaje('Cotizando...', 'exito');
    }

    //instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();
  

    //utilizar el prototype que va a cotizar
    ui.mostrarResultado(total, seguro);

}






