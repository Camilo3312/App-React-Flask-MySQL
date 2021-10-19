import re
from flask import Flask, json, jsonify, request
from flask_mysqldb import MySQL, MySQLdb 
from flask_cors import CORS

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'bideq9zsednqkzpi5t2w-mysql.services.clever-cloud.com'
app.config['MYSQL_USER'] = 'uqbvtgtgnzvott7h'
app.config['MYSQL_PASSWORD'] = '5Si6qCqhHMhCawZyXHQT'
app.config['MYSQL_DB'] = 'bideq9zsednqkzpi5t2w'

CORS(app)

mysql = MySQL(app)

app.secret_key = 'mysecretkey'

@app.route('/users')
def getUsers():
    cursor = mysql.connection.cursor()
    cursor.execute("select * from datas")
    datas = cursor.fetchall()
    return jsonify(datas)

@app.route('/users', methods=['POST'])
def addUsers():
    datas = request.json
    try:
        cursor = mysql.connection.cursor()
        cursor.execute(f"insert into datas (name, email, phone, image) values ('{datas['name']}', '{datas['email']}', '{datas['phone']}', '{datas['image']}')")
        mysql.connection.commit()
        
        return jsonify({"message":"user add sucsesfully"})

    except Exception as ex:
        return jsonify({"message":"error, email already exist", "data": datas})

@app.route('/user/<int:id>', methods=['GET'])
def getUser(id):
    cursor = mysql.connection.cursor()
    cursor.execute(f"select * from datas where id = {id}")
    user = cursor.fetchone()
    return jsonify(user)

@app.route('/users/<int:id>', methods=['DELETE'])
def deleteUsers(id):  
    cursor = mysql.connection.cursor()
    cursor.execute(f"delete from datas where id = {id}")
    mysql.connection.commit()
    return jsonify({"message":"user deleted sucsesfully"})

@app.route('/users/<int:id>', methods=['PUT'])
def updateUsers(id):  
    datas = request.json
    cursor = mysql.connection.cursor()
    cursor.execute(f"update datas set name = '{datas['name']}', email = '{datas['email']}', phone = '{datas['phone']}', image = '{datas['image']}' where id = {id} ")
    mysql.connection.commit()

    return jsonify({"message":"user update sucsesfully"})

@app.route('/products')
def getProductos():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute(f"select * from services")
        services = cursor.fetchall()
        return jsonify(services)
    except:
        return jsonify({"message":"Error getting products"})

@app.route('/validateuser', methods=['POST'])
def validateUsers():
    datas = request.json
    try:
        cursor = mysql.connection.cursor()
        cursor.execute(f"select * from datas where email = '{datas['email']}' and phone = '{datas['phone']}' ")
        datas = cursor.fetchone()

        if datas != None:
            return jsonify({"message":datas})
        else:
            return jsonify({"message":False})      

    except Exception as ex:
        return jsonify({"message":ex})


if __name__=='__main__':
    app.run(port = 4000, debug = True)