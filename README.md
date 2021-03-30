###Flask-ritual-tracker

Ritual-Tracker is a web app that works upon the rituals of agile.
It contains the data related to the projects of the teams and employees of Nineleaps.
It contains the projects of the user who has logged in and then according to the projects it displays the rituals and  ritual_outcomes 
of that project


### Using Flask to build a Restful API Server

Integration  Flask-Cors,Flask-SQLalchemy,and Flask-Marshmallow,Flask-login,Flask-jsonify
    
###DATABASE USED

**SQLITE3**

 SQLite is a relational database management system . In contrast to many other database management systems, SQLite is not a client–server database engine. Rather, it is embedded into the end program. 
    
   

###Installation

**Install with pip:**

$ pip install -r requirements.txt


###APPLICATION STRUCTURE


|---ritual-tracker 
|  |---backend
|      |---main
|         |----models
|            |---event_table
|            |---invite_table
|            |---mapped-table
|            |---project_table 
|            |---revoke
|            |---ritual_outcomes
|            |---sprint_planning_table
|            |---stand_up
|            |---sprint_review
|            |---sprint_retro    
|            |---ritual_table
|            |---user_table
|         |----views
|            |---event
|            |---logout_user
|            |---project_rituals
|            |---ritual_outcome
|            |---sprint_planning
|            |---sprint_retro
|            |---sprint_review
|            |---stand_up
|            |---token_wrapping
|            |---user_login
|            |---user_projects
|     |---__init__.py
|     |---site.db
|---.gitignore
|---README.md
|---requirements.txt
|---run.py

###RUNNING FLASK IN VIRTUAL-ENVIRONMENT

**CREATING VIRTUAL ENVIRONMENT**

**Install virtualenv using pip3**

sudo pip3 install virtualenv 

**Now create a virtual environment**

virtualenv venv 

**you can use any name instead of venv**

**You can also use a Python interpreter of your choice**

virtualenv -p /usr/bin/python2.7 venv

**Active your virtual environment:**

source venv/bin/activate



###Flask Configuration


app = Flask(__name__)
app.config['DEBUG'] = True


###Run flask

**Run flask for develop**

$ python run.py

Runs the app in the development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.


###REFERENCE

**Official Website**

    Flask
    Flask-SQLalchemy
    Flask-login
    Flask-Marshmallow
    Flask-jsonify
    

**Tutorial**

    Corey Scafer
    Pretty Printed