
document.addEventListener('DOMContentLoaded', function() {
    const rooms = [
        { id: 1, name: "Conference Room A", amenities: ["Projector", "WiFi", "Whiteboard"], capacity: 10, Time: "2:00pm to 4:00 pm" },
        { id: 2, name: "Meeting Room B", amenities: ["Conference Call", "TV"], capacity: 6, Time: "4:30pm to 5:30 pm" },
        { id: 3, name: "Executive Room C", amenities: ["Projector", "TV", "WiFi"], capacity: 12, Time: "7:00pm to 8:00pm " },
    ];

    const roomList = document.getElementById('room-list');

    rooms.forEach(room => {
        const roomCard = document.createElement('div');
        roomCard.className = 'col-md-4 mb-4';
        roomCard.innerHTML = `
            <div class="card bg-secondary text-light">
                <div class="card-header">
                    <h4 class="card-title">${room.name}</h4>
                </div>
                <div class="card-body">
                    <p><strong>Capacity:</strong> ${room.capacity} people</p>
                    <p><strong>Amenities:</strong> ${room.amenities.join(', ')}</p>
                    <p><strong>Time:</strong> ${room.Time}</p>
                </div>
            </div>
        `;
        roomList.appendChild(roomCard);
    });
});
