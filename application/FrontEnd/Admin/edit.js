document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('edit-form');
    const cancelButton = document.getElementById('cancel-button');
    const urlParams = new URLSearchParams(window.location.search);
    const meetingId = urlParams.get('id');

    function loadMeetingDetails() {
        fetch('meetings.xml')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, "text/xml");
                const meeting = Array.from(xmlDoc.getElementsByTagName('meeting')).find(m => m.getAttribute('id') === meetingId);

                if (meeting) {
                    document.getElementById('meeting-id').value = meetingId;
                    document.getElementById('name').value = meeting.getAttribute('name');
                    document.getElementById('type').value = meeting.getAttribute('type');
                    document.getElementById('credit').value = meeting.getAttribute('credit');
                    document.getElementById('startTime').value = meeting.getAttribute('startTime');
                    document.getElementById('endTime').value = meeting.getAttribute('endTime');
                    document.getElementById('date').value = meeting.getAttribute('date');
                    document.getElementById('amenities').value = meeting.getAttribute('amenities');
                }
            });
    }

    function saveMeetingDetails(event) {
        event.preventDefault();
        
        const meetingData = {
            id: document.getElementById('meeting-id').value,
            name: document.getElementById('name').value,
            type: document.getElementById('type').value,
            credit: document.getElementById('credit').value,
            startTime: document.getElementById('startTime').value,
            endTime: document.getElementById('endTime').value,
            date: document.getElementById('date').value,
            amenities: document.getElementById('amenities').value.split(',')
        };

        // Log the updated meeting details
        console.log('Updated meeting details:', meetingData);

        alert('Meeting updated successfully');
        window.location.href = 'index.html'; // Redirect to main page
    }

    cancelButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect to main page
    });

    form.addEventListener('submit', saveMeetingDetails);

    loadMeetingDetails();
});
