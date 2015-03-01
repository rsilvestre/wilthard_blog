{% extends 'layout.swig' %}

{% block title %}Login{% endblock %}

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
  <h2>Login</h2>
  <form method="post">
    <table>
      <tr>
        <td class="label">
          Username
        </td>
        <td>
          <input type="text" name="username" value="{{username}}">
        </td>
        <td class="error">
        </td>
      </tr>

      <tr>
        <td class="label">
          Password
        </td>
        <td>
          <input type="password" name="password" value="">
        </td>
        <td class="error">
          {{login_error}}

        </td>
      </tr>

    </table>

    <input type="submit">
  </form>
{% endblock %}
