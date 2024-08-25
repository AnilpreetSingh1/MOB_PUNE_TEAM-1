import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class BookingSystemTest {
    private BookingSystem bookingSystem;

    @Before
    public void setUp() {
        bookingSystem = new BookingSystem();
    }

    @Test
    public void testUserRegistrationAndLogin() {
        // Register a new user
        User user = bookingSystem.registerUser("john", "password", "Member");
        assertNotNull(user);
        assertEquals("john", user.getUsername());
        assertEquals("Member", user.getRole());

        // Attempt login
        User loggedInUser = bookingSystem.loginUser("john", "password");
        assertNotNull(loggedInUser);
        assertEquals("john", loggedInUser.getUsername());
        assertEquals("Member", loggedInUser.getRole());
    }

    @Test
    public void testRoomCreationAndSearch() {
        // Create a new room
        bookingSystem.createRoom("Conference Room", 10, 100);
        List<Room> rooms = bookingSystem.searchRooms();
        assertEquals(1, rooms.size());

        Room room = rooms.get(0);
        assertEquals("Conference Room", room.getName());
        assertEquals(10, room.getCapacity());
        assertEquals(100, room.getPrice());
    }

    @Test
    public void testRoomBooking() {
        // Register a user
        User user = bookingSystem.registerUser("manager", "password", "Manager");

        // Create a room
        bookingSystem.createRoom("Conference Room", 10, 100);

        // Book the room
        Room room = bookingSystem.searchRooms().get(0);
        boolean bookingStatus = bookingSystem.bookRoom(user, room, 150);
        assertTrue(bookingStatus);

        // Check insufficient credits
        boolean insufficientCreditsBooking = bookingSystem.bookRoom(user, room, 50);
        assertFalse(insufficientCreditsBooking);
    }

    @Test
    public void testRetrieveSchedule() {
        // Register a user
        User user = bookingSystem.registerUser("member", "password", "Member");

        // Create and book a room
        bookingSystem.createRoom("Meeting Room", 5, 50);
        Room room = bookingSystem.searchRooms().get(0);
        bookingSystem.bookRoom(user, room, 100);

        // Retrieve schedule
        List<String> schedule = bookingSystem.retrieveSchedule(user);
        assertEquals(1, schedule.size());
        assertEquals("Meeting Room", schedule.get(0));
    }
}
