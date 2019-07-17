$(document).ready(function (){
    $('#member_insert_btn').click(function(){
        const name = $('#name').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const message = $('#message').val();
        const send_params ={
            name,
            email,
            phone,
            message
        };
        //alert(JSON.stringify(send_params));
        $.post("/member_insert",send_params,function(data,status){
            //alert(data+":"+staus);
            const parsed_data = JSON.parse(data);
            $("#result_div").html(`<h1>${parsed_data.msg}</h1>`);
            
        });
    });
    $('#login_btn').click(function (){
        const email=$('#login_email').val();
        const send_params ={
            email
        };
    
        $.post("/login",send_params,function (data,status){
            try{
                alert(JSON.parse(data).msg);
                $('#login_email').val()="";
            }catch(err){
                window.location.reload(true);
            }  
            
        });

    });
    
    $("#logout_btn").click(function(){
        $.get("/logout",function(data,status){
            location.reload();
        });
    });

});