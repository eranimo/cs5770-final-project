function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/..', function( data ) {

        // For each item in the JSON, table row is added and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td><a href="#" class="linkshowage" rel="' + this.age + '">' + this.age + '</a></td>';
            tableContent += '<td><a href="#" class="linkshowcollege" rel="' + this.college + '">' + this.college + '</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};
