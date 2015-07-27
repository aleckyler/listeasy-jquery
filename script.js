var template = function(text) {
  return '<p><input type="checkbox"><i class="glyphicon glyphicon-star"></i><span>' + text + '</span><i class="glyphicon glyphicon-remove"></i><span class="complete incomplete">Incomplete</span></p>';
};

var main = function() {
  $('form').submit(function() {
      var text = $('#todo').val();
      var html = template(text);
      $(html).appendTo('.list');
      $('#todo').val("");
    return false;
  })
  $('.list').on('click', '.glyphicon-star', function() {
    $(this).toggleClass('active')
  })
  $('.list').on("click", '.glyphicon-remove', function() {
    $(this).parent('p').remove()
  })
  var unchecked = true
  $('.select_all').on("click", function() {
    if (unchecked) {
      $('input:checkbox').prop('checked', true)
      unchecked = false
      $('.select_all').attr('value','Uncheck all')
    } else {
      $('input:checkbox').prop('checked', false)
      unchecked = true
      $('.select_all').attr('value','Check all')
    }
  })
  $('.delete_checked').on("click", function() {
    $('input:checkbox').each(function(){
      if ($(this).parent('.list p').css('display') === 'none') {
        $(this).parent('.list p').remove()
      } else if ($(this).prop('checked')) {
        $(this).parent('.list p').css('display', 'none')
      }
    })
    if ($('.undo_delete').css('display') === "none") {
      $('.undo_delete').removeClass('not_displayed')
    }
  })
  $('.undo_delete').on("click",function() {
    $('input:checkbox').each(function(){
      if ($(this).parent('.list p').css('display') === 'none') {
        $(this).parent('.list p').css('display', '')
      }
    })
    $('.undo_delete').addClass('not_displayed')
  })
  $('.list').on('click', '.complete', function() {
    if ($(this).text() === "Incomplete") {
      $(this).removeClass('incomplete')
      $(this).text('Complete')
    } else {
      $(this).addClass('incomplete')
      $(this).text('Incomplete')
    }
  })
  $('.delete_completed').on("click", function() {
    $('.complete').each(function(){
      if ($(this).parent('.list p').css('display') === 'none') {
        $(this).parent('.list p').remove()
      } else if ($(this).text() === "Complete") {
        $(this).parent('.list p').css('display', 'none')
      }
    })
    if ($('.undo_delete').css('display') === "none") {
      $('.undo_delete').removeClass('not_displayed')
    }
  })
};

$(document).ready(main);
