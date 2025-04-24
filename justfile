set shell := ["bash", "-c"]

run:
	python3 -m http.server

shared:
    cp ./data/data.sqlite ./shared/muchik.sqlite
    cp ./data/data.sqlite ./shared/
    python3 ./app/shared.py
