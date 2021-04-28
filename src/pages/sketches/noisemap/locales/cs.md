> ![Úvod](CompassNW), ![2D](GridViewMedium), ![P2D](MapLayers), ![Náročný](SpeedHigh)  
> ![Jednoduchý](Sunny)
# Šumová mapa
Tento projekt navazuje na [Start](/sketches/start).

Tento obrázek je vygenerován prakticky stejným způsobem, jako byl v předchozím projektu, zde se ale šum vyhodnocuje v obou osách, ne jen v jedné. Navíc, abychom mohli hodnoty šumu vykreslit, je místo výšky použita sytost barvy - čím více červený pixel, tím vyšší hodnota šumu. Pokud bychom si například vzali jednu řadu pixelů z tohoto obrázku a předělali hodnoty opět na výšku, získaný výstup by zhruba odpovídal výstupu předchozího projektu. Stejně tak bychom ale mohli vzít _sloupec_ pixelů a provést stejnou věc - opět podobný výsledek. Gradientní šum můžeme vyhodnotit v 1D, jako v projektu předchozím, ve 2D, jako je zde, ale i ve 3D a dokonce i ve vyšších rozměrech. Všude bude vypadat podobně a hodnoty se budou měnit plynule ve všech směrech.

Zkuste si pohrát s **krokem**, opět, jako v minulém projektu, budou přechody mezi hodnotami (barvami) pozvlonější a hladší. Můžete si také nastavit vyšší **kvalitu** - ve výchozím nastavení je nízká, protože přestože vyhodnocení šumu není příliš pomalé, vyhodnocení několiksettisíckrát už nějakou dobu trvá. Opatrně s nejvyšší kvalitou, ta zabere i několik vteřin.
## Ovládací prvky
- **Krok** stále odpovídá změně vstupní hodnoty šumové funkce při posunu o jeden pixel, tentokrát ale v obou osách (_&#916;x_ i _&#916;y_).
- **Kvalita** udává velikost pixelů. Jelikož je šumová funkce vyhodnocována v každém pixelu, menší pixely znamenají, že jich je méně, tedy je méně vyhodnocení šumu a rychlejší vykreslování.
