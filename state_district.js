state_menu = document.getElementById('state-menu')
district_menu = document.getElementById('district-menu')
state_container = document.getElementById('state')
find_state = document.getElementById('select-state')
find_district = document.getElementById('find-district')

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
        menu.setAttribute('id',1000 + i)
        menu.setAttribute('type', 'radio')
        menu.setAttribute('name', 'state-name')
        menu.setAttribute('value', state_id)
        let label = document.createElement('label')
        label.setAttribute('for', 1000 + i)
        label.setAttribute('id', state_id)
        label.textContent = state_name
        state_name_container.appendChild(menu)
        state_name_container.appendChild(label)
        state_menu.appendChild(state_name_container)
    }
}
function showDistrict(district_data){
    for(let i = 0 ; i < district_data['districts'].length ; i++){
        let district_name_container  = document.createElement('div')
        district_name_container.setAttribute('class', 'state-name-container')
        let menu = document.createElement('input')
        menu.setAttribute('type', 'radio')
        menu.setAttribute('id', 2000 + i)
        menu.setAttribute('name', 'district-name')
        menu.setAttribute('value' , district_data['districts'][i]['district_id'])
        let label = document.createElement('label')
        label.setAttribute('for', 2000+i)
        id = 50000 +  district_data['districts'][i]['district_id']
        label.setAttribute('id', id)
        label.textContent = district_data['districts'][i]['district_name']
        district_name_container.appendChild(menu)
        district_name_container.appendChild(label)
        district_menu.appendChild(district_name_container)
    }
}
state_menu.addEventListener('change', function(){
    district_menu.innerHTML = ' '
    find_district.textContent = 'Select Your District'
    state_id = document.querySelector(`input[type="radio"][name = state-name]:checked`).value
    _stateName = document.getElementById(state_id)
    find_state.textContent = _stateName.textContent
    state_menu.style.display = 'none'
    url = 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + state_id   
    fetch(url)
        .then(res => res.json())
        .then(district_data => showDistrict(district_data))
})
state_api()
find_state.addEventListener('click', function(){
    state_menu.style.display = 'flex'    
})  
document.addEventListener('click', function(){
    if(!state_container.contains(event.target)){
        state_menu.style.display = 'none'
    }
})
district_menu.addEventListener('change', function(){
    district_menu.style.display ='none'
    district_id = document.querySelector(`input[type="radio"][name = district-name]:checked`).value
    district_id = Number(50000 + Number(district_id))
    _districtName = document.getElementById(district_id)
    findDistrict = document.getElementById('find-district')
    findDistrict.textContent = _districtName.textContent
    district_id = Number(Number(district_id)- 50000)
    show_vaccines(district_id)
})
find_district.addEventListener('click', function(){
    district_menu.style.display = 'flex'
})
function show_vaccines(district_id){
    date = getDate()
    request_url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=' + district_id  + '&date=' + date 
    fetch(request_url)
        .then(vaccine_data => vaccine_data.json())
        .then(vaccine_data_json => update_vaccine_table(vaccine_data_json))
}
function getDate(){
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    today = dd + '-' + mm + '-' + yyyy;
    return today
}
function update_vaccine_table(vaccine_data){
    console.log(vaccine_data)
    vaccine_table_container = document.getElementById('vaccine_container')
    vaccine_table = document.createElement('table')
    vaccine_table.setAttribute('class', 'vaccine-table')
    vaccine_table_dates = document.createElement('tr')
    date_element = document.createElement('td')
    date_element.textContent = '&puncsp;'
    vaccine_table_dates.appendChild(date_element)
    for (let i = 0 ; i < 5 ; i++){
        let date_element = document.createElement('td')
        date_element.textContent = getDate()
        vaccine_table_dates.appendChild(date_element)
    }
    vaccine_table.appendChild(vaccine_table_dates)
    for(let i = 0 ; i  < vaccine_data['sessions'].length ; i++){
        vaccine_table_row = document.createElement('tr')
            hospital_data = document.createElement('td')
            hospital_data.setAttribute('class', 'hospital_data')
                hospital_name = document.createElement('p')
                hospital_name.textContent  = vaccine_data['sessions'][i]['name']
                hospital_data.appendChild(hospital_name)
                hospital_address = document.createElement('p')
                hospital_address.textContent = vaccine_data['sessions'][i]['address']
                hospital_data.appendChild(hospital_address)
                vaccine_info = document.createElement('div')
                    vaccine_info.setAttribute('class', 'vaccine_charges')
                    fare = document.createElement('p')
                    fare.setAttribute('class', fare)
                    fare.textContent = vaccine_data['sessions'][i]['fee']
                    vaccine_info.appendChild(fare)
                hospital_data.appendChild(vaccine_info)
        vaccine_table_row.appendChild(hospital_data)
        vaccine_table.appendChild(vaccine_table_row)
    }
    vaccine_table_container.appendChild(vaccine_table)
}
