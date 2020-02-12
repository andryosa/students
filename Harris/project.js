const data = [
    {
        name : 'chiara ',
        age : 32,
        gender : 'female',
        lookingfor: 'male',
        location : 'USA',
        image : 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    {
        name : 'Andri',
        age : 26,
        gender : 'male',
        lookingfor: 'male',
        location : 'Ireland',
        image : 'https://randomuser.me/api/portraits/men/17.jpg'
    },
    {
        name : 'Alina',
        age : 22,
        gender : 'female',
        lookingfor: 'male',
        location : 'Deutschland',
        image : 'https://randomuser.me/api/portraits/women/60.jpg'
    },
    {
        name : 'kolija',
        age : 23,
        gender : 'male',
        lookingfor: 'female',
        location : 'USA',
        image : 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
        name : 'sofia',
        age : 26,
        gender : 'female',
        lookingfor: 'male',
        location : 'Deutschland',
        image : 'https://randomuser.me/api/portraits/women/77.jpg'
    },
    {
        name : 'William Johnson',
        age : 30,
        gender : 'male',
        lookingfor: 'female',
        location : 'USA',
        image : 'https://randomuser.me/api/portraits/men/47.jpg'
    },
    {
        name : 'lisa',
        age : 21,
        gender : 'female',
        lookingfor: 'male',
        location : 'Deutschland',
        image : 'https://randomuser.me/api/portraits/women/26.jpg'
    },
    {
        name : 'jens',
        age : 32,
        gender : 'male',
        lookingfor: 'female',
        location : 'England',
        image : 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    {
        name : 'jassica',
        age : 24,
        gender : 'female',
        lookingfor: 'male',
        location : 'Paris',
        image : 'https://randomuser.me/api/portraits/women/20.jpg'
    },
    {
        name : 'Christian',
        age : 20,
        gender : 'male',
        lookingfor: 'female',
        location : 'Hamburg',
        image : 'https://randomuser.me/api/portraits/men/62.jpg'
    },
    {
        name : 'Jasmin',
        age : 27,
        gender : 'female',
        lookingfor: 'female',
        location : 'Sweden',
        image : 'https://randomuser.me/api/portraits/women/32.jpg'
    }
]
const profiles = profileIterator(data)
//Call the first profile
nextProfile();
//Next Event 
document.getElementById('next').addEventListener('click' , nextProfile)

//Event Handler : display the next profile
function nextProfile(){
    const currentProfile = profiles.next().value;
    if(currentProfile !== undefined){
    document.getElementById('profileDisplay').innerHTML = `
    <ul class="list-group">
     <li class="list-group-item">Name: ${currentProfile.name}</li>
     <li class="list-group-item">Age: ${currentProfile.age}</li>
     <li class="list-group-item">Location: ${currentProfile.location}</li>
     <li class="list-group-item">Preference: ${currentProfile.gender} looking for ${currentProfile.lookingfor}</li>
     </ul>`

     document.getElementById('imageDisplay').innerHTML = `<img src="${currentProfile.image}">`} else{
         //No more profiles
         window.location.reload()
     }
}
//Profile Iterator
function profileIterator(profiles){
    let nextIndex = 0;

    return {
        next : function(){
            return nextIndex < profiles.length ?
            { value : profiles[nextIndex++] , done : false}:
            { done : true }
        }
    }
}
