<script lang="ts">
	export let data;
</script>

<div class="justify-center flex" style="margin-top:20px;">
	<div class="card card-compact w-3/6 bg-base-100 shadow-xl">
		<figure>
			<img src={data.image} alt="User photo" />
		</figure>
		<div class="card-body">
			<div class="avatar">
				<div class="w-16 rounded-full">
					<!-- <img src={data.avatar} /> -->
				</div>
			</div>
			<p>Glen Chaplin, UK, posted on 16/03/2024 at 2:44am</p>
			<h2 class="card-title text-4xl">{data.title}</h2>
			<p class="text-xl">{data.description}</p>
		</div>
	</div>
</div>

<p class="text-base justify-center flex" style="margin-top:20px;">
	Supplies needed / already received
</p>
<div class="justify-center flex">
	<div class="card w-3/6 bg-base-100 shadow-xl">
		<div class="card-body text-xl">
			<p>☐ Thread</p>
			<br />
			<p>🗹 Silk</p>
		</div>
	</div>
</div>

<p class="text-base justify-center flex" style="margin-top:20px;">Feed</p>
<div class="justify-center flex">
	<div
		class="w-3/6 h-96 carousel carousel-vertical bg-base-100 rounded-box shadow-xl"
		style="margin-bottom:20px;"
	>
		<div class="carousel-item h-96" style="margin-left:30px; margin-right:30px;">
			&nbsp<br />
			25/3/2024 2:44am
			<br />
			&nbsp<br />
			Thank you for your support! I have obtained all the materials i need for my dress.
		</div>
		<div class="carousel-item h-full" style="margin-left:30px; margin-right:30px;">
			&nbsp<br />
			25/3/2024 2:44am
			<br />
			&nbsp<br />
			I NEED HELP
		</div>
		<div class="carousel-item h-full" style="margin-left:30px; margin-right:30px;">
			&nbsp<br />
			24/3/2024 2:44am
			<br />
			&nbsp<br />
			I need one more roll of silk!
		</div>
		<div class="carousel-item h-full" style="margin-left:30px; margin-right:30px;">
			&nbsp<br />
			23/3/2024 2:44am
			<br />
			&nbsp<br />
			I need some more red velvet!
		</div>
		<div class="carousel-item h-full" style="margin-left:30px; margin-right:30px;">
			&nbsp<br />
			22/3/2024 2:44am
			<br />
			&nbsp<br />
			I need some string!
		</div>
		<div class="carousel-item h-full" style="margin-left:30px; margin-right:30px;">
			&nbsp<br />
			21/3/2024 2:44am
			<br />
			&nbsp<br />
			Please provide me some apples.
		</div>
		<div class="carousel-item h-full" style="margin-left:30px; margin-right:30px;">
			&nbsp<br />
			17/3/2024 2:44am
			<br />
			&nbsp<br />
			I need SILK
		</div>
		<div class="carousel-item h-full" style="margin-left:30px; margin-right:30px;">
			&nbsp<br />
			16/3/2024 2:44am
			<br />
			&nbsp<br />
			Testing
		</div>
	</div>
</div>
