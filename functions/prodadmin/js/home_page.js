function home_page() {
    auth('prodadmin@test.com', home_page_secured, '/login')
}

function home_page_secured() {
    glPageContent.innerHTML = '<h1>Home Page</h1>'
    glPageContent.innerHTML += `
        <a href = '/add' class="btn btn-outline-primary">Add A Product</a>
        <a href = '/show' class="btn btn-outline-primary">Show A Product</a>
        <button class="btn btn-outline-danger" type="button" onclick="logOut()">Log Out</button>

    `;
}

async function logOut() {
    await firebase.auth().signOut()
    window.location.href = '/login'
}
