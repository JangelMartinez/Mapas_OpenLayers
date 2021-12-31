const container = document.getElementById("popup");
const content = document.getElementById("popup-content");
const content_element = document.getElementById("popup-content");

const peninsula =  [-46567633743.97475,	4831126.632460929];
const canarias = [-46568984234.42521, 3298758.833347031];
function centrar(componente){
	const lugar = componente.name;
	
	if (lugar == 'canarias'){
		myview.animate({
			center: canarias,
			duration: 2000,
			zoom: 7.5
		});
	}
	if (lugar == 'peninsula'){
		myview.animate({
			center: peninsula,
			duration: 2000,
			zoom: 5.5
		});
	}
}


const myview = new ol.View({
	center: [
		-46567633743.97475,
		4831126.632460929
	],
	zoom: 5.5
  });

const mylayer = new ol.layer.Tile({
	source: new ol.source.OSM()
  });

const layer = [mylayer];

const map = new ol.Map({
	target: 'map',
	layers: layer,
	view: myview
});

/* var mygeojson = new ol.layer.Vector(
	{
		source: new ol.source.Vector({
			format: new ol.format.GeoJSON(),
			url: 'ccaa.geojson'
		})
	}
); */

const styleespanya = ({A}) => {
	const {value} = A;
	let color;

	if(value < 1000){
		
		color = 'white';

	}else if(value < 1250){
		
		color = '#57f7f7';

	}else if(value < 1500){
		
		color = '#57e7f7';

	}else if(value < 1750){
		
		color = '#57c2f7';

	}else if(value < 2000){
		
		color = '#579cf7';

	}else if(value >= 2000){
		
		color = 'blue';

	}
	//console.log(A);

	const miestilo = new ol.style.Style({
		//geometry: A.geometry.Cl,
		fill: new ol.style.Fill({
			color: color
		})
	});

	return miestilo;

}

var mygeojson = new ol.source.Vector(
	{
		format: new ol.format.GeoJSON(),
		url: 'ccaa.geojson'
	}
);

const espanya = new ol.layer.Vector({
	source: mygeojson,
	//style: styleespanya
});

const espanyastilo = new ol.layer.Vector({
	source: mygeojson,
	style: styleespanya,
})

map.addLayer(espanyastilo);
map.addLayer(espanya);

map.on("pointermove", (event) =>{
	//console.log('Evento: ',event.map.$e);
	const feature = map.forEachFeatureAtPixel(event.pixel,  (feature) => {return feature;} );
	//console.log('feature: ', feature);
	if (feature){

		const coor = map.getCoordinateFromPixel(event.pixel);
		//console.log('coordenadas: ', coor);
		const {name, value} = feature.A;

		const datos = '<h6>'+ name+'</h6>' + '<b>valor:</b> '+ value;
		content_element.innerHTML=datos;
		overlaydet.setPosition(coor);
		
	}else{
		overlaydet.setPosition(undefined);
	}

}); 


var overlaydet = new ol.Overlay({
	element: container,
	offset: [0,-10]
})


map.addOverlay(overlaydet);
