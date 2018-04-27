activate_this = '/path/to/env/bin/main.py'
execfile(activate_this, dict(__file__=activate_this))

from main import app as application
