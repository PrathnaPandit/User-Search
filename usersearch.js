const people = document.querySelector('.users');
const search = document.querySelector('.searchbar');
// let output = [];

function getUsers() {
    fetch("https://randomuser.me/api/?results=100")
    .then(res=>res.json())
    .then(data => {

let person = data.results;

    //Get data value
    let output = "";
    person.forEach(function(list){
        output+=`
        <li class="display">
                <div class="image"><img src="${list.picture.thumbnail}"></div>
                <div class="userDetails">
                    <div class="name">${list.name.first} ${list.name.last}</div>
                    <div class="location">${list.location.city}, ${list.location.country}</div>
                </div>
        </li>
     <hr class = "line">
        `;
      
        //Screen Display
        document.querySelector('.users').innerHTML = output;
    });
});
}
getUsers();

let unfilteredlist;
let unfilteredusers=[];

search.addEventListener('keyup' , (e) => {
    let output =document.querySelectorAll('.users li')
    const searchstring = e.target.value.toLowerCase();
    const filteredlist = Array.from(output).filter(list => {
        return (
            list.querySelector('.name').innerText.toLowerCase().includes(searchstring) || 
            list.querySelector('.location').innerText.toLowerCase().includes(searchstring)
        );
    });
     unfilteredlist = Array.from(output).filter(list => {
        return (
            !(list.querySelector('.name').innerText.toLowerCase().includes(searchstring)) && 
            !(list.querySelector('.location').innerText.toLowerCase().includes(searchstring))
        );
    });
    
    
    people.innerHTML = ''
    Array.from(filteredlist).forEach(users => {
        people.append(users)
        
    })
    // people.innerHTML = filteredlist;
    Array.from(unfilteredlist).forEach(users => {
        unfilteredusers.push(users)
        
    })
});

search.addEventListener('keydown', function(a){
   if (a.key == 'Backspace'){
    if(search.value.length < 2){
        (unfilteredusers).forEach(users => {
            people.append(users)
        
        })
    } 
   }
});


