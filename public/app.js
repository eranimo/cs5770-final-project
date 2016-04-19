function submitForm () {
  var name = document.getElementById('name').value;
  var year = document.getElementById('year').value;
  var major = document.getElementById('major').value;

  if (name && year && major) {
    var request = new XMLHttpRequest();
    request.addEventListener("load", function (){
      var result = JSON.parse(this.responseText);
      console.log(result);
    });
    request.open("POST", "/users", false);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({
      name: name,
      year: year,
      major: major
    }))

    name.value = '';
    year.value = '';
    major.value = '';
  }

  return false;
}



window.onload = function (){
  var request = new XMLHttpRequest();
  request.addEventListener("load", function (){
    var result = JSON.parse(this.responseText);
    var usersList = document.getElementById('users-list');
    result.forEach(function(user) {
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(user.name + ' - ' + user.major +  '(' + user.year +')'))
      usersList.appendChild(li)
    });
    console.log(result)
  });
  request.open("GET", "/users", false);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send()

}
