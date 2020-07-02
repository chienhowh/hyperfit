const formContainer = document.querySelector('.container-fluid.form')
const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const signUp = document.querySelector('.signup')
//form validation
form.addEventListener('submit', (e) => {
    e.preventDefault()
    checkInputs()
})

function checkInputs(){
    const usernameValue = username.value.trim()
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()
    const password2Value = password2.value.trim()
    //username
    if(usernameValue === ''){
        forError(username, 'Username cannot be blank')
    }
    else{
       forSuccess(username)
    }
    //email
    if(emailValue === ''){
        forError(email, 'Email cannot be blank')
    }
    else if(!isValidEmail(emailValue)){
        forError(email, 'Email is not valid')
    }
    else{
        forSuccess(email)
    }
    //password
    if(passwordValue === ''){
        forError(password, 'Password cannot be blank')
    }
    else{
       forSuccess(password)
    }
    if(password2Value === ''){
        forError(password2, 'Password cannot be blank')
    }
    else if(password2Value !== passwordValue){
        forError(password2, 'Password does not match!')
    }
    else{
       forSuccess(password2)
    }
}

function forError(input, message){
    const formControl= input.parentNode
    const small = formControl.querySelector('small')
    formControl.className = 'form-group error'
    small.innerText = message 
}

function forSuccess(input){
    const formControl= input.parentNode
    formControl.className = 'form-group success'
}

function isValidEmail(email){
    const rule = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return rule.test(email)
}

//form display
signUp.addEventListener('click', () => {
    formContainer.classList.add('contentdisplay')
    // //new for toggle
    // $('.navbar-toggler').addClass('collapsed')
    // $('.navbar-toggler').attr('aria-expanded', 'false')
    // $('.navbar-collapse').attr('class', '.navbar-collapse collapse')
})

$('i').on('click', () => {
    formContainer.classList.remove('contentdisplay')
    $('input').val('')
    $('.form-group').attr('class','form-group')
})
//others
      //跳轉
      const target = document.querySelector(".asked");      
     
      function handleClick(){
        const query = document.querySelector(".query").offsetTop;
        window.scrollTo(0,query-60);
      }

      target.addEventListener("click", handleClick);
      //觸摸旋轉
      const rotateLeft = document.querySelector(".rotateLeft");
      
      function handleRotate(){
        rotateLeft.classList.add("rotateLeft-enter");
       /*setTimeout(function(){
          rotateLeft.style.display = "none";
        },2000)*/
      }
     
     function handleBack(){
       rotateLeft.classList.remove("rotateLeft-enter")
     }
      rotateLeft.addEventListener("mousedown", handleRotate);
      rotateLeft.addEventListener("mouseleave", handleBack)
 
//google button
// gapi.load('auth2', function(){
//     gapi.auth2.init()
// })

// const emailbox = document.getElementById("email")
function onSignIn(googleUser){
    const profile = googleUser.getBasicProfile()
    alert(`${profile.getName()} welcome back!`)
    //new add
    $('.container-fluid.form').removeClass('contentdisplay')
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      alert('User signed out.');
    });
  }