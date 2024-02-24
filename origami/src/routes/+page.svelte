
<script lang='ts'>

	window.onSignOn = function(googleUser) {
	var profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	return true;
  }
  
  </script>
<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	
	<p>Hello world</p>
	<p>verify page</p>
	<div class="g-signin2" data-onsuccess="onSignOn"></div>
</section>

