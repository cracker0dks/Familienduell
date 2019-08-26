# Familienduell

![logo](./web/img/logo.png)

Familienduell Client / Server (NodeJs Javascript)

### -A- START DES SERVERS!

___Windows___

1. Im Ordner "server" die Datei StartServer.bat doppelklicken.
   * Im Fenster das jetzt erscheint sollte: "SERVER IS UP AND RUNNING" stehen.
   * Falls die Firewall fragt, solltest du die Anfrage zulassen da sonst der Client nicht verbinden kann.

___Mac___

1. Installiere NodeJs und npm (https://nodejs.org/en/download/)

2. starte die (mac) konsole und wechsle in den Serverordner

3. installiere das Websocketmodul (ws)
`npm install ws`

4. Starte den Server
`node server.js`

5. In der Console erscheint: "SERVER IS UP AND RUNNING"

### -B- START DES CONTROLLERS!

1. Browser öffnen und zur Adresse: http://127.0.0.1:8080 surfen

2. Auf den Controller Button klicken.

### -C- Start des Displays

1. In einem neuen Browserfenster/tab verbinden und auf "Display" klicken.


---------------------------

### FAQs:
Q: Warum ist das Display zu Beginn schwarz, und wie kann ich das ändern?   
A: Das Bild ist schwarz damit man die Intromusik starten kann und die Leute (Zuschauer) nicht schon vorher wissen was auf sie zukommt.
   Dies kann (Im Controller) über die Checkbox "Blackscreen", im Bereich "Intro" kontrolliert werden.

Q: Wie funktioniert das mit 2 oder mehr Geräten?   
A: Alle Geräte müssen im gleichen Netzwerk sein. Dann verwende einfach eine Externe IP des Servers (aus dem Serverfenster) zum verbinden von einem anderen Gerät aus.

Q: Läuft der Server mit nodeJs auch unter Linux / Läuft der Python Server auch unter Windows?    
A: Ja, dafür müssen jedoch zunächst die etsprechenden Abhänigkeiten installiert werden.

Q: Gibt es eine Funktion um Leuten über einen Link direkt das Zuschauen zu ermöglichen?   
A: Ja. Der Link lautet: http://SERVERURL/PFAD/index.html?viewonly=true (SERVERURL und PFAD anpassen!)

Q: Ich erhalten im Serverfenster den Fehler: Error: listen EADDRINUSE   
A: Eine andere Anwendung blockiert bereits den Port. Beende diese und starte den Server erneut

Q: Ich habe sonstige Fehler bei (Anzeige, Verbindungsaufbau, Anwendungsverhalten)   
A: Falls du einen anderen Browser als Google Chrome verwendest, installiere Chrome.

Sonstige Fragen, Fehlermeldungen, Beschwerden oder auch Spenden (Paypal) per Mail an: raphael.fritsch@gmx.de

---------------------------

Programmierung: cracker
Unterstützt durch: DiggerTigger, Anni & Naseile

Danke auch an: 
 * [flbe](https://github.com/flbe) für den Python Server
 * [susgo](https://github.com/susgo) für den Finalmodus
 * [ConvalAtGit](https://github.com/ConvalAtGit) für viele Verbesserungen, Redesign und zusätzliche Word und Excel Dokumente
 * [fruitcoder](https://github.com/fruitcoder/) Design verbesserungen