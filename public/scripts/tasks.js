$(document).ready(function(){

    $('form').on('submit', function(){

        var item = $('form input');
        var task = {item: item.val(), done: false};

        $.ajax({
            type: 'POST',
            url: '/tasks',
            data: task,
            success: function(data){
            location.reload();
            }
        });
    return false;
    });

    $('.update').on('click', function(){
        var item = $(this).prev().text().replace(/ /g, "-");
        var id = $(this).prev().attr('data-id');

        $.ajax({
            type: 'PUT',
            url: '/tasks/' + item,
            success: function(data){
                //do something with the data via front-end framework
                location.reload();
            }
        });
    });

    $('.delete').on('click', function(){
        var item = $(this).prev().prev().text().replace(/ /g, "-");
        alert(item);

        $.ajax({
            type: 'DELETE',
            url: '/tasks/' + item,
            success: function(data){
                //do something with the data via front-end framework
                location.reload();
            }
        });
    });
});
