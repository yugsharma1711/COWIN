state_menu = document.getElementById('state-menu')
district_menu = document.getElementById('district-menu')
state_container = document.getElementById('state')
function state_api(){
    url = "https://cdn-api.co-vin.in/api/v2/admin/location/states"
    fetch(url)
    .then(res => res.json())
    .then(state_data => show_state(state_data))

}
function show_state(state_data){
    //format data['states'][number]['state_name]
    for(let i = 0 ; i < 37 ; i++){
        let state_name_container = document.createElement('div')
        state_name_container.setAttribute('class', 'state-name-container')
        let state_name = state_data['states'][i]['state_name']
        let state_id = state_data['states'][i]['state_id']
        let menu = document.createElement('input')
        menu.setAttribute('id', state_id )
        menu.setAttribute('type', 'radio')
        menu.setAttribute('name', 'state-name')
        menu.setAttribute('value', state_id)
        let label = document.createElement('label')
        label.setAttribute('for', state_id)
        label.textContent = state_name
        console.log(label.textContent)
        state_name_container.appendChild(menu)
        state_name_container.appendChild(label)
        state_menu.appendChild(state_name_container)
    }
}
function showDistrict(district_data){
    for(let i = 0 ; i < district_data['districts'].length ; i++){
        let menu = document.createElement('option')
        menu.setAttribute('id', 'district-name')
        const text =  document.createTextNode(district_data['districts'][i]['district_name'])
        menu.appendChild(text)
        menu.value = district_data['districts'][i]['district_id']
        district_menu.appendChild(menu)
    }
}
state_menu.addEventListener('change', function(){
    state_id = state_menu.value
    url = 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + state_id
    fetch(url)
    .then(res => res.json())
    .then(district_data => showDistrict(district_data))
})
state_api()
let find_state = document.getElementById('select-state')
find_state.addEventListener('click', function(){
    state_menu.style.display = 'flex'    
})
document.addEventListener('click', function(){
    if(!state_container.contains(event.target)){
        state_menu.style.display = 'none'
    }
})
