public class User {
    private String username;
    private String role;

    public User(String username, String role) {
        this.username = username;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }
}

public class Room {
    private String name;
    private int capacity;
    private int price;

    public Room(String name, int capacity, int price) {
        this.name = name;
        this.capacity = capacity;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public int getCapacity() {
        return capacity;
    }

    public int getPrice() {
        return price;
    }
}

public class BookingSystem {
    private Map<String, User> users = new HashMap<>();
    private List<Room> rooms = new ArrayList<>();
    private Map<String, List<String>> schedules = new HashMap<>();

    public User loginUser(String username, String password) {
        return users.get(username); // Simplified, no password check for now
    }

    public User registerUser(String username, String password, String role) {
        User user = new User(username, role);
        users.put(username, user);
        return user;
    }

    public void createRoom(String name, int capacity, int price) {
        rooms.add(new Room(name, capacity, price));
    }

    public List<Room> searchRooms() {
        return rooms;
    }

    public boolean bookRoom(User user, Room room, int userCredits) {
        if (userCredits >= room.getPrice()) {
            schedules.computeIfAbsent(user.getUsername(), k -> new ArrayList<>()).add(room.getName());
            return true;
        } else {
            return false;
        }
    }

    public List<String> retrieveSchedule(User user) {
        return schedules.getOrDefault(user.getUsername(), new ArrayList<>());
    }
}
