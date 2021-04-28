> ![Praktická část](Education), ![2D](GridViewMedium), ![P2D](MapLayers), ![Rychlý](StorageOptical)  
> ![Střední](Cloudy)
# Květ
Gradientní šum má jedno velmi zajímavé využití, a to změnit libovolný geometrický tvar (nebo i jiné věci) tak, že vypadají jako nakreslené rukou. Projekt Květ využívá tohoto efektu, pokud se tímto způsobem totiž upraví kružnice a poté se z ní udělá několik soustředných "kružnic" (zde označených jako vrstev), výsledek připomíná květinu.

Hlavním zdrojem změny je zde **krok**, můžete si vyzkoušet, že při nízkém kroku vypadá květ jen jako několik soustředných kružnic, s vyšším **krokem** se ale tyto kružnice hezky zvlní.

Skalární a vektorovou **transformaci** nemá příliš smysl vysvětlovat, ne, protože by to nebylo zajímavé, ale protože se jednalo pouze o experiment, který náhodou dal zajímavý výsledek. Kde skalární **transformace** stále udržuje jakousi celkovou plochost květu, při vektorové **transformaci** nastává chaos a při některých nastaveních **kroku** výsledek může připomínat velmi abstraktní květinu.
## Ovládací prvky
- **Počet vrstev** udává počet soustředných kružnic, ze kterých se květ skládá - více vrstev dělá větší květ.
- **Odstup vrstev** je velikost mezery mezi soustřednými kružnicemi - větší odstup dělá opět větší květ.
- **Krok** určuje, o kolik je změněna vstpní hodnota šumové funkce při každém posunu o 1° v kružnici.
- **Animace** zapíná a vypíná lehkou rotaci a pomalou změnu květu.
- **Transformace** přepíná mezi vcelku normálním efektem květu a chaosem.
