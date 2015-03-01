{% extends 'layout.swig' %}

{% block title %}My Blog{% endblock %}

{% block head %}
    {% parent %}
    {#<link rel="stylesheet" href="custom.css">#}
{% endblock %}

{% block menu %}
  {% include "./menu.swig" with context %}
{% endblock %}

{% block content %}
    <h1>My Blog</h1>

    {% for post in myposts %}
    <h2><a href="/post/{{post['permalink']}}/show">{{post['title']}}</a></h2>
    Posted {{post['date']|date('jS \o\f F')}} <i>By {{post['author']}}</i><br>
    Comments:
    <a href="/post/{{post['permalink']}}/show">{{post['comments']|length}}</a>
    <hr>
    {% autoescape false %}
    {{post['body']|markdown}}
    {% endautoescape %}
    <p>
    <p>
        <em>Filed Under</em>:
        {% for tag in post.tags %}
            {% if loop.first %}
                <a href="/tag/{{tag}}">{{tag}}</a>
            {% else %}
                , <a href="/tag/{{tag}}">{{tag}}</a>
            {% endif %}
        {% endfor %}
        {% endfor %}
    <p>
{% endblock %}

