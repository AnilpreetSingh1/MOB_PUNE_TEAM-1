

document.addEventListener("DOMContentLoaded", function() {
    const isManager = sessionStorage.getItem('isManager') === 'true';
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn || !isManager) {
        alert('You must be logged in as an Manager to access this page.');
        window.location.href = '../Login/login.html'; // Redirect to login page
    } else {
       
    const meetingList = document.getElementById('meeting-list');
    const bookingMessage = document.getElementById('booking-message');
    const bookButton = document.getElementById('book-button');
    const creditCount = document.getElementById('credit-count');
    let meetings = [];
    let selectedMeeting = null;
    let totalCredits = 1500; // Initialize total credits

    function loadMeetings() {
        fetch('meetings.xml')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, "text/xml");
                meetings = Array.from(xmlDoc.getElementsByTagName('meeting')).map(meeting => ({
                    id: meeting.getAttribute('id'),
                    name: meeting.getAttribute('name'),
                    type: meeting.getAttribute('type'),
                    credit: parseInt(meeting.getAttribute('credit'), 10),
                    startTime: meeting.getAttribute('startTime'),
                    endTime: meeting.getAttribute('endTime'),
                    date: meeting.getAttribute('date'),
                    amenities: meeting.getAttribute('amenities').split(',')
                }));
                displayMeetings(meetings);
            })
            .catch(error => console.error('Error loading meetings:', error));
    }

    function displayMeetings(meetings) {
        meetingList.innerHTML = '';
        meetings.forEach(meeting => {
            const item = document.createElement('div');
            item.className = 'meeting-item';
            item.innerHTML = `
                <h4>${meeting.name}</h4>
                <p>Type: ${meeting.type}</p>
                <p>Credit: ${meeting.credit}</p>
                <p>Start Time: ${meeting.startTime}</p>
                <p>End Time: ${meeting.endTime}</p>
                <p>Date: ${meeting.date}</p>
                <p>Amenities: ${meeting.amenities.join(', ')}</p>
            `;
            item.addEventListener('click', () => selectMeeting(meeting, item));
            meetingList.appendChild(item);
        });
    }

    function selectMeeting(meeting, element) {
        if (selectedMeeting) {
            const previouslySelected = document.querySelector('.meeting-item.selected');
            if (previouslySelected) {
                previouslySelected.classList.remove('selected');
            }
        }
        selectedMeeting = meeting;
        element.classList.add('selected');
    }

    function applyFilters() {
        const filters = Array.from(document.querySelectorAll('input[name="filter"]:checked')).map(input => input.value);
        const searchQuery = document.getElementById('search-input').value.toLowerCase();
        
        const filteredMeetings = meetings.filter(meeting => {
            const hasFilter = filters.every(filter => meeting.amenities.includes(filter));
            const matchesSearch = [
                meeting.name,
                meeting.type,
                meeting.date,
                meeting.startTime,
                meeting.endTime,
                ...meeting.amenities
            ].some(field => field.toLowerCase().includes(searchQuery));

            return hasFilter && matchesSearch;
        });

        displayMeetings(filteredMeetings);
    }

    function bookMeeting() {
        if (!selectedMeeting) {
            bookingMessage.textContent = 'Please select a meeting to book.';
            console.log('No meeting selected.');
            return;
        }

        if (totalCredits < selectedMeeting.credit) {
            bookingMessage.textContent = 'Not enough credits to book this meeting.';
            console.log('Insufficient credits.');
            return;
        }

        // Simulate booking success
        const meetingIndex = meetings.findIndex(m => m.id === selectedMeeting.id);
        if (meetingIndex > -1) {
            // Deduct credits
            totalCredits -= selectedMeeting.credit;
            creditCount.textContent = totalCredits;

             // Log booking details
             console.log('Booking Details:', {
                managerId: 'manager123', // Replace with actual manager ID
                roomId: selectedMeeting.id,
                bookingDate: new Date().toISOString().split('T')[0],
                startTime: selectedMeeting.startTime,
                endTime: selectedMeeting.endTime,
                creditUsed: selectedMeeting.credit
            });

            // Remove meeting from the list
            meetings.splice(meetingIndex, 1);
            displayMeetings(meetings);
            selectedMeeting = null;

            // Display success message
            bookingMessage.textContent = 'Meeting booked successfully!';

        } else {
            bookingMessage.textContent = 'Booking failed, please try again.';
            console.log('Booking failed.');
        }
    }

    document.getElementById('search-input').addEventListener('input', applyFilters);

    document.querySelector('.filter-btn').addEventListener('click', function() {
        const filterOptions = document.querySelector('.filter-options');
        filterOptions.style.display = filterOptions.style.display === 'none' ? 'block' : 'none';
    });

    document.querySelectorAll('input[name="filter"]').forEach(input => {
        input.addEventListener('change', applyFilters);
    });

    bookButton.addEventListener('click', bookMeeting);

    loadMeetings();
}
});
