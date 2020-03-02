function login_page() {
    firebase.auth().onAuthStateChanged(user => {
        if (user && user.email === 'prodadmin@test.com') {
            window.location.href = '/home'
        }
        else {
            glPageContent.innerHTML = `
            <form class="form-signin">
                <h3>Please Sign In</h3>
                <input type="email" class="form-control" id="email" placholder="Email address">
                <input type="password" class="form-control" id="password" placholder="Password"> 
                <button type="button" class="btn btn-primary" onclick="signIn()">Submit</button>
            </form>
            `;
        }
    })
}

async function signIn() {
    try{
        const email = document.getElementById('email').value
        if(email !== 'prodadmin@test.com') {
            throw new Error('Not Product Admin')
        }
        const password = document.getElementById('password').value
        await firebase.auth().signInWithEmailAndPassword(email,password)
        //go to admin home
        window.location.href ='/home'
    }
    catch(e) {
        glPageContent.innerHTML = `
            Login Failed:<br>
            ${e}
            </br>
            <a href="/login" class="btn btn-outline-primary">Go to Login</a>'
        `;

    }
}