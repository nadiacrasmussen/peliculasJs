'use strict';

const obtenerGenero = (id, generos) => {
	let genero;

	generos.forEach((elemento) => {
		if (id === elemento.id) {
			genero = elemento.name;
		}
	});

	return genero;
};

const fetchGeneros = async (filtro = 'movie') => {
	const tipo = filtro === 'movie' ? 'movie' : 'tv';
	const url = `https://api.themoviedb.org/3/genre/${tipo}/list?api_key=b07dda1337fcfe0e08af7d3d2597908c&language=es-MX`;

	try {
		const resultados = await fetch(url);
		const datos = await resultados.json();
		return datos.genres;
	} catch (e) {
/* 		console.log(e);
 */	}
};

/**
 * Funcion que se encarga de hacer fetch para obtener las peliculas o series populares.
 * @param {String} filtro Si queremos cargar 'peliculas' o 'series'.
 */
const fetchPopulares = async (filtro = 'movie', pagina = 1) => {
	const tipo = filtro === 'movie' ? 'movie' : 'tv';
	const url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=b07dda1337fcfe0e08af7d3d2597908c&language=es-MX&region=US&page=${pagina}`;
	const generos = await fetchGeneros(tipo);

	try {
		const respuesta = await fetch(url);
		const datos = await respuesta.json();
		const resultados = datos.results;

		// Obtenemos el genero de cada resultado y lo agregamos al objeto de resultados.
		resultados.forEach((resultado) => {
			resultado.genero = obtenerGenero(resultado.genre_ids[0], generos);
		});

		return resultados;
	} catch (e) {
/* 		console.log(e);
 */	}
};

const cargarTitulos = (resultados) => {
    const contenedor = document.querySelector('#popular, .main__grid');
   
    resultados.forEach((resultado) => {
        const plantilla =
            `<div class="main__media">
         <a href="#" class="main__media-thumb">
             <img class="main__media-img" src="https://image.tmdb.org/t/p/w500/${resultado.poster_path}" alt="" />
        </a>
        <p class="main__media-titulo">${resultado.title}</p>
        <p class="main__media-fecha">${resultado.genero}</p>
    </div>`;
/* console.log(resultado) */
        contenedor.insertAdjacentHTML('beforeend', plantilla);
    });

};

const contenedorGeneros = document.getElementById('filtro-generos');

const cargarGeneros = async (filtro) => {
    contenedorGeneros.innerHTML = '';
    
    const generos = await fetchGeneros(filtro);
    generos.forEach((genero) => {
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.innerText = genero.name;
        btn.setAttribute('data-id', genero.id);
        contenedorGeneros.appendChild(btn);
    });
};

const filtroPelicula = document.getElementById('movie');
const filtroShow = document.getElementById('tv');

filtroPelicula.addEventListener('click', (e) => {
    e.preventDefault();

});
filtroShow.addEventListener('click', (e) => {
    e.preventDefault();
    
    cargarGeneros();
});

const cargar = async() => {
	// Obtenemos los resultados.
	const resultados = await fetchPopulares('movie');

	if (resultados) {
		// Los cargamos en el DOM.
		cargarTitulos(resultados);
		cargarGeneros();
	}
};
cargar();
//# sourceMappingURL=bundle.js.map
