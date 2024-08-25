
document.addEventListener("DOMContentLoaded", function() {
  const isManager = sessionStorage.getItem('isManager') === 'true';
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn || !isManager) {
      alert('You must be logged in as an manager to access this page.');
      window.location.href = '../../Login/login.html'; // Redirect to login page
  } else {
const form = document.getElementById('createRoomForm');
const meetingTypeError = document.getElementById('meetingTypeError');
const seatingCapacityError = document.getElementById('seatingCapacityError');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const meetingType = document.getElementById('meetingType').value;
  const seatingCapacity = document.getElementById('seatingCapacity').value;

  // Input validation
  let isValid = true;

  if (meetingType === '') {
    meetingTypeError.textContent = 'Meeting Type is required';
    isValid = false;
  } else {
    meetingTypeError.textContent = '';
  }

  if (seatingCapacity === '') {
    seatingCapacityError.textContent = 'Seating Capacity is required';
    isValid = false;
  } else {
    seatingCapacityError.textContent = '';
  }

  if (!isValid) {
    return;
  }

  // ... rest of the form processing ...

  const wifi = document.getElementById('wifi').checked;
  const projector = document.getElementById('projector').checked;
  const conferenceCall = document.getElementById('conferenceCall').checked;
  const whiteboard = document.getElementById('whiteboard').checked;

  const outputText = `
    Meeting Type: ${meetingType}
    Seating Capacity: ${seatingCapacity}
    Wifi: ${wifi ? 'Yes' : 'No'}
    Projector: ${projector ? 'Yes' : 'No'}
    Conference Call Facility: ${conferenceCall ? 'Yes' : 'No'}
    Whiteboard: ${whiteboard ? 'Yes' : 'No'}
  `;

  console.log(outputText);
});
  }
});
  