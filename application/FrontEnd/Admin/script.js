document.addEventListener("DOMContentLoaded", function() {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn || !isAdmin) {
        alert('You must be logged in as an admin to access this page.');
        window.location.href = '../Login/login.html'; // Redirect to login page
    } else {
       

    const meetingList = document.getElementById('meeting-list');
    const bookingMessage = document.getElementById('booking-message');
    let meetings = [];
    let selectedMeeting = null;

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
            });
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
                <button class="edit-btn" data-id="${meeting.id}">Edit</button>
            `;
            item.addEventListener('click', () => selectMeeting(meeting, item));
            meetingList.appendChild(item);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                const meetingId = button.getAttribute('data-id');
                window.location.href = `edit.html?id=${meetingId}`;
            });
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
            // Check if the meeting matches the filters
            const hasFilter = filters.every(filter => meeting.amenities.includes(filter));
            // Check if the meeting matches the search query
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

    document.getElementById('search-input').addEventListener('input', applyFilters);

    document.querySelector('.filter-btn').addEventListener('click', function() {
        const filterOptions = document.querySelector('.filter-options');
        filterOptions.style.display = filterOptions.style.display === 'none' ? 'block' : 'none';
    });

    document.querySelectorAll('input[name="filter"]').forEach(input => {
        input.addEventListener('change', applyFilters);
    });

    loadMeetings();
}
});
