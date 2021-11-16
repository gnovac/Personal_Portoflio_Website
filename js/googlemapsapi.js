/*------------------------------------------
    Javascript for initialize Google Maps
--------------------------------------------*/
let map;

function initMap() {
    let uluru = {
        lat: 50.06465009999999,
        lng: 19.94497990000002
    };
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru
    });
    let marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}
