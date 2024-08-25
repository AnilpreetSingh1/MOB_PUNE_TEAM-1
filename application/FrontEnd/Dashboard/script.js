document.addEventListener('DOMContentLoaded', function() {

    const roomList = document.getElementById('room-list');
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    const isUser = sessionStorage.getItem('isUser') === 'true';
    const isManager = sessionStorage.getItem('isManager') === 'true';
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const roomCard = document.createElement('div');
    roomCard.className = 'col-md-4 mb-4';
  
   if(isAdmin && isLoggedIn) {
    

        roomCard.innerHTML = `
                <div class="container mt-5 pt-5 flex-grow-1 d-flex justify-content-center align-items-center">
        <div class="login-container ">
            <h3 class="animate__animated animate__fadeIn">Meeting Room</h3>
            <form class="mt-4 animate__animated animate__fadeInUp">
            
                 <a href="../Admin/index.html" class="btn btn-outline-light btn-lg mt-3 animate__animated animate__fadeInUp">Create Room</a>
            </form>
        </div>
    </div>

        `;
        roomList.appendChild(roomCard);

}else if(isManager && isLoggedIn){
    roomCard.innerHTML = `
    <div class="container mt-5 pt-5 flex-grow-1 d-flex justify-content-center align-items-center">
<div class="login-container ">
<h3 class="animate__animated animate__fadeIn">Book Room</h3>
<form class="mt-4 animate__animated animate__fadeInUp">

     <a href="../Manager/index.html" class="btn btn-outline-light btn-lg mt-3 animate__animated animate__fadeInUp">Book Room</a>
</form>
</div>
<div class="login-container ">
<h3 class="animate__animated animate__fadeIn">Scheduling a Meeting</h3>
<form class="mt-4 animate__animated animate__fadeInUp">

     <a href="../Manager/Manager-Schedule/index.html" class="btn btn-outline-light btn-lg mt-3 animate__animated animate__fadeInUp">Create Room</a>
</form>
</div>
</div>
`;
}else if(isUser && isLoggedIn){roomCard.innerHTML = `
    <div class="container mt-5 pt-5 flex-grow-1 d-flex justify-content-center align-items-center">
<div class="login-container ">
<h3 class="animate__animated animate__fadeIn">View my Meeting Room</h3>
<form class="mt-4 animate__animated animate__fadeInUp">
     <a href="../User/index.html" class="btn btn-outline-light btn-lg mt-3 animate__animated animate__fadeInUp">View</a>
</form>
</div>

</div>
`;
}else{
    alert('Invalid Credentials');
    window.location.href = '../Login/login.html'; 
}
roomList.appendChild(roomCard);
});
