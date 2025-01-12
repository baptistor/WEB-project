#!/bin/bash

stop_back() {
    echo "Arrêt du serveur back"
    cd fr-administration
    npm stop
    echo "Serveur back arrêté"
}

stop_front() {
  
    FRONT_PID=$(ps -ef | grep "ng serve" | grep -v "grep" | awk '{print $2}')

    echo "Arrêt du serveur front"
    kill $FRONT_PID
    echo "Serveur front arrêté"
}

stop_back
stop_front
