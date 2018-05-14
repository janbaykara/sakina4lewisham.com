/**
 * Focus on form when the URL points to it
 */
var $form = document.getElementById('pledge-form')

if (getURLParameter('pledge')) {
  scrollTo($form)()
  focus($form)()
}

/**
 * Focus on click
 * Defocus on submit / click away
 */
document.addEventListener('click', onDocumentClick($form, defocus($form)))
$form.addEventListener('click', focus($form))

function scrollTo ($form) {
  return function (e) {
    var scrollTop = (
        (
          (t = document.documentElement) ||
          (t = document.body.parentNode)
        ) && typeof t.scrollTop == 'number'
        ? t
        : document.body
      ).scrollTop
    var diffHeight = Math.max(0, window.innerHeight - height($form))
    var offsetTop = $form.getBoundingClientRect().top
    var y = Number((offsetTop + scrollTop - (diffHeight / 2)).toFixed(0))
    document.documentElement.scrollTop = document.body.scrollTop = y
  }
}

function focus ($form) {
  return function (e) {
    if ($form.classList.contains('form-active')) {
      return
    }
    $form.querySelector('input').focus()
    $form.classList.add('form-active')
  }
}

function defocus ($form) {
  return function (e) {
    if ($form.classList.contains('form-active')) {
      $form.classList.remove('form-active')
    }
  }
}

function onDocumentClick ($form, handler) {
  return function (e) {
    if ($form.contains(e.target) || e.target == $form) {
      return
    }
    handler(e)
  }
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function height ($el) {
  return ($el.offsetHeight || $el.clientHeight)
}