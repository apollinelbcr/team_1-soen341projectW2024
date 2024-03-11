<script>
	let user_email = '';
    let name_user = '';
    let user_phone = '';
    let user_password = '';
    let user_password2 = '';
   

</script>



<div class="  pt-24 w-full h-screen pb-8 bg-white flex justify-center">

<div class="my-2 px-4 w-1/3 pt-4 rounded-3xl flex-column border border-orange-700">
<h3 class="text-orange-700 text-3xl py-3 pl-2 ">Create a Rentify account</h3>

    <h2 class="text text-xl pt-4 pl-2">Enter your name_user</h2>
    <div class="text text-xl py-3 pl-2 h-12 border border-grey-800 rounded-2xl">
    <input bind:value={name_user} placeholder="Alex Smith" />
    </div>

    
    <h2 class="text text-xl  pt-4 pl-2">Enter your user_email (username)</h2>
    <div class="text text-xl py-3 pl-2 h-12 border border-grey-800 rounded-2xl">
    <input bind:value={user_email} placeholder="ex: user@gmail.com" />
    </div>
    
    <h2 class="text text-xl pt-4 pl-2">Enter Phone# </h2>
    <div class="text text-xl py-3 pl-2 h-12 border border-grey-800 rounded-2xl">
    <input bind:value={user_phone} placeholder="ex: 012 345 6789" />
    </div>

    <h2 class="text text-xl  pt-4 pl-2">Choose a user_password</h2>
    <div class="text text-xl py-3 pl-2 h-12 border border-grey-800 rounded-2xl">
    <input bind:value={user_password} placeholder="ex: user1234" />
    </div>
    
    <h2 class="text text-xl  pt-4 pl-2">Retype user_password</h2>
    <div class="text text-xl py-3 pl-2 h-12 border border-grey-800 rounded-2xl">
    <input bind:value={user_password2} placeholder="ex: admin" />
    </div>
    <div class="text text-xl  pt-4 pl-2 ">
    </div>
    <div class="text text-xl p-2 h-12 space-x-4 flex flex-row justify-center">

{#if user_password==='' || user_password2===''|| user_email===''||  name_user===''|| user_phone===''}
  <h2 class="text text-xl text-orange-700 pl-2">Make sure to fill all the fields</h2>
{:else if user_password==user_password2 && user_password!==''  && user_email!==''&& name_user!==''&& user_phone!==''}
<a href="/SignUp/Success" class="p-2 px-3 h-12 text-xl text-white justify-right bg-orange-700 rounded-2xl">SignUp</a>
{:else}

{/if}
    
    <a href="/login" class=" px-3 h-12 text-xl  justify-right rounded-2xl">Already have an account?</a>
      </div>
        <slot/>
    </div>

</div>