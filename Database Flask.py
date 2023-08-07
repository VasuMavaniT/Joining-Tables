from flask import Flask, request
import json
from flask_cors import CORS
import random 
import psycopg2

APP_PORT = 7777

app = Flask(__name__)
CORS(app) 


def list_all_tables(table_name):
    try:
        # Replace the following variables with your PostgreSQL database credentials
        dbname = 'images'  # Change this to your actual database name
        user = 'vasumavani'
        password = '3R@y@)@#'
        host = 'localhost'
        port = '5432'  # Default PostgreSQL port is 5432

        # Connect to the PostgreSQL database
        connection = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port
        )

        # Create a cursor object to interact with the database
        cursor = connection.cursor()

        # Query to retrieve all table names with their schema names from information_schema
        # Filter the results to fetch only tables from the 'images' schema
        query = "SELECT table_name FROM information_schema.tables WHERE table_type='BASE TABLE' AND table_schema='public';"

        # Execute the query
        cursor.execute(query)

        # Fetch all the rows from the result set
        table_names = cursor.fetchall()

        result = {}
        for table in table_names:
            table_name = table[0]

            # Query to retrieve column information from information_schema
            column_query = f"SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = '{table_name}';"

            # Execute the column query
            cursor.execute(column_query)

            # Fetch all the columns from the result set
            columns = cursor.fetchall()

            table_info = []
            for column in columns:
                column_name = column[0]
                data_type = column[1]
                is_nullable = column[2]
                column_info = {
                    "Column Name": column_name,
                    "Data Type": data_type,
                    "Nullable": "Yes" if is_nullable == 'YES' else "No"
                }
                table_info.append(column_info)

            result[table_name] = table_info

        # Don't forget to close the cursor and connection when you're done
        cursor.close()
        connection.close()

        file_path = "Database.json"

        with open(file_path, 'w') as outfile:
            json.dump(result, outfile, indent=4)

        return result[table_name]

    except Exception as e:
        print("Error:", e)

@app.route('/table')
def getting_table_schema():
    table_name = request.args.get('table_name')
    json_data = list_all_tables(table_name)
    return json_data

if __name__ == '__main__':
    app.run(port=APP_PORT, debug=True)
