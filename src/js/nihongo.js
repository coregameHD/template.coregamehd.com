// Nihongo page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get all input elements
    const japaneseTextInput = document.getElementById('japanese-text');
    const romajiTextInput = document.getElementById('romaji-text');
    const thaiTextInput = document.getElementById('thai-text');
    const wordTypesSelect = document.getElementById('word-types');
    const verbGroupSelect = document.getElementById('verb-group');
    const verbTypeSelect = document.getElementById('verb-type');
    const previewOutput = document.getElementById('preview-output');
    const copyButton = document.getElementById('copy-button');

    // Function to update the preview
    function updatePreview() {
        const japaneseText = japaneseTextInput.value;
        const romajiText = romajiTextInput.value;
        const thaiText = thaiTextInput.value;
        
        // Get selected word types
        const selectedWordTypes = Array.from(wordTypesSelect.selectedOptions)
            .map(option => option.value)
            .join(' / ');
        
        // Get verb group and type
        const verbGroup = verbGroupSelect.value;
        const verbType = verbTypeSelect.value;
        
        // Build the preview content
        let previewContent = '';
        
        // Add word type info
        if (selectedWordTypes) {
            previewContent += `※ ${selectedWordTypes}`;
            
            // Add verb group if selected
            if (verbGroup) {
                const groupText = {
                    '1': 'Group 1 (五段動詞)',
                    '2': 'Group 2 (一段動詞)',
                    '3': 'Group 3 (不規則動詞)'
                }[verbGroup];
                previewContent += ` / ${groupText}`;
            }
            
            // Add verb type if selected
            if (verbType) {
                const typeText = {
                    '他動詞': 'สกรรมกริยา (他動詞)',
                    '自動詞': 'อกรรมกริยา (自動詞)'
                }[verbType];
                previewContent += ` / ${typeText}`;
            }
            
            previewContent += '\n';
        }
        
        // Add JLPT level (you can make this dynamic if needed)
        previewContent += '※ คำศัพท์ระดับ N1\n\n';
        
        // Add main content
        previewContent += '————————————\n';
        previewContent += '() หมายถึง\n';
        previewContent += '【】หมายถึง\n\n';
        
        // Add Japanese text if available
        if (japaneseText) {
            previewContent += `${japaneseText}\n`;
            
            // Add romaji if available
            if (romajiText) {
                previewContent += `${romajiText}\n\n`;
            } else {
                previewContent += '\n';
            }
            
            // Add Thai translation if available
            if (thaiText) {
                previewContent += `${thaiText}\n\n`;
            } else {
                previewContent += '\n';
            }
        } else {
            previewContent += '[Preview content will appear here]\n';
        }
        
        // Update the preview
        previewOutput.textContent = previewContent;
    }
    
    // Add event listeners to all inputs
    [japaneseTextInput, romajiTextInput, thaiTextInput].forEach(input => {
        input.addEventListener('input', updatePreview);
    });
    
    [wordTypesSelect, verbGroupSelect, verbTypeSelect].forEach(select => {
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
    
    // Toast notification function (in case it's not loaded from main.js)
    if (typeof showToast !== 'function') {
        window.showToast = function(message, type = 'success') {
            const toastContainer = document.getElementById('toast-container');
            if (!toastContainer) return;
            
            const toast = document.createElement('div');
            toast.className = `toast show align-items-center text-white bg-${type} border-0`;
            toast.role = 'alert';
            toast.setAttribute('aria-live', 'assertive');
            toast.setAttribute('aria-atomic', 'true');
            
            toast.innerHTML = `
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            `;
            
            toastContainer.appendChild(toast);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 5000);
        };
    }
});
