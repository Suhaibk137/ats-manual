/**
 * Parse comma-separated keywords into an array
 */
function parseKeywords(keywordsString) {
    return keywordsString
        .split(',')
        .map(keyword => keyword.trim())
        .filter(keyword => keyword.length > 0);
}

/**
 * Save form data to localStorage
 */
function saveToLocalStorage(name, email, strength, keywords, atsCompatible, score) {
    const data = {
        name: name,
        email: email,
        strength: parseInt(strength),
        atsCompatible: parseInt(atsCompatible),
        keywords: keywords,
        score: parseInt(score),
        date: new Date().toLocaleDateString('en-GB')
    };
    localStorage.setItem('atsReportData', JSON.stringify(data));
}

/**
 * Validate form inputs
 */
function validateForm(name, email, strength, keywords, atsCompatible, score) {
    if (!name || !email || !strength || !keywords || !atsCompatible || !score) {
        alert('Please fill in all fields');
        return false;
    }
    
    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        return false;
    }

    const scoreValue = parseInt(score);

    if (isNaN(scoreValue)) {
        alert('Please enter a valid score value');
        return false;
    }

    if (scoreValue < 0 || scoreValue > 100) {
        alert('Score must be between 0 and 100');
        return false;
    }
    
    return true;
}

/**
 * Clear form data
 */
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('strength').value = '';
    document.getElementById('atsCompatible').value = '';
    document.getElementById('keywords').value = '';
    document.getElementById('score').value = '';
}

/**
 * Get score level based on score
 */
function getScoreLevel(score) {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
}

/**
 * Generate the report
 */
function generateReport() {
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const strength = document.getElementById('strength').value;
    const atsCompatible = document.getElementById('atsCompatible').value;
    const keywordsString = document.getElementById('keywords').value;
    const score = document.getElementById('score').value;
    
    // Validate form
    if (!validateForm(name, email, strength, keywordsString, atsCompatible, score)) {
        return;
    }
    
    // Process and save data
    try {
        const keywords = parseKeywords(keywordsString);
        saveToLocalStorage(name, email, strength, keywords, atsCompatible, score);
        
        // Navigate to template
        window.location.href = 'template.html';
    } catch (error) {
        console.error('Error generating report:', error);
        alert('An error occurred while generating the report. Please try again.');
    }
}

// Form submission handler
document.getElementById('atsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generateReport();
});

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initializeForm);

// Real-time validation event listeners
document.getElementById('email').addEventListener('blur', function(event) {
    const email = event.target.value;
    if (email && !email.includes('@')) {
        alert('Please enter a valid email address');
    }
});

document.getElementById('keywords').addEventListener('blur', function(event) {
    const keywords = parseKeywords(event.target.value);
    if (keywords.length === 0) {
        alert('Please enter at least one keyword');
    }
});

// Score input validation
document.getElementById('score').addEventListener('input', function(event) {
    const score = parseInt(event.target.value);
    if (score < 0) event.target.value = 0;
    if (score > 100) event.target.value = 100;
    updateScoreLevel();
});

// Real-time score level indicator
function updateScoreLevel() {
    const score = parseInt(document.getElementById('score').value);
    if (!isNaN(score)) {
        const level = getScoreLevel(score);
        // You can add UI feedback here if desired
    }
}

// Initialize form
function initializeForm() {
    clearForm();
}