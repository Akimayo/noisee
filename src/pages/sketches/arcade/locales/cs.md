> ![Praktická část](Education), ![2D](GridViewMedium), ![WebGL](ProductVariant), ![Rychlý](StorageOptical)  
> ![Jednoduchý](Sunny), ![Komentovaný](Comment)
# Arkádový svět
Arkádové RPG hry často měly svět sestavený z nějakých polí, po kterých se vaše postavička pohybovala, hledala úkoly, "lootovala" poklady a stínala hlavy nepřátelům. Tyto světy byly vždy předem připravené vývojáři, což dává smysl - navrhli perfektní svět pro zamýšlený zážitek ze hry. Tento projekt ukazuje možnost procedurálně generovat takovéto světy pomocí gradientního šumu.

Svět je zde vygenerován ze [šumové mapy](/sketches/noisemap), kde je ale každý pixel jedno herní pole. Každé pole má tedy přiřazenou nějakou hodnotu, ať už je to barva nebo výška. Porovnáním této hodnoty s nějakým prahem můžeme jednoduše odlišit různé oblasti hodnot - zde máme například **práh vody**, pod jehož hodnotou jsou všechna pole voda, a **práh hor**, nad jehož hodnotou jsou všechna pole hory. Když si zkusíte s těmito prahy zahýbat, uvidíte, jak se přibývá nebo ubývá voda a přibývají nebo ubývají hory.

Po světě se můžete také pohybovat a prozkoumávat jej, stačí klikat na šipky. Úkoly ani nepřátele zde ale nenajdete, největším nepřítelem vám budou hory a moře.
## Ovládací prvky
- **Postava se může pohybovat** buďto jen po rovině, nebo se vybaví plaveckým kruhem a teplou čepicí a může se jak plavit na moři, tak zdolávat hory.
- Šipky umožňují pohybovat se po herním světě.
- **Práh vody** a **Práh hor** prakticky udávají, kolik vody a kolik hor se ve světě nachází.
- **Velikost pole** udává, jak velká jsou herní pole. Menší herní pole představují prakticky oddálení světa, je z něj vidět více najednou.
- **Měřítko** je krok šumem a v podstatě svět roztahuje nebo zmenšuje. Chcete hrát za obra? Nastavte vyšší měřítko a z moře se stane louže.
