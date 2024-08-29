import fetchPopulares from "./fetchPopulares";
import cargarTitulos from "./cargarTitulos";
import cargarGeneros from "./cargarGenero";
import './listenerFiltroTipo'

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