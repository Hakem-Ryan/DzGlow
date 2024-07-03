document.addEventListener('DOMContentLoaded', () => {
    const languageButton = document.getElementById('languageButton');
    const languageMenu = document.querySelector('.language-menu');
    const languageLinks = document.querySelectorAll('.language-menu a');
    const allElementsWithLang = document.querySelectorAll('[data-en], [data-fr], [data-ar]');
    
    // Add elements for popup translation
    const trackingPopupElements = {
        'tracking-popup h2': {
            en: 'Track Your Product',
            fr: 'Suivi de votre produit',
            ar: 'تتبع منتجك'
        },
        'tracking-popup p': {
            en: 'Enter the tracking code for ',
            fr: 'Entrez le code de suivi pour ',
            ar: 'أدخل رمز التتبع لـ '
        },
        'tracking-popup input[placeholder]': {
            en: 'Enter your tracking code',
            fr: 'Entrez votre code de suivi',
            ar: 'أدخل رمز التتبع الخاص بك'
        },
        'tracking-popup button': {
            en: 'Submit',
            fr: 'Envoyer',
            ar: 'إرسال'
        },
        'close-button': {
            en: '×',
            fr: '×',
            ar: '×'
        }
    };
    
    function translatePage(language) {
        allElementsWithLang.forEach(element => {
            if (element.hasAttribute(`data-${language}`)) {
                element.textContent = element.getAttribute(`data-${language}`);
            }
        });

        // Update the language button text
        languageButton.textContent = language.toUpperCase();

        // Update the selected language in the menu
        languageLinks.forEach(link => {
            if (link.getAttribute('data-lang') === language) {
                link.style.display = 'none';
            } else {
                link.style.display = 'block';
            }
        });

        // Translate the popup content
        Object.keys(trackingPopupElements).forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                const content = trackingPopupElements[selector][language];
                if (content) {
                    if (selector === 'tracking-popup p') {
                        // Special handling for the tracking-message
                        document.getElementById('tracking-message').textContent = content + document.getElementById('product-name').textContent;
                    } else if (selector === 'close-button') {
                        element.textContent = content;
                    } else {
                        element.textContent = content;
                    }
                }
            }
        });

        // Save the selected language to localStorage
        localStorage.setItem('language', language);
    }

    // Get the saved language from localStorage or default to English
    const savedLang = localStorage.getItem('language') || 'en';
    translatePage(savedLang);

    languageButton.addEventListener('click', () => {
        languageMenu.style.display = languageMenu.style.display === 'block' ? 'none' : 'block';
    });

    languageLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const lang = link.getAttribute('data-lang');
            translatePage(lang);
        });
    });
});
// Function to open the tracking popup
function openTrackingPopup(productName) {
    document.getElementById('product-name').textContent = productName;
    document.getElementById('tracking-message').textContent = `Enter the tracking code for ${productName}:`;
    document.getElementById('tracking-popup').style.display = 'flex';
}

// Function to close the tracking popup
function closeTrackingPopup() {
    document.getElementById('tracking-popup').style.display = 'none';
}

// Function to handle the tracking code submission
function submitTrackingCode() {
    const trackingCode = document.getElementById('tracking-code').value;
    if (trackingCode) {
        alert(`Tracking code submitted: ${trackingCode}`);
        closeTrackingPopup();
    } else {
        alert('Please enter a tracking code.');
    }
}

// Close the popup when clicking outside of it
window.addEventListener('click', function(event) {
    const popup = document.getElementById('tracking-popup');
    if (event.target === popup) {
        closeTrackingPopup();
    }
});


// Update changeLanguage function to make sure the correct language is set on the button
function changeLanguage(language) {
    // Update the language based on the selected option
    document.querySelector('.language-button').textContent = language.toUpperCase();
    document.querySelectorAll('.language-menu a').forEach(link => {
        link.style.display = link.getAttribute('data-lang') === language ? 'none' : 'block';
    });

    // Translate the page
    translatePage(language);
}
