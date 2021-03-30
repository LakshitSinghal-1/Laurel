import os.path
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from backend.main import app

if __name__ == '__main__':
    app.run(debug=True)

