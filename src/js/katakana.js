// Katakana page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get all input elements
    const japaneseTextInput = document.getElementById('japanese-text');
    const originalLanguageInput = document.getElementById('original-language-text');
    const thaiTextInput = document.getElementById('thai-text');
    const categorySelect = document.getElementById('category');
    const difficultySelect = document.getElementById('difficulty');
    const previewOutput = document.getElementById('preview-output');
    const copyButton = document.getElementById('copy-button');

    // Category display names
    const categoryNames = {
        'food': 'Food & Drinks',
        'technology': 'Technology',
        'sports': 'Sports',
        'fashion': 'Fashion',
        'business': 'Business',
        'other': 'Other'
    };

    // Update the preview
    function updatePreview() {
        const japaneseText = japaneseTextInput.value;
        const originalText = originalLanguageInput.value;
        const thaiText = thaiTextInput.value;
        const category = categorySelect.value;
        const difficulty = difficultySelect.value;
        
        let previewContent = '';
        
        // Add Japanese text if available
        if (japaneseText) {
            previewContent += `${japaneseText}\n`;
        } else {
            previewContent += '[Katakana Word]\n';
        }
        
        // Add original language text if available
        if (originalText) {
            previewContent += `${originalText}\n\n`;
        } else {
            previewContent += '[Original Word]\n\n';
        }
        
        // Add Thai translation if available
        if (thaiText) {
            previewContent += `${thaiText}\n\n`;
        } else {
            previewContent += '[Thai Translation]\n\n';
        }
        
        // Add category if selected
        if (category) {
            previewContent += `Category: ${categoryNames[category] || category}\n`;
        } else {
            previewContent += 'Category: -\n';
        }
        
        // Add difficulty
        previewContent += `Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}\n`;
        
        // Update the preview
        previewOutput.textContent = previewContent;
    }
    
    // Add event listeners to all inputs
    [japaneseTextInput, originalLanguageInput, thaiTextInput].forEach(input => {
        input.addEventListener('input', updatePreview);
    });
    
    [categorySelect, difficultySelect].forEach(select => {
        select.addEventListener('change', updatePreview);
    });
    
    // Copy to clipboard functionality
    copyButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(previewOutput.textContent);
            showToast('Copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
            showToast('Failed to copy text', 'danger');
        }
    });
    
    // Initialize the preview
    updatePreview();
});
