# Stappen
1. Ik begin altijd met het declareren van globale variablen in CSS. Ik heb gekeken naar het lettertype en de kleuren op de website van Vitens, die ik vervolgens heb gebruikt in mijn CSS. Het font heb ik van Google Fonts geimporteerd.
2. Daarna heb ik een general markup van de HTML pagina gemaakt, met header en main tags. Ook heb ik een aantal standaard CSS klasses gedefineerd, zoals row, bold, center-align, etc. die ik overal in de HTML kan gebruiken.
3. Vanuit daar werk ik van boven naar beneden: eerst de header, navigatie, dan knoppen, grafieken en daaronder knopjes en tekst.
4. Daarna werk ik aan de CSS: ik begin met een eventlistener voor DOMContentLoaded, en voeg daarin eventlisteners toe voor elementen waar je op kan klikken. Ook creeer ik alle drie de grafieken (per uur, per dag en per maand), maar laat ik alleen per dag alvast zien. De rest krijgt een "hidden" CSS klasse.
5. Daarna heb ik gewerkt aan de bar plot. Ik ben in de D3 documentatie gedoken en de grafieken geprobeerd te namaken van de screenshots. Hiervoor had ik data nodig, dus ik heb met Python een waterverbruik die een chi-square verdeling (met 6 df) volgt nagemaakt en in een CSV bestand opgeslagen. Hierna heb ik geagregeerd op dagelijks en maandelijkse waardes en dit opgeslagen in een JSON. Deze JSON wordt door D3 ingelezen.
6. Op het einde heb ik aan de details gewerkt, zoals de teksten die net boven de charts te zien zijn en de labels van de grafieken. 