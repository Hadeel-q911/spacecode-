const parentContainer = document.querySelector('.KidRegister') ;

parentContainer.addEventListener('click',event=>{
const current = event.target;

const IsreadMoreBtn = current.className.includes('read-more-btn')

if (!IsreadMoreBtn) return ; 

const currentText = event.target.parentNode.querySelector('.read-more-text'); 

currentText.classList.toggle('read-more-text--show') ;

current.textcontent = current.textcontent.includes('Read More') ? "Read Less" : "Read More..." ;



})