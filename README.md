# Projekt Kalkulator

Zaawansowany kalkulator webowy z obsługą konwersji systemów liczbowych, historią obliczeń i trybem ciemnym/jasnym.

## Ważne informacje
- Kalkulator najlepiej odpalić przez wtyczkę Live Server w VS Code

## Funkcje

### Podstawowe operacje
- Dodawanie (+)
- Odejmowanie (−)
- Mnożenie (×)
- Dzielenie (÷)
- Pierwiastek kwadratowy (√)
- Procent (%)

### Konwersja systemów liczbowych
- **DEC** - system dziesiętny (0-9)
- **BIN** - system binarny (0-1)
- **OCT** - system ósemkowy (0-7)
- **HEX** - system szesnastkowy (0-9, A-F)

### Historia obliczeń
- Automatyczne zapisywanie wszystkich operacji
- Przechowywanie w localStorage (zachowane po zamknięciu przeglądarki)
- Przeglądanie wykonanych obliczeń
- Przycisk do czyszczenia historii
- Przewijalna lista z custom scrollbarem

### Motywy
- **Dark Mode** - ciemny motyw (domyślny)
- **Light Mode** - jasny motyw
- Przełączanie przyciskiem 🌞/🌚

### Obsługa klawiatury
- Cyfry `0-9` - wpisywanie liczb
- `.` lub `,` - kropka dziesiętna
- `+`, `-`, `*`, `/` - operatory matematyczne
- `Enter` lub `=` - obliczanie wyniku
- `Escape` lub `C` - czyszczenie
- `Backspace` - usuwanie ostatniej cyfry
- `%` - procent

### Dodatkowe funkcje
- Wyświetlanie poprzedniej operacji na górnym wyświetlaczu
- Zaokrąglanie wyników do 3 miejsc po przecinku
- Obsługa łańcuchowych obliczeń (np. 2 + 3 + 4)
- Blokada kropki jako pierwszego znaku (automatycznie dodaje `0.`)
- Czyszczenie kalkulatora (C)
- Pełna responsywność dla wszystkich urządzeń
- Custom scrollbar pasujący do kolorystyki

## Aktualizacje

### 22.11.2025
- 🎨 Poprawiono style i wygląd
- ➕ Dodano przeliczanie na systemy liczbowe (DEC, BIN, OCT, HEX)
- 🌓 Dodano ciemny/jasny motyw z możliwością zmiany

### 28.11.2025
- 🚫 Zablokowano możliwość wpisywania kropki jako pierwszego znaku
- 📜 Dodano historię obliczeń z zapisem w localStorage
- 📱 Poprawiono responsywność dla wszystkich urządzeń
- ⌨️ Dodano pełną obsługę klawiatury
- 🎨 Dodano custom scrollbar
- 🔧 Poprawiono stabilność i wydajność

## Responsywność
Kalkulator dostosowuje się do:
- 🖥️ Dużych ekranów (1200px+)
- 💻 Laptopów (1024px)
- 📱 Tabletów (768px)
- 📱 Telefonów (480px)
- 📱 Małych telefonów (360px)


## Struktura plików
```
projekt/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── Readme.md
```

## Autor
Damian Bukowiec 