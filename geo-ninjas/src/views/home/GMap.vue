<template>
	<div class="map">
		<div class="google-map" id="map"></div>
	</div>
</template>

<script>
import { getAuth } from "firebase/auth";
import db from '@/firebase/init'
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

export default {
	name: 'GMap',
	components: {},
	data() {
		return {
			lat: 53,
			lng: -2,
		}
	},
	methods: {
		renderMap() {
			const map = new google.maps.Map(document.getElementById('map'), {
				center: { lat: this.lat, lng: this.lng },
				zoom: 6,
				maxZoom: 15,
				minZoom: 3,
				streetViewControl: false,
			});
		}
	},
	mounted() {
		// get current user
		const auth = getAuth();
		let user = auth.currentUser;

		// get user geoloation
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(pos => {
				this.lat = pos.coords.latitude;
				this.lng = pos.coords.longitude;

				// find the user record and then update geocoords
				const q = query(collection(db, "users"), where("user_id", "==", user.uid));
				getDocs(q).then(snapshot => {
					snapshot.forEach((document) => {
						const docRef = doc(db, "users", document.id);

						updateDoc(docRef, {
							geolocation: {
								lat: this.lat,
								lng: this.lng
							}
						});
					});
				}).then(() => {
					this.renderMap();
				});
			}, (err) => {
				console.log(err);
				this.renderMap();
			}, { maximumAge: 60000, timeout: 3000 })
		} else {
			// position centre by default value
			this.renderMap()
		}
	}
}
</script>

<style>
.google-map {
	width: 100%;
	height: 100%;
	margin: 0 auto;
	background: #fff;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
}
</style>