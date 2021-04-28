# Generátory
Vlastní nástroj použitý pro generování některých vizualizací v bakalářské práci je ke stažení níže. Jedná se o projekt [Processing](https://processing.org), což je framework podobný _p5.js_ používanému v této aplikaci, ale založený na jazyce _Java_.

Vstupním bodem projektu je soubor `generators.pde`. Ten samotný obsahuje hlavně konfigurovatelná nastavení režimu vykreslování (`P2D` nebo `P3D`) a velikosti plátna a hlavní části projektu, jako je inicializace, vykreslovací smyčka a zpracování uživatelských vstupů z klávesnice. Veškeré generování probíhá v ostatních souborech (třídách).

Při spuštění projektu a při stisknutí šipky vpravo se ve 2D zobrazí výběr možných generátorů. Každý genrátor má vedle sebe klávesu, kterou se na něj lze přepnout. Ve 3D se sice toto menu nezobrazuje, funguje ale stejně (obsahuje klávesy `a`, `b` a `c`). Stisknutím mezerníku se do složky `results/` uloží aktuální plátno a je zobrazena zpráva s názvem vytvořeného souboru.

Kód není komentovaný.
