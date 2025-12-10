const wyswietlacz = document.querySelector('.display');
const poprzedniWyswietlacz = document.querySelector('.previous-display');
const przyciski = document.querySelectorAll('.btn');
const systemPrzyciski = document.querySelectorAll('.system-btn');
const body = document.body;
const styleBtn = document.querySelector('.style-btn');
const historiaBtn = document.querySelector('.historia-btn');
const historiaContainer = document.querySelector('.historia-container');
const historiaList = document.querySelector('.historia-list');
const closeHistoriaBtn = document.querySelector('.close-historia-btn');
const clearHistoriaBtn = document.querySelector('.clear-historia-btn');
const message = document.querySelector('.message-container');
const closeMessageBtn = document.querySelector('.close-message-btn');
const messageBtn = document.querySelector('.message-btn');


let darkMode = true;
let aktualnaWartosc = '0';
let poprzedniaWartosc = null;
let operator = null;
let czyResetowacWyswietlacz = false;
let aktualnySystem = 'DEC';
let historia = [];
let wynik;

// Wczytanie historii z localStorage przy starcie
const zapisanaHistoria = localStorage.getItem('historiaKalkulatora');
if (zapisanaHistoria) {
    historia = JSON.parse(zapisanaHistoria);
    wyswietlHistorie();
}

// Funkcja zapisująca historię do localStorage
function zapiszHistorie() {
    localStorage.setItem('historiaKalkulatora', JSON.stringify(historia));
}

// Funkcja wyświetlająca historię w divie
function wyswietlHistorie() {
    historiaList.innerHTML = '';
    historia.forEach((wpis, index) => {
        const li = document.createElement('li');
        li.textContent = wpis;
        historiaList.appendChild(li);
    });
}

// Funkcja czyszcząca historię
function wyczyscHistorie() {
    historia = [];
    localStorage.removeItem('historiaKalkulatora');
    wyswietlHistorie();
}
// Obsługa przycisku zamykania komunikatu powitalnego
closeMessageBtn.addEventListener('click', () => {
    message.style.display = 'none';
});

// Obsługa przycisku otwierania komunikatu powitalnego
messageBtn.addEventListener('click', () => {
    message.style.display = 'block';
});


// Obsługa przycisku historii
historiaBtn.addEventListener('click', () => {
    historiaContainer.style.visibility = 'visible';
    wyswietlHistorie();
});

// Obsługa przycisku zamykania historii
closeHistoriaBtn.addEventListener('click', () => {
    historiaContainer.style.visibility = 'hidden';
});

// Obsługa przycisku czyszczenia historii
clearHistoriaBtn.addEventListener('click', () => {
    wyczyscHistorie();
});

//dark/light mode
 styleBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    if (darkMode) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        styleBtn.textContent = '🌞';
        styleBtn.style.backgroundColor = '#f0e68c';
        const container = document.getElementById('container');
        container.style.border = '2px solid var(--bgcolorbtn)';
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        styleBtn.textContent = '🌚';
        styleBtn.style.backgroundColor = '#333';
        const container = document.getElementById('container');
    }
 })

// Konwersja systemów liczbowych
function konwertujNaSystem(wartoscDziesietna, system) {
  const liczba = Math.floor(parseFloat(wartoscDziesietna));
  if (isNaN(liczba)) return '0';
  
  switch(system) {
    case 'DEC':
      return String(liczba);
    case 'BIN':
      return liczba.toString(2);
    case 'OCT':
      return liczba.toString(8);
    case 'HEX':
      return liczba.toString(16).toUpperCase();
    default:
      return String(liczba);
  }
}

function konwertujZSystemu(wartosc, system) {
  const wartoscString = String(wartosc).trim();
  if (!wartoscString) return 0;
  
  let liczba;
  switch(system) {
    case 'DEC':
      liczba = parseInt(wartoscString, 10);
      break;
    case 'BIN':
      liczba = parseInt(wartoscString, 2);
      break;
    case 'OCT':
      liczba = parseInt(wartoscString, 8);
      break;
    case 'HEX':
      liczba = parseInt(wartoscString, 16);
      break;
    default:
      liczba = parseInt(wartoscString, 10);
  }
  
  return isNaN(liczba) ? 0 : liczba;
}

// Obsługa systemów liczbowych
systemPrzyciski.forEach(przycisk => {
  przycisk.addEventListener('click', () => {
    console.log('Kliknięto system:', przycisk.dataset.system);
    console.log('Aktualna wartość:', aktualnaWartosc);
    console.log('Aktualny system:', aktualnySystem);
    
    systemPrzyciski.forEach(btn => btn.classList.remove('active'));
    przycisk.classList.add('active');
    
    const nowySystem = przycisk.dataset.system;
    const wartoscDziesietna = konwertujZSystemu(aktualnaWartosc, aktualnySystem);
    
    console.log('Wartość dziesiętna:', wartoscDziesietna);
    
    aktualnySystem = nowySystem;
    aktualnaWartosc = konwertujNaSystem(wartoscDziesietna, nowySystem);
    wyswietlacz.textContent = aktualnaWartosc;
    console.log('Nowa wartość:', aktualnaWartosc);
  });
});


// Aktualizujemy górny mały wyswitlacz
function aktualizujPrzedniWyswietlacz() {
  if (poprzedniaWartosc !== null && operator !== null) {
    poprzedniWyswietlacz.textContent = `${poprzedniaWartosc} ${operator}`;
  } else {
    poprzedniWyswietlacz.textContent = '';
  }
}

// Obsługa przycisków
przyciski.forEach(przycisk => {
  przycisk.addEventListener('click', () => {
    const wartosc = przycisk.textContent;


    if (!isNaN(wartosc) || wartosc === '.') {
      // Blokada kropki jako pierwszego znaku
      if (wartosc === '.' && aktualnaWartosc === '0') {
        aktualnaWartosc = '0.';
        wyswietlacz.textContent = aktualnaWartosc;
        return;
      }
      
      if (czyResetowacWyswietlacz) {
        // Jeśli resetujemy wyświetlacz i ktoś wcisnął kropkę, dodaj "0."
        aktualnaWartosc = wartosc === '.' ? '0.' : wartosc;
        czyResetowacWyswietlacz = false;
      } else {
        if (wartosc === '.' && aktualnaWartosc.includes('.')) return;
        aktualnaWartosc = aktualnaWartosc === '0' ? wartosc : aktualnaWartosc + wartosc;
      }
      wyswietlacz.textContent = aktualnaWartosc;
    }

    //Czyszczenie ekranu
    else if (wartosc === 'C' || wartosc === 'AC') {
      aktualnaWartosc = '0';
      poprzedniaWartosc = null;
      operator = null;
      wyswietlacz.textContent = aktualnaWartosc;
      aktualizujPrzedniWyswietlacz();
    }

     // Wyświetlanie operatorów
    else if (['+', '−', '×', '÷'].includes(wartosc)) {
      if (poprzedniaWartosc !== null && operator !== null && !czyResetowacWyswietlacz) {
        oblicz();
      }
      poprzedniaWartosc = aktualnaWartosc;
      operator = wartosc;
      czyResetowacWyswietlacz = true;
      aktualizujPrzedniWyswietlacz();
    }

    // Pierwiastek
    else if (wartosc === '√') {
      const liczba = parseFloat(aktualnaWartosc);
      let aktualna = aktualnaWartosc;
      let operator = "√";
      if (liczba >= 0) {
        aktualnaWartosc = String(Math.round(Math.sqrt(liczba) * 1000) / 1000);
        wyswietlacz.textContent = aktualnaWartosc;
      } else {
        wyswietlacz.textContent = 'Error';
        aktualnaWartosc = '0';
      }
      historia.push(`${operator} ${aktualna}= ${aktualnaWartosc}`);
      zapiszHistorie();
      console.table(historia);
    }

    // Procent
    else if (wartosc === '%') {
      let aktualna = aktualnaWartosc;
      let operator = '%'
      aktualnaWartosc = String(parseFloat(aktualnaWartosc) / 100);
      historia.push(`${operator} ${aktualna}= ${aktualnaWartosc}`);
      zapiszHistorie();
      console.table(historia);
      wyswietlacz.textContent = aktualnaWartosc;
      aktualizujPrzedniWyswietlacz();
    }

    // Równa się
    else if (wartosc === '=') {
      let aktualna = aktualnaWartosc;
      let poprzednia = poprzedniaWartosc;
      if (poprzedniaWartosc !== null && operator !== null) {
        oblicz();
        historia.push(`${poprzednia} ${operator} ${aktualna} = ${wynik}`);
        zapiszHistorie();
        console.table(historia);
        operator = null;
        poprzedniaWartosc = null;
        aktualizujPrzedniWyswietlacz();


      }
    }
  });
});


//obliczanie wyniku
function oblicz() {
  const poprzednia = parseFloat(poprzedniaWartosc);
  const aktualna = parseFloat(aktualnaWartosc);

  switch (operator) {
    case '+':
      wynik = poprzednia + aktualna;
      break;
    case '−':
      wynik = poprzednia - aktualna;
      break;
    case '×':
      wynik = poprzednia * aktualna;
      break;
    case '÷':
      wynik = poprzednia / aktualna;
      break;
    default:
      return;
  }

  //Zaokrąglenie wynikow typu 3.333 do 3 miejsc po kropce
  wynik = Math.round(wynik * 1000) / 1000;
  aktualnaWartosc = String(wynik);
  wyswietlacz.textContent = aktualnaWartosc;
  czyResetowacWyswietlacz = true;
}

// Obsługa klawiatury
document.addEventListener('keydown', (event) => {
  const klawisz = event.key;
  
  // Zapobiegaj domyślnym akcjom dla niektórych klawiszy
  if (['+', '-', '*', '/', 'Enter', 'Escape'].includes(klawisz)) {
    event.preventDefault();
  }
  
  // Cyfry 0-9
  if (klawisz >= '0' && klawisz <= '9') {
    if (czyResetowacWyswietlacz) {
      aktualnaWartosc = klawisz;
      czyResetowacWyswietlacz = false;
    } else {
      aktualnaWartosc = aktualnaWartosc === '0' ? klawisz : aktualnaWartosc + klawisz;
    }
    wyswietlacz.textContent = aktualnaWartosc;
  }
  
  // Kropka dziesiętna
  else if (klawisz === '.' || klawisz === ',') {
    // Blokada kropki jako pierwszego znaku
    if (aktualnaWartosc === '0') {
      aktualnaWartosc = '0.';
      wyswietlacz.textContent = aktualnaWartosc;
    } else if (!aktualnaWartosc.includes('.')) {
      aktualnaWartosc += '.';
      wyswietlacz.textContent = aktualnaWartosc;
    }
  }
  
  // Operatory
  else if (klawisz === '+') {
    if (poprzedniaWartosc !== null && operator !== null && !czyResetowacWyswietlacz) {
      oblicz();
    }
    poprzedniaWartosc = aktualnaWartosc;
    operator = '+';
    czyResetowacWyswietlacz = true;
    aktualizujPrzedniWyswietlacz();
  }
  
  else if (klawisz === '-') {
    if (poprzedniaWartosc !== null && operator !== null && !czyResetowacWyswietlacz) {
      oblicz();
    }
    poprzedniaWartosc = aktualnaWartosc;
    operator = '−';
    czyResetowacWyswietlacz = true;
    aktualizujPrzedniWyswietlacz();
  }
  
  else if (klawisz === '*') {
    if (poprzedniaWartosc !== null && operator !== null && !czyResetowacWyswietlacz) {
      oblicz();
    }
    poprzedniaWartosc = aktualnaWartosc;
    operator = '×';
    czyResetowacWyswietlacz = true;
    aktualizujPrzedniWyswietlacz();
  }
  
  else if (klawisz === '/') {
    if (poprzedniaWartosc !== null && operator !== null && !czyResetowacWyswietlacz) {
      oblicz();
    }
    poprzedniaWartosc = aktualnaWartosc;
    operator = '÷';
    czyResetowacWyswietlacz = true;
    aktualizujPrzedniWyswietlacz();
  }
  
  // Enter lub = - równa się
  else if (klawisz === 'Enter' || klawisz === '=') {
    if (poprzedniaWartosc !== null && operator !== null) {
      oblicz();
      const ostatniWynik = `${poprzedniaWartosc} ${operator} ${parseFloat(aktualnaWartosc)} = ${wynik}`;
      historia.push(ostatniWynik);
      zapiszHistorie();
      console.log('Historia:', historia);
      operator = null;
      poprzedniaWartosc = null;
      aktualizujPrzedniWyswietlacz();
    }
  }
  
  // Escape lub c/C - czyszczenie
  else if (klawisz === 'Escape' || klawisz.toLowerCase() === 'c') {
    aktualnaWartosc = '0';
    poprzedniaWartosc = null;
    operator = null;
    wyswietlacz.textContent = aktualnaWartosc;
    aktualizujPrzedniWyswietlacz();
  }
  
  // Backspace - usuwanie ostatniej cyfry
  else if (klawisz === 'Backspace') {
    if (aktualnaWartosc.length > 1) {
      aktualnaWartosc = aktualnaWartosc.slice(0, -1);
    } else {
      aktualnaWartosc = '0';
    }
    wyswietlacz.textContent = aktualnaWartosc;
  }
  
  // % - procent
  else if (klawisz === '%') {
    aktualnaWartosc = String(parseFloat(aktualnaWartosc) / 100);
    wyswietlacz.textContent = aktualnaWartosc;
  }
});