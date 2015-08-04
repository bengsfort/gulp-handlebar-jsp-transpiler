<%-- if users exist, create the user list --%>
<c:if test="${users}">
  <ul class="user-list">
    <%-- iterate through users and display their name and link --%>
  <c:forEach var="user" items="users">
    <li class="user"><a href="${user.link}">${user.name}</a></li>
  </c:forEach>
  </ul>
</c:if>