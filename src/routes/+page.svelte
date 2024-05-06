<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { error } from '@sveltejs/kit';
	export let data: PageData;
	export let form: ActionData;

	// eslint-disable-next-line no-undef
	function getCurrentPosition(): Promise<GeolocationPosition> {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(position) => resolve(position),
				(error) => reject(error)
			);
		});
	}
</script>

<form
	method="POST"
	use:enhance={async ({ formData, cancel }) => {
		try {
			const position = await getCurrentPosition();
			formData.append('latitude', position.coords.latitude.toString());
			formData.append('longitude', position.coords.longitude.toString());
		} catch (e) {
			console.error(e);
			cancel();
		}

		return async () => {};
	}}
>
	<button>test</button>
</form>

{#if form?.success}
	<!-- this message is ephemeral; it exists because the page was rendered in
		   response to a form submission. it will vanish if the user reloads -->
	<p>Successfully logged in! Welcome back, {data}</p>
{/if}
