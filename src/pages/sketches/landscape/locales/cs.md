> ![Praktická část](Education), ![3D](GridViewSmall), ![WebGL](ProductVariant), ![Náročný](SpeedHigh)  
> ![Střední](Cloudy)
# Krajina
Terén, voda i mraky v tomto projektu jsou vygenerovány gradientním šumem. Zajímavé? Velmi. Generování krajin je pravděpodobně nejznámnějším využitím procedurálně generovaných gradientních šumů - [_Minecraft_](https://minecraft.net) takto generuje každý herní svět.

Přestože se zde jedná od 3D scénu, terén samotný je generovaný 2D šumem - [šumovou (výškovou) mapou](/sketches/noisemap). Terén v podstatě začíná jako rovina, pro kterou je dále vygenerována šumová mapa, kde hodnota šumu udává výšku terénu. Tím z plochy vzniká relativně realisticky vypadající terén.

Stejným způsobem je generován i povrch vody, ten však využívá 3D šum, jelikož se voda mění v čase. Plus je vodě přidán vítr, který tvoří vlny, ten ale vzhledem k omezenému detailu není příliš výrazný - s **drátovým modelem** je výraznější, ale pozor, **drátový model** výrazně zpomalí celý webový prohlížeč. Pokud vodu nevidíte, zkuste se šipkami posunout na jinou část terénu.

Mraky jsou tímto způsobem generované také a také se mění v čase, u nich je ale použita špetka magie (čtěte: matematiky) na to, aby se v dálce (logaritmicky) zakřivovaly dolů a pokryly celé nebe. Můžete si je zkusit vypnout v **součástech** a mít krajinu při nezamaračeném dni.

Terén je vykreslovaný trojúhelníkovou teselací, tedy všechny plochy jsou vytvořené z trojúhelníků. Toto je lépe vidět na **drátovém modelu**, ale opět, opatrně s ním. Tyto teselační trojúhelníky jsou poskládané tak, aby pokryly celou plochu (resp. její zobrazovanou část), a vytrasovaly hodnoty výškové mapy. Vyšší **jemnost teselace** tyto trojúhelníky zmenší, čímž vede k hladšímu povrchu, ale menší trojúhelníčky znamenají, že jich musí být více, tedy se projekt stává pomalejší. Kolikráz za sekundu se scéna stihne vykreslit mlžete zjistit zaškrtnutím **FPS**.
## Ovládací prvky
- **FPS** zapne sledování frekvence, se kterou se scéna stíhá vykreslovat.
- **Součásti** zapínají nebo vypínají vykreslování terénu, vody a mraků.
- **Drátový model** přeíná mezi zobrazením s plným materiálem a drátovým modelem krajiny.
- Šipky umožňují se po krajině pohybovat.
- **Hloubka scény** Udává hloubku, do které se scéna vykresluje - jak daleko je vidět.
- **Jemnost teselace** nastavuje délku základny teselačních trojúhelníků.
