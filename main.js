var baseUrl = "http://localhost:3000/";

$(document).ready(function(){
  $.ajax({
    method: "GET",
    url: baseUrl + "posts.json",
    success: function(posts){
      var template = $('#post-summary').html();
      Mustache.parse(template);
      for (var i=0; i < posts.length; i++){
        var rendered = Mustache.render(template, posts[i]);
        $("#posts").append(rendered)
      }
      console.log(posts);
      alert("success");
    },
    error: function(){
      alert("Problem loading questions. Please retry.")
    }
  });

  $("#posts").on("click", "h2 a", function(){
    $.ajax({
      method: "GET",
      url: baseUrl + "posts/" + $(this).data("id") + ".json",
      success: function(post){
        var template = $("#post-details").html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, post);
        $("#posts").fadeOut(500, function(){
          $("#single-post").fadeIn(500);
        });
      },
      error: function(){
        alert("Error loading post. Please try again.")
      }
    });
  });
  $("#single-post").on("click", "#back", function(){
    $("#single-post").fadeOut(500, function(){
      $("#posts").fadeIn(500);
    });
  });

});
