let active;

document.querySelectorAll('nav > a')
    .forEach((link) => {
        link.addEventListener('click', (e) => {
            if (active === e.currentTarget) {
                // Wenn das aktuelle Element bereits aktiv ist, entfernen Sie die 'active' Klasse, um es auszublenden
                if (e.currentTarget.className === "home active"){
                    e.currentTarget.classList.remove('active');
                    active = null; // Setzen Sie active auf null, da es nicht mehr aktiv ist
                    openHomeWindow();
                }else
                if (e.currentTarget.className === "wallet active"){
                    e.currentTarget.classList.remove('active');
                    active = null; // Setzen Sie active auf null, da es nicht mehr aktiv ist
                    openCodingWindow();
                }else{
                    e.currentTarget.classList.remove('active');
                    active = null; // Setzen Sie active auf null, da es nicht mehr aktiv ist
                }
            } else {
                if (active) {
                    active.classList.remove('active');

                }
                active = e.currentTarget;
                active.classList.add('active');
                if (e.currentTarget.className === "home active"){
                    openHomeWindow();
                }
                if (e.currentTarget.className === "wallet active"){
                    openCodingWindow();
                }
                console.log(e.currentTarget.className);
            }
        });
    });

// Holen Sie sich das HomeWindow-Element
const homeWindow = document.querySelector('.homeWindow');

const homeHeader = document.querySelector('.homeHeader');

// Funktion zum Öffnen des HomeWindows
function openHomeWindow() {
    if (homeWindow.style.display == 'flex'){
        homeWindow.style.display = 'none'; // Verbergen Sie das HomeWindow
        active.classList.remove('active');
        active = null;
    }else{
        homeWindow.style.display = 'flex'; // Zeigen Sie das HomeWindow an
    }

}

// Holen Sie sich das HomeWindow-Element
const codingWindow = document.querySelector('.codingWindow');

const codingHeader = document.querySelector('.codingHeader');

// Funktion zum Öffnen des HomeWindows
function openCodingWindow() {
    if (codingWindow.style.display == 'flex'){
        codingWindow.style.display = 'none'; // Verbergen Sie das HomeWindow
        codingHeader.style.display = 'none';
        active.classList.remove('active');
        active = null;
    }else{
        codingWindow.style.display = 'flex'; // Zeigen Sie das HomeWindow an
        codingHeader.style.display = 'flex';
    }

}

