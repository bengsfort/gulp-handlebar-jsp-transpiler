<c:if test="${users}">
  <ul class="user-list">
  <c:forEach var="user" items="users">
    <li class="user"><a href="${user.link}">${user.name}</a></li>
  </c:forEach>
  </ul>
</c:if>