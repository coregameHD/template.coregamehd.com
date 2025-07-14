// Katakana page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get all input elements
    const japaneseTextInput = document.getElementById('japanese-text');
    const originalLanguageInput = document.getElementById('original-language-text');
    const thaiTextInput = document.getElementById('thai-text');
    const descriptionInput = document.getElementById('description');
    const gameTitleInput = document.getElementById('game-title');
    const previewOutput = document.getElementById('preview');
    const copyButton = document.getElementById('copy-button');
    const clearAllBtn = document.getElementById('clear-all');
    
    // Word types select - store reference to Tom Select instance
    let wordTypesSelect = null;
    const wordTypesElement = document.getElementById('word-types');
    
    // Only initialize Tom Select if the element exists and doesn't already have a Tom Select instance
    if (wordTypesElement && !wordTypesElement.tomselect) {
        wordTypesSelect = new TomSelect(wordTypesElement, {
            plugins: ['remove_button', 'clear_button'],
            maxItems: null,
            create: false,
            sortField: {
                field: "text",
                direction: "asc"
            }
        });
    } else if (wordTypesElement && wordTypesElement.tomselect) {
        // If Tom Select is already initialized, get the existing instance
        wordTypesSelect = wordTypesElement.tomselect;
    }
    
    // JLPT and J.TEST related elements
    const nLevelSelect = document.getElementById('n-level');
    const jlptExamCheckbox = document.getElementById('jlpt-exam');
    const jlptLevelSelect = document.getElementById('jlpt-level');
    const jtestExamCheckbox = document.getElementById('jtest-exam');
    const jtestNoInput = document.getElementById('jtest-no');
    const yearInput = document.getElementById('year');
    const monthInput = document.getElementById('month');

    // Initialize form controls state
    function initializeFormControls() {
        // Disable dependent fields by default
        if (jlptLevelSelect) jlptLevelSelect.disabled = true;
        if (yearInput) yearInput.disabled = true;
        if (monthInput) monthInput.disabled = true;
        if (jtestNoInput) jtestNoInput.disabled = true;
        
        // Set current year as default if year input exists
        if (yearInput && !yearInput.value) {
            yearInput.value = new Date().getFullYear();
        }
    }

    // Update the preview
    function updatePreview() {
        if (!previewOutput) return;
        
        // Safely get values with null checks
        const japaneseText = japaneseTextInput ? japaneseTextInput.value : '';
        const originalText = originalLanguageInput ? originalLanguageInput.value : '';
        const thaiText = thaiTextInput ? thaiTextInput.value : '';
        const description = descriptionInput ? descriptionInput.value : '';
        const gameTitle = gameTitleInput ? gameTitleInput.value : '';
        const nLevel = nLevelSelect ? nLevelSelect.value : 'None';
        
        // Get selected word types
        let selectedWordTypes = '';
        if (wordTypesSelect && wordTypesSelect.items) {
            selectedWordTypes = wordTypesSelect.items
                .map(value => wordTypesSelect.options[value] ? wordTypesSelect.options[value].text : '')
                .filter(Boolean)
                .join(' / ');
        }
        
        const year = yearInput ? yearInput.value : '';
        const month = monthInput ? monthInput.value : '';
        let jlptText = "";
        let jtestText = "";

        let output = `【คำศัพท์】\n\n${japaneseText}\n${originalText}\n${thaiText}\n\n※ ${selectedWordTypes}`;

        if (nLevel !== "None") {
            output += `\n※ คำศัพท์ระดับ ${nLevel}`;
        }

        if (jlptExamCheckbox && jlptExamCheckbox.checked && jlptLevelSelect) {
            const jlptLevel = jlptLevelSelect.value || '';
            if (jlptLevel && year && month) {
                jlptText = `\n⭐️ ออกสอบ JLPT ${jlptLevel} (รอบ ${year}年${month}月)`;
                output += jlptText;
            }
        }

        if (jtestExamCheckbox && jtestExamCheckbox.checked && jtestNoInput && jtestNoInput.value) {
            jtestText = `\n⭐️ ออกสอบ J.TEST ระดับ A-C (第${jtestNoInput.value}回)`;
            output += jtestText;
        }

        // Build the meaning section
        output += '\n\n————————————\n';
        if (japaneseText) output += japaneseText;
        if (description) output += description;
        
        if (gameTitle) {
            output += '\n\n————————————\n▍ภาพจากเกม ' + gameTitle;
        }

        previewOutput.textContent = output;
    }
    
    // Add event listeners
    function setupEventListeners() {
        // Input fields
        const inputFields = [japaneseTextInput, originalLanguageInput, thaiTextInput, 
                           descriptionInput, gameTitleInput, nLevelSelect];
        
        inputFields.forEach(input => {
            if (input) {
                input.addEventListener('input', updatePreview);
            }
        });
        
        // Word types select
        if (wordTypesSelect) {
            wordTypesSelect.on('change', updatePreview);
        }
        
        // JLPT exam checkbox
        if (jlptExamCheckbox) {
            jlptExamCheckbox.addEventListener('change', function() {
                if (jlptLevelSelect) jlptLevelSelect.disabled = !this.checked;
                if (yearInput) yearInput.disabled = !this.checked;
                if (monthInput) monthInput.disabled = !this.checked;
                updatePreview();
            });
        }
        
        // J.TEST exam checkbox
        if (jtestExamCheckbox) {
            jtestExamCheckbox.addEventListener('change', function() {
                if (jtestNoInput) jtestNoInput.disabled = !this.checked;
                updatePreview();
            });
        }
        
        // N-level select
        if (nLevelSelect) {
            nLevelSelect.addEventListener('change', function() {
                if (jlptLevelSelect && jlptExamCheckbox && jlptExamCheckbox.checked) {
                    jlptLevelSelect.value = this.value;
                    updatePreview();
                }
            });
        }
        
        // Copy button
        if (copyButton) {
            copyButton.addEventListener('click', function() {
                if (previewOutput && previewOutput.textContent) {
                    navigator.clipboard.writeText(previewOutput.textContent)
                        .then(() => {
                            // Show success message
                            const toast = new bootstrap.Toast(document.getElementById('copyToast'));
                            toast.show();
                        })
                        .catch(err => {
                            console.error('Failed to copy text: ', err);
                        });
                }
            });
        }
        
        // Clear all button
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', function() {
                const form = document.querySelector('form');
                if (form) form.reset();
                
                // Clear Tom Select if it exists
                if (wordTypesSelect) {
                    wordTypesSelect.clear();
                }
                
                // Reset preview
                if (previewOutput) {
                    previewOutput.textContent = '';
                }
                
                // Re-initialize form controls
                initializeFormControls();
            });
        }
    }
    
    // Initialize the page
    initializeFormControls();
    setupEventListeners();
    updatePreview();
});
