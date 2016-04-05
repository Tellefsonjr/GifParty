from system.core.model import Model
from flask import flash
import re
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9\.\+_-]+@[a-zA-Z0-9\._-]+\.[a-zA-Z]*$')
PASS_REGEX = re.compile(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$')

class Dojoparty_Model(Model):
    def __init__(self):
        super(Dojoparty_Model, self).__init__()

    def add(self, new_user):
        errors = []
        if len(new_user['first_name']) < 1 or len(new_user['last_name']) < 1 or len(new_user['password']) < 1 or len(new_user['confirm_password']) < 1 or len(new_user['email']) < 1:
            errors.append('All fields are needed wtf LOL')
        if new_user['password'] != new_user['confirm_password']:
            print new_user['password'], new_user['confirm_password']
            errors.append('Passwords do not match LOL')
        if len(new_user['password']) < 8:
            errors.append('Password must be AT LEAST 8 characters long ya big ol dummy')
        if len(new_user['confirm_password']) < 8:
            errors.append('Password must be AT LEAST 8 characters long ya big ol doofus')
        if not PASS_REGEX.match(new_user['password']):
            errors.append("Password must contain AT LEAST one number, upper and lowercase letter LOL")
        if not EMAIL_REGEX.match(new_user['email']):
            errors.append("Invalid email address, come on man!!!!!!")
        if new_user['first_name'].isalpha() != True:
            errors.append("First Name cannot contain any numbers, LOL wtf")
        if new_user['last_name'].isalpha() != True:
            errors.append("Last Name cannot contain any numbers, LOL wtf")
        if errors:
            print errors
            return {"status": False, "errors":errors}
        else:
            password = new_user['password']
            hashed_password = self.bcrypt.generate_password_hash(password)
            query = "INSERT INTO users (first_name, last_name, email, password) VALUES (%s, %s, %s, %s)"
            data = [new_user['first_name'], new_user['last_name'], new_user['email'], hashed_password]
            self.db.query_db(query, data)
            get_user_query = "SELECT * FROM users ORDER BY id DESC LIMIT 1"
            #this is to get the user we just added
            new_user = self.db.query_db(get_user_query)
            print new_user[0]['id']
            print new_user[0]
            return {'status': True, 'user': new_user[0]}

    def login(self, login_data):
        password=login_data['password']
        hashed_password = self.bcrypt.generate_password_hash(password)
        data = [login_data['email']]
        login_query = "SELECT * FROM users WHERE email = %s LIMIT 1"
        user = self.db.query_db(login_query, data)
        if user == []:
            return False
        else:
            if self.bcrypt.check_password_hash(user[0]['password'], password):
                return {"status": True, "user": user[0]}
            else:
                return False

    def add_quote(self, search_info):
        query = "INSERT INTO musicsearches (search) VALUES (%s)"
        data = [search_info['jams']]
        self.db.query_db(query,data)
        gif_query = "INSERT INTO gifsearches (search) VALUES (%s"
        data = [search_info['gif']]
        self.db.query_db(gif_query, data)
        return
