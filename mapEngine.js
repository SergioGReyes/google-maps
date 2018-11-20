function randomIntFromInterval(min, max) // min and max included
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const mapDOMElement = document.getElementById('theMap')
window.chosenLocation = null

function startMap() {
    function paintMap(coordinates) {
        map = new google.maps.Map(
            mapDOMElement, {
                zoom: 10,
                center: new google.maps.LatLng(coordinates)
            }
        );

        //marker creation and instantiation in the ajax requested location
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng({ lat: randomIntFromInterval(-90, 90), lng: randomIntFromInterval(-180, 180) }),
            map: map,
            title: "Fuenla, ciudad sin ley"
        });

        //sets and listener so we can move the marker to the chosen coordinates
        map.addListener("click", function (e) {
            window.chosenLocation = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            }
            marker.setPosition(chosenLocation);
        })

        //remember, you can loop and create new markers, and add them to the map
        // for (var i = 0; i < 100; i++) {
        // const myMarker = new google.maps.Marker({
        //     position: new google.maps.LatLng({lat: randomIntFromInterval(-90, 90), lng: randomIntFromInterval(-180, 180)}),
        //     map: map,
        //     title: "Fuenla, ciudad sin ley"
        // });
        // }

        //runtime addition of markers
        // setInterval(function () {
        //     new google.maps.Marker({
        //         position: new google.maps.LatLng({lat: randomIntFromInterval(-90, 90), lng: randomIntFromInterval(-180, 180)}),
        //         map: map,
        //         title: "Fuenla, ciudad sin ley"
        //     });
        // }, 1500)
    }

    axios.get("http://127.0.0.1:8080/coordinates.json")
        .then((coordinates) => {
            paintMap(coordinates.data)
        })


    // const directionsService = new google.maps.DirectionsService;
    // const directionsDisplay = new google.maps.DirectionsRenderer;

    // const directionRequest = {
    // 	origin: {
    // 		lat: 41.3977381,
    // 		lng: 2.190471916
    // 	},
    // 	destination: 'Madrid, ES',
    // 	travelMode: 'DRIVING'
    // };


    // directionsService.route(
    // 	directionRequest,
    // 	function (response, status) {
    // 		if (status === 'OK') {
    // 			// everything is ok
    // 			directionsDisplay.setDirections(response);

    // 		} else {
    // 			// something went wrong
    // 			window.alert('Directions request failed due to ' + status);
    // 		}
    // 	}
    // );

    // directionsDisplay.setMap(map);
}

startMap();