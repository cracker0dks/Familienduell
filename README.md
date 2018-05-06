# Familienduell

![logo](./web/img/logo.png)

Familienduell Client / Server (NodeJs Javascript)

#### Für eine Bilderanleitung hier klicken: [Bilderanleitung](bilderanleitung)

### -A- START DES SERVERS!

___Windows___

1. Im Ordner "server" die Datei StartServer.bat doppelklicken.
   * Im Fenster das jetzt erscheint sollte: "Websocket Server running at ws://127.0.0.1:8080" stehen.
   * Falls die Firewall fragt, solltest du die Anfrage zulassen da sonst der client nicht verbinden kann.

___Mac___

1. Installiere NodeJs und npm (https://nodejs.org/en/download/)

2. starte die (mac) konsole und wechsle in den Serverordner

3. installiere das Websocketmodul (ws)
`npm install ws`

4. Starte den Server
`node server.js`

5. In der Console erscheint: "Websocket Server running at ws://127.0.0.1:8080"

### -B- START DES CONTROLLERS!

1. in den Ordner "web" wechseln und die datei "index.html" mit dem Browser (Chrome / Firefox) öffnen! (Dieses Programm wurde für Chrome entwickelt und wird nur dort getestet.)

   * Wenn der Browser auf dem gleichen PC läuft wie der Server einfach start klicken, ansonsten die IP-Adresse anpassen.

   * (Oben links, in der Ecke des Browsers, sollte nun entwas in der Art "Verbunden mit: ws://127.0.0.1:8080" stehen.)

4. Auf den Controller Button klicken.

### -C- Start des Displays

1. Alle Schirtte aus "START DES CONTROLLERS!" in einem neuen Browserfenster ausführen. Dann bei Punkt 4. auf display klicken.


---------------------------

### FAQs:
Q: Warum ist das Display zu Beginn schwarz, und wie kann ich das ändern?   
A: Das Bild ist schwarz damit man die Intromusik starten kann und die Leute (Zuschauer) nicht schon vorher wissen was auf sie zukommt.
   Dies kann (Im Controller) über die Checkbox "Blackscreen", im Bereich "Intro" kontrolliert werden.

Q: Wie funktioniert das mit 2 oder mehr Geräten?   
A: Step by Step: 

    1. Alle Geräte müssen sich im selben Netzwerk (LAN/W-Lan) befinden 
    2. Kopiere alle Dateien auf alle Geräte
    3. Starte den Server
    4. Die IP Adresse des Servers wird nach dem Start im Serverfenster unter "From different networks" angezeigt. (sollt mit 192.168. beginnen)
    5. Starte den Controller & Displays auf beliebigen Geräten, aber verwende beim verbinden jetzt die Server IP (Nicht 127.0.0.1)
    6. Los gehts :)
    
Q: Läuft der Server mit nodeJs auch unter Linux / Läuft der Python Server auch unter Windows?    
A: Ja, dafür müssen jedoch zunächst die etsprechenden Abhänigkeiten installiert werden.

Q: Gibt es eine Funktion um Leuten über einen Link direkt das Zuschauen zu ermöglichen?   
A: Ja. Der Link lautet: http://SERVERURL/PFAD/duell.html?ip=SERVERIP (SERVERURL, PFAD und SERVERIP anpassen!)

Q: Ich habe sonstige Fehler bei (Anzeige, Verbindungsaufbau, Anwendungsverhalten)   
A: Falls du einen anderen Browser als Google Chrome verwendest, installiere Chrome.

Q: Ich habe sonstige Probleme oder Fragen...
A: Fragen, Fehlermeldungen, Beschwerden per Mail an: rofl256@googlemail.com
---------------------------

Programmierung: cracker aka rofl256
Unterstützt durch: DiggerTigger, Anni & Naseile

Danke auch an: 
 * [flbe](https://github.com/flbe) für den Python Server
 * [susgo](https://github.com/susgo) für den Finalmodus
