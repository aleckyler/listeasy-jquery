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
  var i = 1
  var j = ''
  $('.delete_checked').on("click", function() {
    var x = j + i
    $('input:checkbox').each(function(){
      // if ($(this).parent('.list p').css('display') === 'none') {
      //   $(this).parent('.list p').remove()
      // } else
      if ($(this).prop('checked')) {
        $(this).parent('.list p').css('display', 'none')
        $(this).parent('.list p').addClass(x)
      }
      for (var h = i-1; h > 0; h--) {
        var f = '.' + h
        $(f).each(function() {
          $(this).removeClass(x)
        })
      }
    })
    if ($('.undo_delete').css('display') === "none") {
      $('.undo_delete').removeClass('not_displayed')
    }
    i++
  })
  $('.undo_delete').on("click",function() {
    console.log(i)
    i--
    console.log(i)
    var y = '.' + i
    x = j + i
    console.log(y)
    console.log(typeof(y))
    $(y).each(function(){
      $(this).css('display', '')
      $(this).removeClass(x)
    })
    // $('input:checkbox').each(function(){
    //   if ($(this).parent('.list p').class('') === 'none') {
    //     $(this).parent('.list p').css('display', '')
    //   }
    // })
    if (i === 1) {
      $('.undo_delete').addClass('not_displayed')
    }
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
    x = j + i
    $('.complete').each(function(){
      // if ($(this).parent('.list p').css('display') === 'none') {
      //   $(this).parent('.list p').remove()
      // } else
      if ($(this).text() === "Complete") {
        $(this).parent('.list p').css('display', 'none')
        $(this).parent('.list p').addClass(x)
      }
      for (var h = i-1; h > 0; h--) {
        var f = '.' + h
        $(f).each(function() {
          $(this).removeClass(x)
        })
      }
    })
    if ($('.undo_delete').css('display') === "none") {
      $('.undo_delete').removeClass('not_displayed')
    }
    i++
  })
};

$(document).ready(main);
