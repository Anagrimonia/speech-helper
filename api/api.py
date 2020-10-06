import time
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests

from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'super-secret'
db = SQLAlchemy(app)

CORS(app, support_credentials=True)

# -------===== DATABASE STRUCTURE =====-------

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  login = db.Column(db.String(80), unique=True, nullable=False)
  password_hash = db.Column(db.String(128))
  #themes = db.relationship("Theme")

  def set_password(self, password):
        self.password_hash = generate_password_hash(password)

  def check_password(self, password):
      return check_password_hash(self.password_hash, password)

  def __repr__(self):
    return '<User %r>' % self.id

class Theme(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(150), nullable=False)

  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
  user = db.relationship('User', backref=db.backref('themes', lazy=True))

  def __repr__(self):
    return '<Theme %r>' % self.id

class Phrase(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(300), nullable=False)
  
  theme_id = db.Column(db.Integer, db.ForeignKey('theme.id'), nullable=False)
  theme = db.relationship('Theme', backref=db.backref('phrases', lazy=True))

  def __repr__(self):
    return '<Phrase %r>' % self.id

READYMADE = {
  'Экстренное' : 
  ['Помогите', 'Мне нужна помощь', 'Мне нужен доктор', 
   'Позвоните в скорую', 'Вызовите полицию', 
   'Произошел несчастный случай', 'Меня ограбили', 'Я повредил', 
   'Я потерял', 'Я заблудился'],
  'В магазине' : 
  ['Можно вас спросить?','Сколько это стоит?','Сколько стоит',
   'Во сколько вы закрываетесь?','Во сколько вы открываетесь?',
   'Это слишком дорого','Где я могу найти', 'Как пройти к кассе?',
   'Вы стоите в очереди?', 'Посторожите мое место, пожалуйста'],
  'В кафе' : 
  ['Дайте меню', 'Пожалуйста, дайте мне','Что вы посоветуете?',
   'Принесите счет'],
  'У врача' : 
  ['Я плохо себя чувствую', 'Здесь болит', 'Здесь не болит', 
   'Мне лучше', 'Мне хуже', 'У меня болит', 'У меня высокая температура',
   'У меня кружится голова', 'У меня насморк', 'Какое лекарство мне нужно?'],
  'В городе' : 
  ['Как добраться до', 'Это правильная дорога до', 'Где находится', 
   'Который час?', 'Сколько длится поездка?', 'Где ближайшая автобусная остановка?'],
  'Диалог' : 
  ['Здравствуйте', 'До свидания', 'Спасибо', 'Пожалуйста',
  'Приятно познакомиться', 'Извините меня', 'Я не могу говорить'],
}

def add_default_themes(user):
  for theme in READYMADE:
      t = Theme(name=theme, user=user)
      for phrase in READYMADE[theme]:
        p = Phrase(name=phrase, theme=t)
        db.session.add(p)
      db.session.add(t)

def themes_to_json(themes):
  json = {}
  for theme in themes:
    json[theme.name] = []
    for phrase in theme.phrases:
      json[theme.name].append(phrase.name)
  return json

# -------===== AUTHORIZATION =====-------

@app.route('/register', methods=('POST',))
def register():
    data = request.get_json()
    user = User(login=data['login'])
    user.set_password(data['password'])

    # Adding user default themes
    add_default_themes(user)
    
    db.session.add(user)
    db.session.commit()
    return jsonify({ 'token': user.password_hash }), 201

@app.route('/login', methods=('POST',))
def authenticate():
  data = request.get_json()
  user = User.query.filter_by(login=data['login']).first()
  if user and user.check_password(data['password']):
    return jsonify({ 'token': user.password_hash }), 201
  else:
    return jsonify({'error': 'Failed'}), 401;
# -------===== API =====-------

@app.route('/get_themes')
def get_themes():
  user = User.query.filter_by(password_hash=request.headers['token']).first()
  return jsonify(themes_to_json(user.themes)), 200

@app.route('/add_theme', methods=('POST',))
def add_theme():
  user = User.query.filter_by(password_hash=request.headers['token']).first()
  theme = request.get_json()['theme']
  t = Theme(name=theme, user=user)
  db.session.add(t)
  db.session.commit()
  return jsonify(themes_to_json(user.themes)), 200

@app.route('/add_phrase', methods=('POST',))
def add_phrase():
  user = User.query.filter_by(password_hash=request.headers['token']).first()
  theme = Theme.query.filter_by(user=user, name=request.get_json()['theme']).first()
  p = Phrase(name=request.get_json()['phrase'], theme=theme)
  db.session.add(p)
  db.session.commit()
  return jsonify(themes_to_json(user.themes)), 200

@app.route('/delete_theme', methods=('DELETE',))
def delete_theme():
  user = User.query.filter_by(password_hash=request.headers['token']).first()
  theme = Theme.query.filter_by(user=user, name=request.get_json()['theme']).first()
  phrase = Phrase.query.filter_by(theme=theme).delete()
  db.session.delete(theme)
  db.session.commit()
  return jsonify(themes_to_json(user.themes)), 200

@app.route('/delete_phrase', methods=('DELETE',))
def delete_phrase():
  user = User.query.filter_by(password_hash=request.headers['token']).first()
  theme = Theme.query.filter_by(user=user, name=request.get_json()['theme']).first()
  phrase = Phrase.query.filter_by(theme=theme, name=request.get_json()['phrase']).first()
  db.session.delete(phrase)
  db.session.commit()
  return jsonify(themes_to_json(user.themes)), 200


@app.route('/phrases')
def get_default_phrases():
    return {'time': time.time()}

if __name__ == '__main__':
    app.run()