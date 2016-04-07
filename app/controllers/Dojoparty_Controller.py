from system.core.controller import *
from flask import flash

class Dojoparty_Controller(Controller):
    def __init__(self, action):
        super(Dojoparty_Controller, self).__init__(action)
        self.load_model('Dojoparty_Model')


    def index(self):
        if session.get('status'):
            pass
        else:
            session['status'] = ''

        return self.load_view('index.html')


    def register(self):
        new_user = {
            'first_name':request.form['first_name'],
            'last_name':request.form['last_name'],
            'email':request.form['email'],
            'password':request.form['password'],
            'confirm_password':request.form['password_confirm']
            }
        print("noo yooser", new_user)
        register_attempt = self.models["Dojoparty_Model"].add(new_user)
        if register_attempt['status'] == True:
            print
            session['id'] = register_attempt['user']['id']
            session['name'] = register_attempt['user']['first_name']
            return redirect('/party')
        else:
            for attempt in register_attempt['errors']:
                flash(attempt)
            return redirect('/')


    def login(self):
        # session['status'] = request.form['login']
        login_data = {
            'email' : request.form['emailLogin'],
            'password' : request.form['passwordLogin']
            }
        user_login = self.models['Dojoparty_Model'].login(login_data)
        if user_login == False:
            flash(u"Email and or password does not match our database, please try again. ^_^")
            return redirect('/')
        else:
            session['id'] = user_login['user']['id']
            session['name'] = user_login['user']['first_name']
            return redirect('/party')

    def party(self):

        return self.load_view('party.html')

    def add(self):
        search_info = {
        'jams' : request.form['musicSearch'],
        'gif' : request.form['gifSearch'],
        }
        # grab the info from the inputs, send it to model+db

        self.models['Dojoparty_Model'].add(search_info)
        # add to db
        return redirect('/party')

    def logout(self):
        session['name'] = ''
        return redirect('/')
