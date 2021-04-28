> ![Praktická část](Education), ![3D](GridViewSmall), ![P2D](ProductVariant), ![Náročný](SpeedHigh)  
> ![Střední](Cloudy)
# Spořič obrazovky
Ano, funguje to, jen tomu dejte pár vteřin 😊.

Spořičům obrazovek dal svět počítačů sbohem už před pár lety, vzpomínky ale zůstavají a některé z nich byly _prostě cool_ 😎. Tento projekt ukazuje procedurálně generovaný spořič obrazovky, který, přirozeně, používá gradientní šum.

Tisíce až miliony **částic** se základními fyzikálními vlastnostmi (pozicí, rychlostí a zrychlením) jsou rozprostřeny po plátně a každý snímek se na pixel, na kterém zrovna leží, otisknou barvou. To, jak se pohybují, je způsobeno vekteorovým polem na pozadí.

Vektorové pole je zde mřížka, v jejíž každé buňce je umístěný někam směřující vektor. Ten působí na všechny částice v této buňce - přidává jim zrychlení ve svém směru. Je to jako kdyby v každé takovéto buňce byl větrák, který směřujě nějakým směrem a odfoukává jím všechno ve své buňce. Tyto vektory se ale navíc mění v čase. Jelikož jsou generované gradientním šumem, sousední vektory mají vždy podobné směry. Přidáním třetího vstupu - času - šumové funkci se vektory (větráky) pomalu otáčejí a vektorové pole se pomalu, plynule mění.
## Ovládací prvky
- **Počet částic** určuje, kolik částic je použito pro kreslení.
- **Síla pole** říká, jak moc vektorové pole ovlivňuje částice - jak velkou má sílu.
- **Rozlišení pole** je hustota mřížky, kolik buněk na šířku krát kolik buněk na výšku pole má. Vyšší rozlišení znamená více menších buněk.
