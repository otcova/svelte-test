<script lang="ts">
	let count = 3;
</script>

<button on:click={() => ++count}>+1</button>
<div id="count">{count}</div>
<button on:click={() => --count}>-1</button>

<style>
	#count {
		font-size: 30px;
	}
</style>
