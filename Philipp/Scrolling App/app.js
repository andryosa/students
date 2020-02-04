const http = new EasyHTTP

//Get User
let proxy = 'https://cors-anywhere.herokuapp.com/'
http.get(proxy+'https://api.github.com/users').then((val) =>{console.log(val)}).catch(er => console.log(er))


const profiles = profileIterator(http.getLocalData())
//Call the first profile
nextProfile();
//Next Event
document.getElementById('next').addEventListener('click', nextProfile)

//Event Handler : display the next profile
function nextProfile() {
    const currentProfile = profiles.next().value;
    if (currentProfile !== undefined) {
        document.getElementById('profileDisplay').innerHTML = `<ul class="list-group">
        <li class="list-group-item">login: ${currentProfile.login}</li>
        <li class="list-group-item">ID: ${currentProfile.id}</li>
    </ul>`
        document.getElementById('imageDisplay').innerHTML = `<img class="img-thumbnail w-75" src="${currentProfile.avatar_url}">`
    } else {
        //No more profiles
        window.location.reload()
    }
}
//Profile Iterator
function profileIterator(profiles) {
    let nextIndex = 0;
    return {
        next: function () {
            return nextIndex < profiles.length ? {
                value: profiles[nextIndex++],
                done: false
            } : {
                done: true
            }
        }
    }
}