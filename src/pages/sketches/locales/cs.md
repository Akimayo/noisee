# Projekty
Projekty jsou jednotlivé ukázky případů užití procedurálně generovaného gradientního šumu, konkrétně jeho varianty _Perlin Noise_. Každý projekt se snaží ukázat určité reálně aplikovatelné využití a poskytnou interaktivní prostor pro vyzkoušení těchto užití.

Projekty mají výchozí nastavení volená tak, aby nebyly příliš náročné a bylo je možné bez problémů spustit i na méně výkonných zařízeních. Některé jsou ale už z principu náročné, proto je možné, že některé mohou způsobit nestabilní nebo pomalé chování webového prohlížeče. U náročnéjších projektů, kde mohou určitá nastavení způsobit významné zpomalení, je u těchto nastavení vždy ikonka varování.

Projekty jsou bez problémů spustitelné a ovladatelné i na mobilních zařízeních. Je ale zachovávána velikost plátna (zpravidla rozlišení HD, 1280×720px), což při zmenšení na malé displeje způsobuje ztrátu kvality.
## Značky
Pod každým projektem najdete sadu značek. Ty Vám rychle poví, jak rychle projekt poběží, jaké vykreslování používá a jaký vstupní vektor je použit v šumovém algoritmu. Tady je krátký slovník:
- **![Úvod](CompassNW):** Projekty, které popisují úplné základy. Najdete zde jeden úvodní projekt pro 1D, 2D a 3D.
- **![Praktická část](Education):** Projekty, které jsou součástí praktické části [bakalářské práce](/thesis).
- **![P2D](MapLayers):** Projekt využívá základní vykreslování P2D. Takovéto projekty nejsou zpravidla příliš výpočetně náročné a nepoužívají grafické jádro Vašeho zařízení.
- **![WebGL](ProductVariant):** Projekt k vykreslování používá grafickou knihovnu WebGL. Ta umožňuje využít výpočetní síly grafického jádra Vašeho zařízení a je vyžadována pro 3D vykreslování. (Také je občas využívána pro zrychlení náročných 2D projektů.)
- **![Rychlý](StorageOptical)** projekt nejspíš rozjedete i na kalkulačce.
- **![Náročný](SpeedHigh)** projekt vyžaduje výkonné zařízení a/nebo více času na vypočítání. U takových projektů zpravidla najdete nastavení kvality; čím vyšší kvalita, tím vyšší nároky na výkon/čas.
- **![1D](GridViewLarge):** Jako vstup je použit jednorozměrný vektor a výstupem je výška.
- **![2D](GridViewMedium):** Jako vstup je použit dvourozměrný vektor a výstupem je výška nebo barva.
- **![3D](GridViewSmall):** Jako vstup je použit trojrozměrný vektor a výstup se pěkně blbě vykresluje.

Máme také značky pro programátory, které značí, jak komplikovaný je algoritmus daného projektu:
- **![Jednoduchý](Sunny)** algoritmus bude vhodný pro začátečníky; je dobře srozumitelný a nepoužívá složité operace.
- **![Střední](Cloudy)** algoritmus již pracuje s komplexnějšími operacemi. Zkušení programátoři by mu neměli mít problém porozumět i bez jeho předchozí znalosti.
- **![Složitý](Thunderstorms)** algoritmus používá složité operace a algoritmy a i zkušeným programátorům bude trvat delší dobu, aby mu porozuměli, nebo si budou muset vyhledat vysvětlení aplikovaných algoritmů.

Projekt označený jako **![Komentovaný](Comment)** má plně popsaný zdrojový kód, včetně funkcí knihovny [p5.js](https://p5js.org). Tuto značku uvidíte zpravidla u jednoduchých projektů, protože jsem většinou příliš líný na to komentovat složité algoritmy. Všechny zdrojové kódy jsou komentované anglicky.
