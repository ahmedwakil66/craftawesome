let header = document.querySelector('header');
let hamB = document.querySelector('#hamB');
let hamC = document.querySelector('#hamC');
let responsiveMenu = document.querySelector('#responsiveMenu');

hamB.addEventListener('click', ()=>{
    hamC.style.display = 'block';
    hamB.style.display = 'none';
    responsiveMenu.style.display = 'block';
    header.style.backgroundColor = 'var(--black-light)';
})
hamC.addEventListener('click', ()=>{
    hamC.style.display = 'none';
    hamB.style.display = 'block';
    responsiveMenu.style.display = 'none';
    header.style.backgroundColor = 'var(--black)';
})