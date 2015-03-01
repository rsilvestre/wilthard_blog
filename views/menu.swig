{# Created by michaelsilvestre on 1/03/15. #}

<span class="menu-home">
  <a href="/">Blog Home</a>
</span>
<span class="menu-login">
  {% if username %}
    Welcome <span class="menu-username">{{username}}</span> <a href="/logout">Logout</a> | <a href="/newpost">New Post</a><p>
  {% else %}
    You are not logged in! <a href="/login">Login</a> | <a href="/signup">Sign Up</a><p>
  {% endif %}
</span>
