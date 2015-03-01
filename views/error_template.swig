{% extends 'layout.swig' %}

{% block title %}Internal Error{% endblock %}

{% block head %}
    {% parent %}
    {#<link rel="stylesheet" href="custom.css">#}
{% endblock %}

{% block content %}
    Oops..<br>
    <h1>{{message}}</h1>
    <h2>{{error.status}}</h2>
    <pre>{{error.stack}}</pre>
{% endblock %}
