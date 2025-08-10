// ***************************************
// Javascript used for behavioral questions
// ***************************************


let flashcards = document.querySelectorAll('div.flex.flex-col.pb-4');
let extractedData = [];

flashcards.forEach((card, index) => {
    // Get the FULL question including all parts
    let questionDiv = card.querySelector('.font-semibold.tracking-tight');
    let fullQuestion = '';
    
    if (questionDiv) {
        // This preserves the full question with line breaks and bullet points
        let questionParts = questionDiv.querySelectorAll('p, ul, li');
        if (questionParts.length > 0) {
            fullQuestion = Array.from(questionParts).map(el => {
                if (el.tagName === 'LI') return `• ${el.innerText}`;
                return el.innerText;
            }).join('\n');
        } else {
            fullQuestion = questionDiv.innerText;
        }
    }
    
    // Get ALL tags, not just specific ones
    let tagElements = card.querySelectorAll('.inline-flex.items-center.rounded-md.border');
    let allTags = Array.from(tagElements).map(tag => tag.innerText.trim());
    
    // Get the FULL answer preserving structure
    let answerDiv = card.querySelector('.whitespace-pre-line.animated-content');
    let fullAnswer = '';
    
    if (answerDiv) {
    let bulletPoints = answerDiv.querySelectorAll('li');
    if (bulletPoints.length > 0) {
        // All elements are definitely LI, no need to check
        fullAnswer = Array.from(bulletPoints)
            .map(li => `• ${li.innerText}`)
            .join('\n');
    } else {
        // No bullet points, just get all text
        fullAnswer = answerDiv.innerText;
    }
    }
    
    // Get question number
    let questionNum = card.querySelector('.text-muted-foreground.text-xs')?.innerText || '';
    
    // Store everything without making assumptions about structure
    extractedData.push({
        index: index + 1,
        question: fullQuestion,
        tags: allTags,  // ALL tags, not just predefined ones
        answer: fullAnswer,
        questionNumber: questionNum,
        // Keep raw text as backup
        rawText: card.innerText
    });
});

// Download as JSON
let blob = new Blob([JSON.stringify(extractedData, null, 2)], {type: 'application/json'});
let url = URL.createObjectURL(blob);
let a = document.createElement('a');
a.href = url;
a.download = 'behavioral_flashcards_complete.json';
a.click();

console.log(`Extracted ${flashcards.length} flashcards with complete data`);