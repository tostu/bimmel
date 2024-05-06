import type { Actions } from './$types';

import { HA_WEBHOOK_ID, HA_WEBHOOK_URL } from '$env/static/private';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		console.log(data);
		const latitude = data.get('latitude');
		const longitude = data.get('longitude');

		console.log(latitude);
		console.log(longitude);
		console.log(getBorderPoints(latitude, longitude, 2, 4));

		const res = await fetch(`${HA_WEBHOOK_URL}/${HA_WEBHOOK_ID}`, {
			method: 'POST'
		});
		if (res.ok) {
			return { success: true };
		} else {
			return { success: false };
		}
	}
} satisfies Actions;

function getBorderPoints(latitude, longitude, radiusInKm, numberOfPoints) {
	const points = [];
	const earthRadius = 6371; // Radius of the Earth in kilometers

	const radians = (angle) => angle * (Math.PI / 180);

	for (let i = 0; i < numberOfPoints; i++) {
		const angle = (360 / numberOfPoints) * i;
		const theta = radians(angle);

		const x = longitude + (radiusInKm / earthRadius) * Math.cos(theta);
		const y = latitude + (radiusInKm / earthRadius) * Math.sin(theta);

		points.push({ latitude: y, longitude: x });
	}

	return points;
}
