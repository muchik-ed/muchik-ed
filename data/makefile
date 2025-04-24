DB:=./data.sqlite

run:
	sqlite3 -box $(DB) "select count(key) from sources;"
	sqlite3 -box $(DB) "select count(id) from words;"

rm-duplicates:
	sqlite3 $(DB) < ./remove-duplicates.sql

backup:
#	sqlite3 $(DB) .dump > backup.sql

	sqlite3 $(DB) -json "select * from sources;" > sources.data.json
	sqlite3 $(DB) -json "select muchik, spanish from words;" > words.data.json

	sqlite3 $(DB) -csv "select * from sources;" > sources.data.csv
	sqlite3 $(DB) -csv "select row_number() over () as id, muchik, spanish from words;" > words.data.csv

restore:
#	sqlite3 $(DB) < ./backup.sql

	sqlite3 $(DB) < ./tables.sql
	sqlite3 $(DB) < ./import-csv.sql

clean:
	rm -f $(DB)
