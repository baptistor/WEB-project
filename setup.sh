#!/bin/bash

LOG_DIR="./log"
mkdir -p "$LOG_DIR"

build_process() {
    CMD=$1
    LOG_FILE=$2

    bash -c "$CMD" > "$LOG_FILE" 2>&1
}

echo "Setup du backend (NestJS)"
BACKEND_DIR="fr-administration"
BACKEND_LOG="$LOG_DIR/setup-backend.log"
build_process "cd $BACKEND_DIR && npm install" "$BACKEND_LOG"

echo "Setup du frontend (Angular)"
FRONTEND_DIR="fr-administration-front"
FRONTEND_LOG="$LOG_DIR/setup-frontend.log"
build_process "cd $FRONTEND_DIR && npm install" "$FRONTEND_LOG"

echo "Setup terminée pour le backend et le frontend."
