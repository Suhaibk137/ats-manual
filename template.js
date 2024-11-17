// Strength data configuration
const strengthData = {
    1: {
        percentage: 90,
        color: '#16a34a',
        title: 'Resume Strength: Strong',
        points: [
            "Clear and professional heading hierarchy",
            "Excellent content organization and structure",
            "Strong professional summary that captures attention",
            "Achievement-focused experience descriptions",
            "Consistent formatting throughout the document",
            "Appropriate use of white space and sections",
            "Skills clearly highlighted and categorized",
            "Education and certifications well-presented",
            "Contact information prominently displayed",
            "Professional tone maintained throughout"
        ]
    },
    2: {
        percentage: 40,
        color: '#ca8a04',
        title: 'Resume Strength: Medium',
        points: [
            "Basic structure is present but needs refinement",
            "Content organization could be improved",
            "Professional summary needs more impact",
            "Experience descriptions need more quantifiable achievements",
            "Formatting inconsistencies present",
            "Section spacing needs adjustment",
            "Skills section could be better organized",
            "Education section needs better formatting",
            "Consider reorganizing for better flow",
            "Some sections need more detailed information"
        ]
    },
    3: {
        percentage: 20,
        color: '#dc2626',
        title: 'Resume Strength: Weak',
        points: [
            "Document structure needs significant improvement",
            "Content organization is unclear",
            "Professional summary lacks impact",
            "Experience descriptions are too vague",
            "Inconsistent formatting affects readability",
            "Poor use of space and section organization",
            "Skills not effectively presented",
            "Education section needs better structure",
            "May not pass initial resume screenings",
            "Overall presentation needs professional polish"
        ]
    }
};

// Score level data
const scoreLevelData = {
    high: {
        color: '#16a34a',
        background: '#f0fdf4',
        border: '#dcfce7',
        summary: "Your resume demonstrates excellent ATS compatibility. With a score in the high range, your resume is well-optimized for ATS systems and has a strong chance of successfully passing automated screenings. The document effectively balances keyword optimization with readability."
    },
    medium: {
        color: '#ca8a04',
        background: '#fefce8',
        border: '#fef08a',
        summary: "Your resume shows moderate ATS compatibility. While it meets basic requirements, there's room for improvement in keyword optimization and formatting. Consider implementing the suggested improvements to increase your score and improve your chances of passing ATS screenings."
    },
    low: {
        color: '#dc2626',
        background: '#fef2f2',
        border: '#fecaca',
        summary: "Your resume's current ATS compatibility is below optimal levels. The low score suggests that the document may face challenges in passing automated screening systems. Following the recommended improvements is crucial for increasing your score and improving your resume's effectiveness."
    }
};

// Update user data section
function updateUserData(data) {
    document.querySelector('.name-placeholder').textContent = data.name;
    document.querySelector('.email-placeholder').textContent = data.email;
    document.querySelector('.report-date').textContent = `Generated on ${data.date}`;
}

// Update strength section
function updateStrengthSection(strengthLevel) {
    const data = strengthData[strengthLevel];
    
    const progressPath = document.getElementById('progress-path');
    progressPath.style.stroke = data.color;
    progressPath.style.strokeDasharray = `${data.percentage}, 100`;

    document.getElementById('strength-percentage').textContent = data.percentage;

    const summaryHtml = `
        <h3 class="summary-title" style="color: ${data.color}">${data.title}</h3>
        <ul class="summary-points">
            ${data.points.map(point => `<li>${point}</li>`).join('')}
        </ul>
    `;
    document.getElementById('strength-summary').innerHTML = summaryHtml;
}

// Update keywords section
function updateKeywordsSection(keywords, date) {
    document.getElementById('keywords-count').textContent = keywords.length;
    document.getElementById('keywords-date').textContent = `Last Updated: ${date}`;
    
    const keywordsList = document.getElementById('keywords-list');
    keywordsList.innerHTML = keywords
        .sort((a, b) => a.localeCompare(b))
        .map(keyword => `
            <span class="keyword-tag">${keyword}</span>
        `)
        .join('');
}

function updateATSSection(atsCompatible) {
    const isPassed = atsCompatible === 1;
    
    const analysisItems = document.querySelectorAll('.analysis-item');
    analysisItems.forEach(item => {
        const icon = item.querySelector('.analysis-icon');
        const title = item.querySelector('.analysis-title');
        
        if (isPassed) {
            icon.classList.add('passed');
            icon.innerHTML = '';
            title.classList.add('passed');
            title.textContent += ' Passed';
        } else {
            icon.classList.add('failed');
            icon.innerHTML = '';
            title.classList.add('failed');
            title.textContent += ' Failed';
        }
    });

    const summaryHtml = `
        <div class="flex items-start gap-4">
            <div class="summary-icon ${isPassed ? 'passed' : 'failed'}">
            </div>
            <div>
                <h3 class="summary-title">${isPassed ? 'ATS-Compatible Resume' : 'ATS Compatibility Issues Detected'}</h3>
                <p class="summary-text">
                    ${isPassed ? 
                        'Your resume follows ATS-friendly formatting standards and is well-optimized for applicant tracking systems.' : 
                        'Your resume may face challenges with ATS software. Consider implementing the recommended improvements.'}
                </p>
            </div>
        </div>
    `;
    document.getElementById('ats-summary').innerHTML = summaryHtml;

    const recommendationsHtml = `
        <h4 class="recommendations-title">
            ${isPassed ? 'Maintenance Recommendations' : 'Improvement Recommendations'}
        </h4>
        <ul class="recommendations-list">
            ${isPassed ? `
                <li>Continue using standard section headings</li>
                <li>Regularly update keywords based on target job descriptions</li>
                <li>Maintain current formatting for future updates</li>
                <li>Keep using bullet points for easy readability</li>
            ` : `
                <li>Switch to standard fonts (Arial, Calibri, Times New Roman)</li>
                <li>Remove graphics, tables, and complex formatting</li>
                <li>Use standard section headings</li>
                <li>Incorporate more industry-specific keywords</li>
            `}
        </ul>
    `;
    document.getElementById('ats-recommendations').innerHTML = recommendationsHtml;
}

// Update Score section - Modified for single score
function updateScoreSection(score) {
    // Update score display
    document.getElementById('score-range').textContent = `${score}%`;
    
    let level = 'low';
    if (score >= 80) level = 'high';
    else if (score >= 60) level = 'medium';

    const data = scoreLevelData[level];

    // Update score value styling
    const scoreValue = document.querySelector('.score-value');
    scoreValue.style.backgroundColor = data.background;
    document.getElementById('score-range').style.color = data.color;

    // Update summary
    const scoreSummary = document.querySelector('.score-summary');
    scoreSummary.style.backgroundColor = data.background;
    scoreSummary.style.borderColor = data.border;
    scoreSummary.querySelector('h4').style.color = data.color;
    scoreSummary.querySelector('p').textContent = data.summary;

    // Add appropriate class for styling
    scoreSummary.className = `score-summary ${level}`;
}

// Initialize template
window.onload = function() {
    const storedData = JSON.parse(localStorage.getItem('atsReportData'));
    
    if (storedData) {
        updateUserData(storedData);
        updateStrengthSection(storedData.strength);
        if (storedData.keywords) {
            updateKeywordsSection(storedData.keywords, storedData.date);
        }
        updateATSSection(storedData.atsCompatible);
        if (storedData.score !== undefined) {
            updateScoreSection(storedData.score);
        }
    }
};




// Add this function to your template.js file
function downloadReport() {
    // Get the current date for the filename
    const date = new Date().toISOString().split('T')[0];
    const storedData = JSON.parse(localStorage.getItem('atsReportData'));
    const name = storedData?.name?.replace(/\s+/g, '_') || 'candidate';

    // Create the download button style (will be hidden in print)
    const buttonStyle = `
        .download-button {
            text-align: right;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .download-btn {
            background-color: #2563eb;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        @media print {
            .download-button { display: none; }
        }
    `;

    // Get all styles from the current page
    const styles = Array.from(document.styleSheets)
        .map(sheet => {
            try {
                return Array.from(sheet.cssRules)
                    .map(rule => rule.cssText)
                    .join('\n');
            } catch (e) {
                console.warn('Could not read stylesheet:', e);
                return '';
            }
        })
        .join('\n');

    // Create the complete HTML document with inline styles
    const printContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ATS Report - ${name}</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
                ${styles}
                ${buttonStyle}
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                        background: none;
                    }
                    .a4-page {
                        margin: 0;
                        padding: 20mm;
                        box-shadow: none;
                        min-height: 297mm;
                    }
                    .user-data-section,
                    .strength-section,
                    .keywords-section,
                    .ats-analysis-section,
                    .ats-score-section {
                        page-break-inside: avoid;
                    }
                }
            </style>
        </head>
        <body>
            <div class="download-button">
                <button onclick="window.print()" class="download-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                    Save as PDF
                </button>
            </div>
            ${document.querySelector('.a4-page').outerHTML}
        </body>
        </html>
    `;

    // Create and trigger download
    const blob = new Blob([printContent], { type: 'text/html' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `ATS_Report_${name}_${date}.html`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Add button to page
function addDownloadButton() {
    const downloadButton = document.createElement('div');
    downloadButton.className = 'download-button';
    downloadButton.innerHTML = `
        <button onclick="downloadReport()" class="download-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 7v10m0 0l-4-4m4 4l4-4m4 5v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4"/>
            </svg>
            Download Report
        </button>
    `;
    document.querySelector('.report-container').appendChild(downloadButton);
}

// Add this to your window.onload function
window.onload = function() {
    const storedData = JSON.parse(localStorage.getItem('atsReportData'));
    
    if (storedData) {
        updateUserData(storedData);
        updateStrengthSection(storedData.strength);
        if (storedData.keywords) {
            updateKeywordsSection(storedData.keywords, storedData.date);
        }
        updateATSSection(storedData.atsCompatible);
        if (storedData.score !== undefined) {
            updateScoreSection(storedData.score);
        }
        // Add download button
        addDownloadButton();
    }
};