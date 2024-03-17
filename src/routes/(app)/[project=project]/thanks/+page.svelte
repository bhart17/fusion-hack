<script lang="ts">
	export let data;
</script>

<div class="flex flex-col p-4 gap-4 text-center">
	<h1 class="text-5xl font-bold text-success">Thank you!</h1>
	<h2 class="text-2xl">
		Please email <a href={`mailto:${data.email}`} class="link">{data.email}</a> to organise delivery
		of the donation
	</h2>
	<a href="/home" class="btn">Go Home</a>
</div>
