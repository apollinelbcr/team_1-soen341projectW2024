<script lang="ts">
    import { onMount } from 'svelte';


//this function, will let the user signin only if the input are filled.
    function enableButton(event: Event) {
        console.log('enableButton called');

        event.preventDefault()
        var formsignin = document.getElementById("signin-form") as HTMLFormElement;
        var email = document.getElementById("email") as HTMLInputElement;
        var password = document.getElementById("password") as HTMLInputElement;
        var button = document.getElementById("button") as HTMLButtonElement;

        if(formsignin && email.value.trim() !== '' && password.value.trim() !== '') {
            console.log("reset");
            formsignin.reset();
            window.location.href = '/Account';
        }
        else {
           alert("There's at least one field missing an input. Please Try again");
           formsignin.reset();
        }
    }





</script>
<main>
    <section class="bg-gray-50">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                <img class="w-8 h-8 mr-2" src="" alt="logo">
                RENTify
            </a>
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Sign in to your account
                    </h1>
                    <form id="signin-form" class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input type="email" name="email" id="email" placeholder="name@company.com"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" >
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300">
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500">Remember me</label>
                                </div>
                            </div>
                            <a href="/" class="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                        </div>
                        <button type="submit" on:click={enableButton} class="w-full text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                           <a href="/Account">Sign In</a>
                        </button>
                        <p class="text-sm font-light text-gray-500">
                            Don’t have an account yet?
                            <a href="/" class="font-medium text-primary-600 hover:underline" id="signin-button">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>

</main>