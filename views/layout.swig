<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{% block title %}My Site{% endblock %}</title>

    {% block head %}
    <link rel="stylesheet" href="/stylesheets/style.css">
    <script type="text/javascript" src="/javascripts/lib/require.js" data-main="/javascripts/app"></script>
    {% endblock %}
</head>
<body>
    <div id="menu">
        {% block menu %}{% endblock %}
    </div>
    <div id="container" class="col">
        {% block content %}{% endblock %}
    </div>
</body>
</html>