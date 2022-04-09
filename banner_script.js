let current_index = 1
let images = document.getElementsByClassName('banner')
let change_button = document.getElementById('change-banner')
function changeBanner(){
    images[current_index].style.display = 'block'
    for (let i = 0 ; i < images.length ; i++){
        if (i == current_index){
            continue    
        }
        images[i].style.display = 'none'
    }
    current_index +=1
    if (current_index >= images.length){
        current_index = 0  
    }
    console.log('Change Banner called')
}
// setInterval(changeBanner, 5000)
change_button.addEventListener('click', function(){
    images[current_index].style.display = 'block'
    for (let i = 0 ; i < images.length ; i++){
        if (i == current_index){
            continue
        }
        images[i].style.display = 'none'
    }
    current_index +=1
    if (current_index >= images.length){
        current_index = 0   
    }
})