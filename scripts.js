'use strict';
const tabSignUp = $('#tab_signup');
const tabLogin = $('#tab_login');
$('#login').hide();
$('#signup').hide();
const setActiveLabel = (el) => {
  $(el).parent().find('label').addClass('active');
};
const removeActiveLabel = (el) => {
  if ($(el).val().trim() === '') {
    $(el).val(''); // reset incase the value is filled with spaces.
    $(el).parent().find('label').removeClass('active');
  }
};

const togglePasswordVisibility = (btn, el) => {
  let newType = $(el).attr('type') === 'password' ? 'text' : 'password';
  $(btn)
    .find('span')
    .text(newType === 'password' ? 'visibility_off' : 'visibility');
  $(el).attr('type', newType);
};

const animator = (oldSel, newSel, animation) => {
  if (animation)
    $(oldSel)
      .fadeOut('fast')
      .promise()
      .done(() => {
        $(newSel).fadeIn('fast');
      });
  else {
    $(oldSel).hide();
    $(newSel).show();
  }
};

const setActiveTab = (hash, animation = true) => {
  hash = hash.slice(1); // remove the hashtag

  // if signup or something else
  if (hash !== 'login') {
    tabSignUp.addClass('active');
    tabLogin.removeClass('active');
    animator('#login', '#signup', animation);

    return;
  }
  // if login
  tabLogin.addClass('active');
  tabSignUp.removeClass('active');

  animator('#signup', '#login', animation);
};

$('.input>input').on('focus', function () {
  setActiveLabel(this);
});
$('.input>input').on('blur', function () {
  removeActiveLabel(this);
});

$('#showPwd1').on('click', function () {
  togglePasswordVisibility(this, "#signup input[name='pwd']");
});

$('#showPwd2').on('click', function () {
  togglePasswordVisibility(this, "#login input[name='pwd']");
});
$(window).on('hashchange', () => {
  setActiveTab(window.location.hash);
});

$(window).on('load', () => {
  setActiveTab(window.location.hash, false);
});
