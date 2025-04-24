import sqlite3
from urllib.parse import unquote

def decode_uri_component(value):
    return unquote(value)

conn = sqlite3.connect('./shared/muchik.sqlite')
conn.create_function("decodeURIComponent", 1, decode_uri_component)

cursor = conn.cursor()
cursor.execute("""
    update words set
        muchik = decodeURIComponent(muchik),
        spanish = decodeURIComponent(spanish);
""")
conn.commit()
conn.close()
