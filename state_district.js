state_menu = document.getElementById('state-menu')
district_menu = document.getElementById('district-menu')
function state_api(){
    url = "https://cdn-api.co-vin.in/api/v2/admin/location/states"
    fetch(url)
    .then(res => res.json())
    .then(state_data => show_state(state_data))

}
function show_state(state_data){
    //format data['states'][number]['state_name]
    for(let i = 0 ; i < 37 ; i++){
        let menu = document.createElement('option')
        menu.setAttribute('id', 'state-name')
        const text = document.createTextNode(state_data['states'][i]['state_name'])
        menu.appendChild(text)
        menu.value = state_data['states'][i]['state_id']
        state_menu.appendChild(menu)
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