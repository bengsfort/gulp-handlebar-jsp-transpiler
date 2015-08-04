<c:if test="${user.id}">
  
  <div class="userInfo" id="user-${user.id}">
    <h1>Hello, ${user.name}.</h1>
    <div class="userMeta">${user.occupation}</div>
  </div>
  
</c:if>