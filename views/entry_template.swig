{% extends 'layout.swig' %}

{% block title %}Blog Post{% endblock %}


{% block head %}
    {% parent %}
    {#<link rel="stylesheet" href="custom.css">#}
{% endblock %}

{% block menu %}
    {% include "./menu.swig" with context %}
{% endblock %}

{% block content %}
    <h2>{{post['title']}}</h2>
    Posted {{post['date']|date('jS \o\f F')}}<i> By {{post['author']}}</i>
    {% if username == post.author %}
        <a href="/post/{{ post['permalink'] }}/edit">edit</a>
        <form method="POST" action="/post/{{ post['permalink'] }}?_method=DELETE" enctype="application/x-www-form-urlencoded">
            <button value="delete">delete</button>
        </form>
    {% endif %}
    <br>
    <hr>
    {{post['body']|markdown}}
    <p>
        <em>Filed Under</em>:
        {% for tag in post.tags %}
            {% if loop.first %}
                <a href="/tag/{{tag}}">{{tag}}</a>
            {% else %}
                , <a href="/tag/{{tag}}">{{tag}}</a>
            {% endif %}
        {% endfor %}
    <p>
        Comments:
    <ul>
        {% for comment in post.comments %}
            <form action="/like" method="POST">
                <input type="hidden" name="permalink", value="{{post['permalink']}}">
                <input type="hidden" name="comment_ordinal", value="{{loop.index0}}">
                Author: {{comment['author']}}<br>
                Likes: {{comment['num_likes']}} <input type="submit" value="Like"></form><br>
            {{comment['body']}}<br>
            <hr>
        {% endfor %}
        <h3>Add a comment</h3>
        <form action="/newcomment" method="POST">
            <input type="hidden" name="permalink", value="{{post['permalink']}}">
            <h4>{{errors}}</h4>
            <b>Name</b> (required)<br>
            <input type="text" name="commentName" size="60" value="{{comment['name']}}"><br>
            <b>Email</b> (optional)<br>
            <input type="text" name="commentEmail" size="60" value="{{comment['email']}}"><br>
            <b>Comment</b><br>
            <textarea name="commentBody" cols="60" rows="10">{{comment['body']}}</textarea><br>
            <input type="submit" value="Submit">
    </ul>
{% endblock %}
