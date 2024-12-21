
<?php
// Initialize variables for error messages
$usernameErr = $passwordErr = "";
$username = $password = "";

// Handle the form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the form data
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Validate username and password
    if (empty($username)) {
        $usernameErr = "Username is required.";
    }

    if (empty($password)) {
        $passwordErr = "Password is required.";
    }

    // If no validation errors, process the data
    if (empty($usernameErr) && empty($passwordErr)) {
        // Path to users.json file
        $filePath = 'users.json';

        // If file doesn't exist, create it
        if (!file_exists($filePath)) {
            file_put_contents($filePath, json_encode([])); // Initialize with an empty array
        }

        // Read existing users data from users.json
        $usersData = json_decode(file_get_contents($filePath), true);

        // Check if the username already exists
        $usernameExists = false;
        foreach ($usersData as $user) {
            if ($user['username'] === $username) {
                $usernameExists = true;
                break;
            }
        }

        if ($usernameExists) {
            $usernameErr = "Username already exists!";
        } else {
            // Add new user to the users array (saving password as plain text)
            $newUser = [
                'username' => $username,
                'password' => $password // Save password as plain text
            ];

            // Add the new user
            $usersData[] = $newUser;

            // Save the updated users data back to the JSON file
            file_put_contents($filePath, json_encode($usersData, JSON_PRETTY_PRINT));

            // Redirect or display success
            header("Location: success.html");
            exit();
        }
    }
}
?>
