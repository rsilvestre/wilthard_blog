{% extends 'layout.swig' %}

{% block title %}Welcome{% endblock %}

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
  Welcome {{username}}
<p>
<ul>
  <li><a href="/">Goto Blog Home</a></li>
  <li>
    <a href="/logout">Logout</a>
  </li>
  <li>
    <a href="/newpost">Create a New Post</a>
  </li>
</ul>

{% endblock %}
