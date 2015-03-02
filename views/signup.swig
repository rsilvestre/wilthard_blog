{% extends 'layout.swig' %}

{% block title %}Sign Up{% endblock %}

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
  Already a user? <a href="/login">Login</a><p>
  <h2>Signup</h2>
  <form method="post">
    <table class="signup-container">
      <tr>
        <td class="label">
          Username
        </td>
        <td>
          <input type="text" name="username" value="{{username}}">
        </td>
        <td class="error">
          {{username_error}}

        </td>
      </tr>
      <tr>
        <td class="label">
          Complete name
        </td>
        <td>
          <input type="text" name="fullname" value="{{fullname}}">
        </td>
        <td class="error">
          {{fullname_error}}

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
          {{password_error}}

        </td>
      </tr>

      <tr>
        <td class="label">
          Verify Password
        </td>
        <td>
          <input type="password" name="verify" value="">
        </td>
        <td class="error">
          {{verify_error}}

        </td>
      </tr>

      <tr>
        <td class="label">
          Email (optional)
        </td>
        <td>
          <input type="text" name="email" value="{{email}}">
        </td>
        <td class="error">
          {{email_error}}

        </td>
      </tr>
    </table>

    <input type="submit">
  </form>
{% endblock %}
