<script>
	let username = '';
    let password = '';
</script>

<div class="my-4 p-4 pt-40 w-full h-screen rounded-3xl bg-white flex justify-center">

<div class="my-2 px-4 w-1/3 h-80 pt-2 rounded-3xl flex-column border border-orange-700">
    <h3 class="text-orange-700 text-3xl py-3 pl-2 ">Sign In to Rentify</h3>
    <h2 class="text text-xl pl-2">Username</h2>
    <div class="text text-xl py-3 pl-2 h-12 border border-grey-800 rounded-2xl">
    <input bind:value={username} placeholder="ex: admin@gmail.com" />
    </div>
    <h2 class="text text-xl pt-3 pl-2">Password</h2>
    <div class="text text-xl py-3 pl-2 h-12 border border-grey-800 rounded-2xl">
    <input bind:value={password} placeholder="ex: admin" />
    </div>
    <div class="text text-xl py-3 pl-2 h-6">
    </div>
    <div class="text text-xl h-12 space-x-4 flex flex-row justify-center">
    <a href="/enter" class="p-2 px-3 h-11 text-xl text-white justify-right bg-orange-700 rounded-2xl">Enter</a>
    <a href="/SignUp" class="p-2 px-3 h-12 text-xl  justify-right rounded-2xl">No account ?  Sign Up</a>
      </div>
    
        <slot/>
    </div>

</div>
