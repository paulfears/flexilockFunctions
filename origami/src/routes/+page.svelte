
<script lang='ts'>
	import { browser } from '$app/environment';
	if(browser){
		window.handleCredentialResponse = function(googleUser) {
			var profile = googleUser.getBasicProfile();
			console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
			console.log('Name: ' + profile.getName());
			console.log('Image URL: ' + profile.getImageUrl());
			console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
			return true;
		}
	}
  
  </script>
<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	
	<p>Hello world</p>
	<p>verify page</p>
	<div id="g_id_onload"
	data-client_id="770617905390-pte5busfebd6fhbcavhqojep7tsn5ojr.apps.googleusercontent.com"
	data-callback="handleCredentialResponse">
	</div>
	<div class="g_id_signin" data-type="standard"></div>
</section>

