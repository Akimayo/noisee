> ![Praktická část](Education), ![2D](GridViewMedium), ![P2D](MapLayers), ![Rychlý](StorageOptical)  
> ![Jednoduchý](Sunny), ![Komentovaný](Comment)
# Interference
V elektrotechnice je běžné pracovat s různými vlnovými signály. V běžné elektrické síti je to sinus, v digitálních aplikacích hlavně obdélník, k základům pak patří ještě pila, trojúhelník a konstantní funkce. Vždy je dobrý důvod použít danou funkci - sinus v síti kvůli minimalizaci ztrát, obdélní v digitální elektronice kvůli synchronizaci. V reálněm světě jsou tyto funkce ale vždy nějakým způsobem nedokonalé - ať už nedokonalostí generátoru nebo všudypřítomným elektromagnetickým rušením. Projekt Interference ukazuje, jak vypadají tyto základní vlnové funkce, pokud se k nim přidá nějaké rušení. To je zde simulováno gradientním šumem. Vždy je vygenerována čistá vlnová funkce s pevně danou frekvencí, ke které je gradientní šum přičten (interferován).

Šumová funkce zde jako parametr používá čas. Díky tomu lze ukázat jednu z dalších vlastností gradientního šumu: je nekonečný ve všech rozměrech. Pokud necháme projekt běžet, stále se bude generovat další a další šum. Ve skutečnosti se tedy tento šum také opakuje, jeho perioda je ale v porovnání s zobrazovaným úsekem velmi dlouhá a nelze ji poznat. Pokud si zvolíte konstantní **funkci** a zvýšíte **sílu rušení**, můžete se kochat čistým _Perlin Noise_.

Při zvolení jiné vlnové **funkce** ale můžete vidět, jak ji různě **silné rušení** mění a zkresluje, často až k nerozeznání. Zde se vracíme k elektrotechnice, kde lze potenciálně tímto způsobem simulovat rušení signálu.

U šumu můžeme ještě zvolit počet **oktáv**. Oktáva je v podstatě vrstva šumu, která je pak sečtena se všemi ostatními. První oktáva má určitou danou "frekvenci" (krok) a amplitudu. Druhá oktáva zpravidla mívá poloviční krok a amplitudu, třetí oktáva čtvrtinovou, třetí osminovou atd. Sečtením všech oktáv se šumu přidá více drobného detailu - vyzkoušejte si zvolit postupně jednu, dvě a více **oktáv**!
## Ovládací prvky
- **Síla rušení** určuje amplitudu šumu a tedy sílu vlivu, jaký bude mít šum na vlnovou funkci.
- **Oktávy** udávají počet "vrstev" šumu a umožňují získat šum s drobnějšími detaily.
- **Funkce** nabízí výběr mezi pěti základními vlnovými funkcemi.
