// JavaScript code for the typing test application
// Sample texts for each difficulty level
const sampleTexts = {
    easy: [
        "The quick brown fox jumps over the lazy dog.",
        "Typing is fun and easy to learn.",
        "Practice makes perfect."
    ],
    medium: [
        "JavaScript is a versatile programming language used for web development.",
        "Bootstrap helps create responsive and mobile-friendly websites.",
        "Typing speed tests are a great way to improve your skills."
    ],
    hard: [
        "Artificial intelligence is transforming the way we interact with technology.",
        "The complexity of algorithms can vary based on their time and space efficiency.",
        "Understanding asynchronous programming is crucial for modern web development."
    ]
};

// Function to get a random paragraph based on difficulty
function getRandomParagraph(difficulty) {
    const texts = sampleTexts[difficulty];
    return texts[Math.floor(Math.random() * texts.length)];
}

// Variables to track the start and end time
let startTime = null;
let endTime = null;

// Function to start the typing test
function startTypingTest() {
    startTime = new Date(); // Record the start time
    document.getElementById("start-btn").disabled = true; // Disable the Start button
    document.getElementById("stop-btn").disabled = false; // Enable the Stop button
    document.getElementById("typing-input").value = ""; // Clear the typing input
    document.getElementById("typing-input").focus(); // Focus on the typing input
}

// Function to stop the typing test
function stopTypingTest() {
    endTime = new Date(); // Record the end time
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Calculate time in seconds, rounded to 2 decimal points
    document.getElementById("start-btn").disabled = false; // Enable the Start button
    document.getElementById("stop-btn").disabled = true; // Disable the Stop button
    displayTestTime(timeTaken); // Display the test time
}

// Function to display the test time
function displayTestTime(timeTaken) {
    const statsInfo = document.querySelector(".col-md-4 .p-3"); // Select the Stats/Info section
    statsInfo.innerHTML = `
        <h2>Stats/Info</h2>
        <p>Time taken: ${timeTaken} seconds</p>
    `;
}

// Event listener for the Start button
document.getElementById("start-btn").addEventListener("click", startTypingTest);

// Event listener for the Stop button
document.getElementById("stop-btn").addEventListener("click", stopTypingTest);


// Event listener for the difficulty dropdown
document.getElementById("difficulty-select").addEventListener("change", () => {
    const difficulty = document.getElementById("difficulty-select").value; // Get selected difficulty
    const sampleText = getRandomParagraph(difficulty); // Get random text
    document.getElementById("sample-text").textContent = sampleText; // Update the text dynamically
});