function bt_gmap_init( map_id, zoom, primary_color, secondary_color, water_color, custom_style ) {

	var myLatLng = new google.maps.LatLng( 0, 0 );
	var mapOptions = {
		zoom: zoom,
		center: myLatLng,
		scrollwheel: false,
		scaleControl:true,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		streetViewControl: true,
		mapTypeControl: true
	}
	var map = new google.maps.Map( document.getElementById( map_id ), mapOptions );

	if ( ( primary_color != '' && secondary_color != '' && water_color != '' ) || custom_style != '' ) {
		
		var style_array = [
			{
				featureType: "all",
				stylers: [
					{ hue: primary_color },  
					{ saturation: 100 }
				]
			},{
				featureType: "road",
				elementType: "geometry",
				stylers: [
					{ hue: secondary_color },
					{ saturation: 0 }
				]
			},{
				featureType: "water",
				elementType: 'all',
				stylers: [
					{ color: water_color },
					{ saturation: 0 }
				]
			},{
				featureType: "poi.business",
				elementType: "labels",
				stylers: [
					{ visibility: "off" }
				]
			}
		];
		
		if ( custom_style != '' ) {
			style_array = JSON.parse( atob( custom_style ) );
		}
		
		var customMapType = new google.maps.StyledMapType( style_array, {
			name: 'Custom Style'
		});

		var customMapTypeId = 'custom_style';
		map.mapTypes.set( customMapTypeId, customMapType );
		map.setMapTypeId( customMapTypeId );
	}

	var n = 0;
	
	var locations = jQuery( '#' + map_id ).parent().find( '.btGoogleMapsLocation' );
	
	locations.each(function() {
		
		var lat = jQuery( this ).data( 'lat' );
		var lng = jQuery( this ).data( 'lng' );
		var icon = jQuery( this ).data( 'icon' );

		var myLatLng = new google.maps.LatLng( lat, lng );
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			icon: icon,
			count: n
		});
		
		if ( n == 0 ) {
			map.setCenter( myLatLng );
		}
		
		locations.eq( 0 ).addClass( 'btGoogleMapsLocationShow' );
		
		marker.addListener( 'click', function() {
			//map.setZoom( zoom );
			//map.setCenter( marker.getPosition() );
			
			locations.removeClass( 'btGoogleMapsLocationShow' );
			locations.eq( this.count ).addClass( 'btGoogleMapsLocationShow' );
		});
		
		n++;
	});
	
}