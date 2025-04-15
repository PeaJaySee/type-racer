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


// Event listener for the difficulty dropdown
document.getElementById("difficulty-select").addEventListener("change", () => {
    const difficulty = document.getElementById("difficulty-select").value; // Get selected difficulty
    const sampleText = getRandomParagraph(difficulty); // Get random text
    document.getElementById("sample-text").textContent = sampleText; // Update the text dynamically
});