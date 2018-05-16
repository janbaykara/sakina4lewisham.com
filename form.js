// Bootstrap

(function bootstrap() {
  var $form = document
    .getElementById("pledge-form")

  var defaultAccessor = function(p) {
    return p;
  };

  var params = [
    [ "pledge" ],
    [ "EMAIL" ],
    [ "FNAME" ],
    [ "LNAME" ],
    [
      "LEWISHAMLP",
      function (p) {
        return "I'm a member of Lewisham East Labour Party";
      }
    ]
  ]

  params.forEach(function(param) {
    var key = param[0];
    var accessor = param[1] || defaultAccessor
    var value = getURLParameter(key);
    if (value) {
      fill($form)(key, accessor(value));
      scrollTo($form)();
      focus($form)();
    }
  });

  document.addEventListener("click", excludeElement($form, defocus($form)));
  $form.addEventListener("click", focus($form));
  $form.addEventListener("submit", defocus($form));
})();

// Modules

function scrollTo($form) {
  return function(e) {
    var scrollTop = (((t = document.documentElement) ||
      (t = document.body.parentNode)) &&
    typeof t.scrollTop == "number"
      ? t
      : document.body
    ).scrollTop;
    var diffHeight = Math.max(0, window.innerHeight - height($form));
    var offsetTop = $form.getBoundingClientRect().top;
    var y = Number((offsetTop + scrollTop - diffHeight / 2).toFixed(0));
    document.documentElement.scrollTop = document.body.scrollTop = y;
  };
}

function fill($form) {
  return function(key, value) {
    var input = $form.querySelector("input[name=" + key + "]")
    if (!input) {
      return
    }
    input.checked = value
    input.value = value
  };
}

function focus($form) {
  return function(e) {
    if ($form.classList.contains("form-active")) {
      return;
    }
    $form.querySelector("input").focus();
    $form.classList.add("form-active");
  };
}

function defocus($form) {
  return function(e) {
    if ($form.classList.contains("form-active")) {
      $form.classList.remove("form-active");
    }
  };
}

function excludeElement($mask, handler) {
  return function(e) {
    if ($mask.contains(e.target) || e.target == $mask) {
      return;
    }
    handler(e);
  };
}

// Utils

function getURLParameter(name) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.search
      ) || [null, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
}

function height($el) {
  return $el.offsetHeight || $el.clientHeight;
}
