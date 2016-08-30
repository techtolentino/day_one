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
        var id = $(this).parent().parent().attr('data-id');

        $.ajax({
            type: 'PUT',
            url: '/tasks/' + id,
            success: function(data){
                //do something with the data via front-end framework
                location.reload();
            }
        });
    });

    $('.delete').on('click', function(){
        var item = $(this).parent().parent().attr('data-id');

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
