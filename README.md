# Familienduell
Familienduell Client / Server (NodeJs Javascript)

### -A- START DES SERVERS!

___Windows mit NodeJs___

1. Im Ordner "server" die Datei StartServer.bat doppelklicken.
2. Im Fenster das jetzt erscheint sollte: "Websocket Server running at ws://127.0.0.1:8080" stehen.
3. Falls die Firewall fragt, solltest du die Anfrage zulassen da sonst der client nicht verbinden kann.

___Linux mit Python___

1. Installiere Pyton3 mit pip und git
`sudo apt-get install python3 python3-pip git -y`

2. Installiere Websockets für Python3
`pip3 install asyncio websockets`

3. Servercode downloaden
`git clone https://github.com/cracker0dks/Familienduell.git`

4. Ins Serververzeichnis wecheseln
`cd Familienduell/Server`

5. Starte den Server
`python3 server.py`

6. In der Console erscheint: "info>starting server 0.0.0.0:8080"

___Mac mit NodeJs___

1. Installiere NodeJs und npm (https://nodejs.org/en/download/)

2. starte die (mac) konsole und wechsle in den Serverordner

3. installiere das Websocketmodul (ws)
`npm install ws`

4. Starte den Server
`node server.js`

5. In der Console erscheint: "Websocket Server running at ws://127.0.0.1:8080"

### -B- START DES CONTROLLERS!

1. in den Ordner "web" wechseln und die datei "index.html" mit dem Browser (Chrome) öffnen! (Dieses Programm wurde für Chrome entwickelt und sonst nicht getestet.)

2. Wenn der Browser auf dem gleichen PC läuft wie der Server einfach start klicken, ansonsten die IP-Adresse anpassen.

3. (Oben links, in der Ecke des Browsers, sollte nun entwas in der Art "Verbunden mit: ws://127.0.0.1:8080" stehen.)

4. Auf den Controller Button klicken.

### -C- Start des Displays

1. Alle Schirtte aus "START DES CONTROLLERS!" in einem neuen Browserfenster ausführen. Dann bei Punkt 4. auf display klicken.


---------------------------

### FAQs:
Q: Warum ist das Display zu Beginn schwarz, und wie kann ich das ändern?   
A: Das Bild ist schwarz damit man die Intromusik starten kann und die Leute (Zuschauer) nicht schon vorher wissen was auf sie zukommt.
   Dies kann (Im Controller) über die Checkbox "Blackscreen", im Bereich "Intro" kontrolliert werden.

Q: Ich kann keine Fragen editieren, was ist da los?   
A: Diese Anwendung wurde für den Browser Google Chrome entwickelt. Warscheinlich verwendest du Firefox.

Q: Wie funktioniert das mit 2 Rechnern?   
A: Step by Step: 
	PC1 = controller und Server
	PC2 = display

    1. PC 1 muss im gleichen Netztwerk  (Wlan / LAN) sein wie PC 2.
    2. Kopiere alle Dateien auf beide PCs
    3. starte den Server auf PC1
    4. Starte den controller auf PC1 (So wie sonst auch immer mit IP: 127.0.0.1)
    5. Nun musst du die LAN IP-Adresse von PC1 herrausfinden. Anleitung hier: http://www.tippscout.de/windows-xp-ip-adresse-des-computers-ermitteln-und-herausfinden_tipp_2676.html
    6. Nun startest du das Display auf pc2 trägst aber statt "127.0.0.1" die IP-Adresse von pc1 ein (Die Adresse sollte mit "192.168." beginnen)
    7. Los gehts :)
    
Q: Läuft der Server mit nodeJs auch unter Linux / Läuft der Python Server auch unter Windows?    
A: Ja, dafür müssen jedoch zunächst die etsprechenden Abhänigkeiten installiert werden.

Q: In der letzten Version waren die Fragen in der Fragen.txt noch im Klartext gespeichert, was ist passiert?   
A: Da Linux mit Umlauten nicht umgehen kann werden die Fragen Base64 encoded abgelegt.

Q:  Wie kann ich meine Alten Fragen (Klartext) in das neue System (Base64) übertragen?   
A: Wandle den Inhalt deiner fragen.txt in Base64. Dies geht einfach online:  https://www.base64encode.org/ . Überschreibe anschließend deine Fragen.txt mit dem neuen Inhalt. Fetig.

---------------------------

Fragen an: rofl256@googlemail.com

Programmierung: cracker aka rofl256
Unterstützt durch: DiggerTigger, Anni & Naseile

Danke an: [flbe](https://github.com/flbe) für den Python Server
