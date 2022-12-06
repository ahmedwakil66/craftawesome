//=== header nav responsive codes starts ===//
let hamA, hamC, mobileNavContent, mobileNavContent2;

hamA = document.getElementById('hamA');
hamC = document.getElementById('hamC');
mobileNavContent = document.getElementById('mobileNavContent');
mobileNavContent2 = document.getElementById('mobileNavContent2');

let mobileNavOpen = function(){
    hamA.style.width = '0px';
    hamC.style.width = '40px';
    mobileNavContent.style.height = '100vh';
}

function mobileNavClose(){
    hamA.style.width = '40px';
    hamC.style.width = '0px';
    mobileNavContent.style.height = '0vh';
    mobileNavContent2.style.height = '0vh';
}

function nestedNavOpen(){
    mobileNavContent2.style.height = '100vh';
}

function nestedNavClose() {
    mobileNavContent2.style.height = '0vh';
}
//=== header nav responsive codes ends ===//



//=== codes for clickable tabs starts===//
function opendeal(e, tireName){
    let i, tabContent, tabButton;

    tabContent = document.getElementsByClassName('tabcontent');
    for(i=0; i<tabContent.length; i++){
        tabContent[i].style.display = 'none';
    }

    tabButton = document.getElementsByClassName('tabbutton');
    for(i=0; i<tabButton.length; i++){
        tabButton[i].classList.replace('active-tab-btn', 'no-class');
    }

    document.getElementById(tireName).style.display = 'block';
    e.target.classList.add('active-tab-btn');
}
//=== codes for clickable tabs ends===//




//=== making details auto open at certain point ===//
document.getElementById('defaultOpen').click();

let body = document.querySelector('body');
let wdth = body.clientWidth;
if(wdth > 999){
    var details = document.querySelectorAll('details');
    console.log(details);
    var i;
    for(i=0; i<details.length; i++){
        details[i].open = true;
    }
}


/* I can make the details autometically open when browser window width reach a certain 
point but when I lessen the browser window width to a certain point the details are not 
getting automatically closed.
I have tried the following commentted out codes but it did not help.*/

/*setInterval(function(){
    let wdth = body.clientWidth;
    if(wdth > 999){
        var details = document.querySelectorAll('details');
        console.log(details);
        var i;
        for(i=0; i<details.length; i++){
            details[i].open = true;
        }
    }
    else{
        for(i=0; i<details.length; i++){
            details[i].open = false;
        }
    }
}, 10); */

/*body.addEventListener('mouseover', function(e){
    let wdth = e.target.clientWidth;
    if(wdth > 999){
        var details = document.querySelectorAll('details');
        console.log(details);
        var i;
        for(i=0; i<details.length; i++){
            details[i].open = true;
        }
    } 
    else{for(i=0; i<details.length; i++){
        details[i].open = false;
    }}
}); */


    
