const wyswietlacz = document.querySelector('.display');
const poprzedniWyswietlacz = document.querySelector('.previous-display');
const przyciski = document.querySelectorAll('.btn');
const systemPrzyciski = document.querySelectorAll('.system-btn');
const body = document.body;
const styleBtn = document.querySelector('.style-btn');


let darkMode = true;
let aktualnaWartosc = '0';
let poprzedniaWartosc = null;
let operator = null;
let czyResetowacWyswietlacz = false;
let aktualnySystem = 'DEC';

//dark/light mode
 styleBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    if (darkMode) {
        body.classList.add('dark-mode');
        styleBtn.textContent = '🌚';
        styleBtn.style.backgroundColor = '#333';
        const container = document.getElementById('container');
        container.style.border = '2px solid var(--bgcolorbtn)';
    } else {
        body.classList.remove('dark-mode');
        styleBtn.textContent = '🌞';
        styleBtn.style.backgroundColor = '#f0e68c';
        const container = document.getElementById('container');
        container.style.border = '5px solid var(--bgcolorbtn)';

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
      if (czyResetowacWyswietlacz) {
        aktualnaWartosc = wartosc;
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
      if (liczba >= 0) {
        aktualnaWartosc = String(Math.round(Math.sqrt(liczba) * 1000) / 1000);
        wyswietlacz.textContent = aktualnaWartosc;
      } else {
        wyswietlacz.textContent = 'Error';
        aktualnaWartosc = '0';
      }
    }

    // Procent
    else if (wartosc === '%') {
      aktualnaWartosc = String(parseFloat(aktualnaWartosc) / 100);
      wyswietlacz.textContent = aktualnaWartosc;
      aktualizujPrzedniWyswietlacz();
    }

    // Równa się
    else if (wartosc === '=') {
      if (poprzedniaWartosc !== null && operator !== null) {
        oblicz();
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
  let wynik;

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
  wynik = Math.round(wynik * 1000) / 1000;S
  aktualnaWartosc = String(wynik);
  wyswietlacz.textContent = aktualnaWartosc;
  czyResetowacWyswietlacz = true;
}