#!/bin/bash

LOG_DIR="./log"
mkdir -p "$LOG_DIR"

start_process() {
    CMD=$1
    LOG_FILE=$2

    bash -c "$CMD" > "$LOG_FILE" 2>&1 &
}

echo "Démarrage du serveur back"
BACK_CMD="cd fr-administration && npm start"
BACK_LOG="$LOG_DIR/back.log"
BACK_PID=$(start_process "$BACK_CMD" "$BACK_LOG")
if [ $? -eq 0 ]; then
    echo "Serveur back démarré avec succès"
else
    echo "Erreur lors du démarrage du serveur back. Consultez le fichier de log pour plus de détails"
    tail -n 10 "$BACK_LOG"
fi

echo "Démarrage du serveur front"
FRONT_CMD="cd fr-administration-front && ng serve --open"
FRONT_LOG="$LOG_DIR/front.log"
FRONT_PID=$(start_process "$FRONT_CMD" "$FRONT_LOG")
if [ $? -eq 0 ]; then
    echo "Serveur front démarré avec succès"
else
    echo "Erreur lors du démarrage du serveur front. Consultez le fichier de log pour plus de détails"
    tail -n 10 "$FRONT_LOG"
fi

echo "Les serveurs sont maintenant en cours d'exécution"
#!/bin/bash

# Afficher un lien cliquable vers http://localhost:4200/
echo -e "\033]8;;http://localhost:4200/\033\\http://localhost:4200/\033]8;;\033\\"
