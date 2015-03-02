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
    <div class="article">
        <header class="onthetop">
            <div class="goleft">
                <span class="author">By {{post['author']}}</span>
                {# span.object Dans le cadre du cours de communication professionnelle #}
            </div>
            <span class="date">Posted {{post['date']|date('jS \o\f F')}}</span>
        </header>
        <h1 class="title">{{post['title']}}</h1>
        {% if username == post.author %}
            <a class="article-action-edit" href="/post/{{ post['permalink'] }}/edit">edit</a>
            <form class="article-action-delete" method="POST" action="/post/{{ post['permalink'] }}?_method=DELETE" enctype="application/x-www-form-urlencoded">
                <button value="delete">delete</button>
            </form>
        {% endif %}
        {{post['body']|markdown}}
    </div>
    <p class="tag">
        <em>Filed Under</em>:
        {% for tag in post.tags %}
            {% if loop.first %}
                <a href="/tag/{{tag}}">{{tag}}</a>
            {% else %}
                , <a href="/tag/{{tag}}">{{tag}}</a>
            {% endif %}
        {% endfor %}
    </p>
    <p class="comment">
        Comments:
    </p>
    <ul class="comments">
        {% for comment in post.comments %}
            <form action="/like" method="POST">
                <input type="hidden" name="permalink", value="{{post['permalink']}}">
                <input type="hidden" name="comment_ordinal", value="{{loop.index0}}">
                Author: {{comment['author']}}<br>
                Likes: {{comment['num_likes']}} <input type="submit" value="Like">
            </form>
            <br>
            {{comment['body']}}<br>
            <hr>
        {% endfor %}
        <h3>Add a comment</h3>
        <form class="comment-form" action="/newcomment" method="POST">
            <input type="hidden" name="permalink", value="{{post['permalink']}}">
            <h4 class="error">{{errors}}</h4>
            <div class="comment-container">
                <div class="comment-container-left">
                    <div class="comment-block-name">
                        <label class="comment-label" for="commentName"> <span class="label-name">Name</span> (required)</label>
                        <input type="text" id="commentName" name="commentName" size="40" value="{{comment['name']|default('')}}">
                    </div>
                    <div class="comment-block-email">
                        <label class="comment-label" for="commentEmail"><span class="label-email">Email</span> (optional)</label>
                        <input type="text" id="commentEmail" name="commentEmail" size="40" value="{{comment['email']|default('')}}">
                    </div>
                    <div class="comment-button">
                        <input type="submit" value="Submit">
                    </div>
                </div>
                <div class="comment-container-right">
                    <label class="comment-label" for="commentBody">Comment</label>
                    <textarea id="commentBody" name="commentBody" cols="42" rows="10">{{comment['body']}}</textarea>
                </div>
            </div>
        </form>
    </ul>
{% endblock %}
