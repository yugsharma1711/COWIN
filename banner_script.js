let current_index = 0
let images = document.getElementsByClassName('banner')
let change_button = document.getElementById('change-banner')
let num = document.getElementById('numerator')
let forward_click = document.getElementById('forward-icon')
function changeBanner(){
    images.current_index.style.display = 'none'
    if (current_index == images.length - 1){
        current_index = 0
    }
    else{
        current_index += 1
    }
    images[current_index].style.display = 'block'
    let button_text = current_index + 1 
    num.textContent = button_text
    console.log('Change Banner called')
}
// setInterval(changeBanner, 5000)
forward_click.addEventListener('click', function(){
    console.log(current_index)
    images[current_index].style.display = 'block'
    for (let i = 0 ; i < images.length ; i++){
        if (i == current_index){
            continue    
        }
        images[i].style.display = 'none'
        
    }
    let button_text = current_index +1 
    num.textContent = button_text
    current_index +=1
    if (current_index >= images.length){
        current_index = 0  
    }
    console.log('Change Banner called')
})
let backward_click = document.getElementById('backward-icon')
backward_click.addEventListener('click', function(){
    if (current_index == 0){
        images[current_index].style.display = 'none'
        current_index = images.length - 1
        images[current_index].style.display = 'block'
    }
    else{
        images[current_index].style.display = 'none'
        current_index -= 1
        images[current_index].style.display = 'block'
    }
    let button_text = current_index + 1 
    num.textContent = button_text
})