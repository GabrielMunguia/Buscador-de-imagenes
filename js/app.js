const resultado= document.querySelector('#resultado');
const formulario=document.querySelector('#formulario');
const registroPorPagina=30;

const paginacion=document.querySelector("#paginacion")
let totalPaginas=0;
let iterador;
let paginaActual=1;
window.onload=()=>{
    formulario.addEventListener('submit',validadFormulario);
}

function validadFormulario (e){
    e.preventDefault();
    const terminoBusqueda=document.querySelector('#termino').value;
    if(terminoBusqueda==='' || terminoBusqueda===' '){
        mostrarAlerta('Agrega un campo de busqueda');
        return;
    }

    buscarImagenes();
}

function mostrarAlerta(mensaje){
    const existeAlerta= document.querySelector('.bg-red-100');
    if(!existeAlerta){
        const alerta=document.createElement('p');
        alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-lg','mx-auto','mt-6','text-center');

         alerta.innerHTML= `
            <strong class='block font-bold'>Error!</strong>
            <span class='block sm:inline'>${mensaje}</span>
         `;
         formulario.appendChild(alerta);
         setTimeout(()=>{
            alerta.remove();
         },3000)

    }
}

function  buscarImagenes(){
    const termino=document.querySelector('#termino').value;
    const key='21634894-5f455d7841d9eda4cbba19508'
    const url=`https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registroPorPagina}&page=${paginaActual}`;
 
    
    fetch(url)
         .then (respuesta=>respuesta.json())
         .then((resultado)=>{
             const spinner=  agregarSpinner();
             formulario.appendChild(spinner)
           
             totalPaginas=calcularPaginas(resultado.totalHits)
           
             mostrarImagenes(resultado.hits);
             spinner.remove();
             
         })


};

// crear generador que va a registrar la cantidad de lementos de acuerdo a las paginas

function *crearPaginador(total){
    for(let i=1;i<=total;i++){
        yield i;
        
    }
}
function calcularPaginas(total){

    return  parseInt(Math.ceil(total/registroPorPagina));
}
function  mostrarImagenes(imagenes){
    
    
   
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

   

    imagenes.forEach(imagen => {
    
        const {previewURL,views,largeImageURL,likes}=imagen;   
       
     
        resultado.innerHTML+=`

         <div class='w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4'>
         <div class='bg-white'>
         <img class='w-full'src="${previewURL}">
         <div class='p-4'>
            <p class='font-bold'>   ${likes} <span class='font-light'> Me gusta</span></p>
            <a href="${largeImageURL}" target="_blank" rel="noopener noreferrer" class='w-full bg-blue-800 hover:bg-500 text-white uppercase font-bold text-center mt-5 rounded p-1 block'>
               Ver Imagen
            </a>
         </div>           
      </div>
         
         </div>
          
        `     
    });

    while(paginacion.firstChild){
        paginacion.removeChild(paginacion.firstChild);
    }
    imprimirPaginador();

}

function imprimirPaginador(){
    iterador= crearPaginador(totalPaginas);
   
    while(true){
        const {value,done}=iterador.next();
        if(done){
            return;
        }

        const boton=document.createElement('a');
        boton.href='#';
        boton.dataset.pagina=value;
        boton.textContent= value;
        boton.classList.add('siguiente','px-4','py-1','mr-2','mb-4','font-bold','uppercase','rounded',)
        boton.onclick=()=>{
            paginaActual=value;
            buscarImagenes();
        }
        if(value==paginaActual){
            boton.classList.remove('bg-yellow-400')
            boton.classList.add('bg-yellow-700')
        }else{
            boton.classList.remove('bg-yellow-700')
            boton.classList.add('bg-yellow-400')

        }
        paginacion.appendChild(boton);

    }
    
}

function agregarSpinner(){
    const spinner=document.createElement('div');

    spinner.innerHTML=` 
    <div class="sk-fading-circle">
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  </div>
    
    `;

    return spinner;



}