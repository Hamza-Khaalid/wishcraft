// Sample data representing previous activities
const activities = [
    { date: '2024-08-20', description: 'User sent a custom birthday wish.' },
    { date: '2024-08-21', description: 'User added a new memory to the scrapbook.' },
    { date: '2024-08-23', description: 'User shared a countdown link.' },
    { date: '2024-08-25', description: 'User sent a date proposal using the ask them out feature.' },
];

// Function to load activities dynamically
function loadActivities() {
    // Get the activity list element from the DOM
    const activityList = document.getElementById('activity-list');

    // Clear any existing activities (optional)
    activityList.innerHTML = '';

    // Loop through each activity and create a list item
    activities.forEach(activity => {
        // Create a new list item element
        const listItem = document.createElement('li');
        
        // Set the inner text to include the date and description
        listItem.textContent = `${activity.date}: ${activity.description}`;
        
        // Append the list item to the activity list
        activityList.appendChild(listItem);
    });
}

// Call the function to load activities when the page loads
window.onload = loadActivities;
