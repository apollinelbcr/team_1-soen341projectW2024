<script>

    import Swal from "sweetalert2";
    //import Cookies from 'js-cookie'; //using js cookies

    // function setUserCookies(user) {
    // Cookies.set('user', JSON.stringify(user), { expires: 7 }); // Store user data as a cookie for 7 days (adjust as needed)
    // }

    // Function to retrieve user information from cookies
    // @ts-ignore
    // function getUserFromCookies() {
    //     const userCookie = Cookies.get('user');
    //     return userCookie ? JSON.parse(userCookie) : null;
    // }

    // @ts-ignore
    function showAlert(title, text, icon, confirmButtonText) {
        Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText,
        confirmButtonColor: '#3085d6'
        });
    }

    let email = '';
    let password = '';
    let errorMessage = '';

    async function handlelogin() {

        // @ts-ignore
        email = document.getElementById('email').value;
		// @ts-ignore
		password = document.getElementById('password').value;

        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('password', password);
        console.log(formData.toString());

        try {
            const response = await fetch('http://localhost:3002/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            if (response.ok) {
                const responseData = await response.json();
                if(responseData === undefined){
                    showAlert('Error', 'Login failed. Please double check your credentials.', 'warning', 'OK');
                } else{
                    setUserCookies(responseData.access_token);
                    window.location.href = '/';
                }
            } else {
                const errorData = await response.json();
                console.log(errorData);
                showAlert('Error', 'Login failed. Please double check your credentials.', 'warning', 'OK');
                errorMessage = errorData.message || 'Login failed';
            }
        } catch (error) {
            console.error('Error during login:', error);
            errorMessage = 'Login failed';
        }
    }

    function setUserCookies(jwtToken) {
        const secure = location.protocol === 'https:';
        const now = new Date();
        const hour = 3600000;
        const expiryTime = new Date(now.getTime() + (2 * hour)).toUTCString();

        // Set a cookie for the JWT Token
        document.cookie = `accessToken=${jwtToken};path=/;expires=${expiryTime};${secure ? 'Secure;' : ''}SameSite=Strict;`;
    }
</script>

<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:mt-7 lg:py-0">
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log in
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
                
                <button type="button" on:click={handlelogin} class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">Login</button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don't have an account yet? <a href="/signup" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up here</a>
                </p>
            </form>
        </div>
    </div>
</div>