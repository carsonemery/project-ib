// ***************************************
// Javascript for technical questions (handles p and li)
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
    
    // MODIFIED: Get answer with both p and li elements
    let answerDiv = card.querySelector('.whitespace-pre-line.animated-content');
    let fullAnswer = '';
    
    if (answerDiv) {
        // Check for both paragraphs and list items
        let answerParts = answerDiv.querySelectorAll('p, li');
        
        if (answerParts.length > 0) {
            // Process each element
            fullAnswer = Array.from(answerParts).map(el => {
                if (el.tagName === 'LI') {
                    return `• ${el.innerText.trim()}`;
                } else if (el.tagName === 'P') {
                    return el.innerText.trim();
                }
            }).filter(text => text).join('\n'); // Filter out empty strings
        } else {
            // No structured elements, just get all text
            fullAnswer = answerDiv.innerText.trim();
        }
    }
    
    // Get question number
    let questionNum = card.querySelector('.text-muted-foreground.text-xs')?.innerText || '';
    
    // Store everything
    extractedData.push({
        index: index + 1,
        question: fullQuestion,
        tags: allTags,
        answer: fullAnswer,
        questionNumber: questionNum
    });
});

// Download as JSON
let blob = new Blob([JSON.stringify(extractedData, null, 2)], {type: 'application/json'});
let url = URL.createObjectURL(blob);
let a = document.createElement('a');
a.href = url;
a.download = 'technical_flashcards_complete_v2.json';
a.click();

console.log(`Extracted ${flashcards.length} flashcards with complete data`);