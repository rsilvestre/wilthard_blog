<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{% block title %}My Site{% endblock %}</title>

    {% block head %}
    <link rel="stylesheet" href="/stylesheets/style.css">
    {% endblock %}
</head>
<body>
    <div id="menu">
        {% block menu %}{% endblock %}
    </div>
    <div id="container">
        {% block content %}{% endblock %}
    </div>
</body>
</html>