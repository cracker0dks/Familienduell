# Familienduell
Familienduell Client / Server (NodeJs Javascript)

### START DES SERVERS!

1.1 Im Ordner "server" die Datei StartServer.bat doppelklicken.

1.2 Im Fenster das jetzt erscheint sollte: "Websocket Server running at ws://127.0.0.1:8080" stehen.

1.3 Falls die Firewall fragt, solltest du die Anfrage zulassen da sonst der client nicht verbinden kann.

### START DES CONTROLLERS!

2.1 in den Ordner "web" wechseln und die datei "index.html" mit dem Browser (Chrome) öffnen! (Dieses Programm wurde für Chrome entwickelt und sonst nicht getestet.)

2.2 Wenn der Browser auf dem gleichen PC läuft wie der Server einfach start klicken, ansonsten die IP-Adresse anpassen.

2.3 (Oben links, in der Ecke des Browsers, sollte nun entwas in der Art "Verbunden mit: ws://127.0.0.1:8080" stehen.)

2.4 Auf den Controller Button klicken.

### Start des Displays

Alle Schirtte aus "START DES CONTROLLERS!" in einem neuen Browserfenster ausführen. Bei 2.4 auf display klicken.


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

---------------------------

Fragen an: rofl256@googlemail.com

Programmierung: cracker aka rofl256
Unterstützt durch: DiggerTigger, Anni & Naseile
