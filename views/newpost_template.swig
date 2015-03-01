{% extends 'layout.swig' %}

{% block title %}Create a new post{% endblock %}

{% block head %}
  {% parent %}
  {#<link rel="stylesheet" href="custom.css">#}
  <style type="text/css">
    .label {text-align: right}
    .error {color: red}
  </style>
{% endblock %}

{% block menu %}
  {% include "./menu.swig" with context %}
{% endblock %}

{% block content %}
  {% if permalink %}
    <form action="/newpost?_method=PUT" method="POST" enctype="application/x-www-form-urlencoded">
    <input type="hidden" name="permalink" value="{{ permalink }}">
  {% else %}
    <form action="/newpost" method="POST" enctype="application/x-www-form-urlencoded">
  {% endif %}
    <span class="">{{errors}}</span>
    <h2>Title</h2>
    <input type="text" name="subject" size="120" value="{{subject}}"><br>
    <h2>Blog Entry</h2>
    <textarea name="body" cols="120" rows="20">{{body}}</textarea><br>
    <h2>Tags</h2>
    Comma separated, please<br>
    <input type="text" name="tags" size="120" value="{{tags}}"><br>
    <p>
      <input type="submit" value="Submit">
    </p>
  </form>
{% endblock %}
