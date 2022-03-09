$(document).ready(function () {
 $('.directions__item-top').on('click', function () {
  const accordeonBottom = $('.directions__item-bottom'),
   $this = $(this);
  $this.siblings(accordeonBottom).is(":visible") ? ($('.directions__item-top').removeClass('active'), accordeonBottom.slideUp(300)) : ($('.directions__item-top').removeClass('active'), accordeonBottom.slideUp(300), $this.addClass('active'), $this.siblings(accordeonBottom).slideDown(300))
 });

 $('[data-scroll]').on('click', function (e) {
  e.preventDefault();
  let blockOffSet = $($(this).data('scroll')).offset().top;

  $("html, body").animate({
   scrollTop: blockOffSet
  }, 500);
 });

 $(function () {
  $('.contacts__btn').marquee({
   duration: 15000,
   startVisible: true,
   duplicated: true,
   direction: 'right',
  });

  $('.ty__btn').marquee({
   duration: 15000,
   startVisible: true,
   duplicated: true,
   direction: 'right',
  });

  $('.main__block-call').marquee({
   duration: 15000,
   startVisible: true,
   duplicated: true,
   direction: 'right',
  });

  $('.ticker__wrapper').marquee({
   duration: 30000,
   startVisible: true,
   duplicated: true,
   direction: 'right',
  });

  $(window).scroll(function () {
   if ($(this).scrollTop() > 0) {
    $('.scroll-up').fadeIn();
   } else {
    $('.scroll-up').fadeOut();
   }
  })

  $('.scroll-up').on("click", function () {
   $("body, html").animate({
    scrollTop: 0
   });
   return false;
  })

  const hoverMenu = document.querySelectorAll('.recruit__link');
  const cirle = document.querySelectorAll('.circle');

  hoverMenu.forEach((item, i) => item.addEventListener('mouseover', () => {
   cirle[i].style.opacity = '1';
   item.addEventListener('mousemove', e => {
    cirle[i].style.left = e.movementX + e.clientX - 350 + 'px';
   });
  }));

  hoverMenu.forEach((item, i) => item.addEventListener('mouseout', () => {
   cirle[i].style.opacity = '0'
  }));
 });

 let lightSchemeIcon = document.querySelector('#light-scheme-icon');
 let darkSchemeIcon = document.querySelector('#dark-scheme-icon');
 let matcher = window.matchMedia('(prefers-color-scheme: dark)');

 const onUpdate = () => {
  if (matcher.matches) {
   lightSchemeIcon.remove();
   document.head.append(darkSchemeIcon);
  } else {
   document.head.append(lightSchemeIcon);
   darkSchemeIcon.remove();
  }
 }

 matcher.addEventListener("load", onUpdate);

 if ($('#myform').length > 0) {
  $("#myform").validate({
   rules: {
    name: {
     required: true,
     minlength: 3
    },
    email: {
     required: true,
     email: true
    }
   },
   messages: {
    name: "Please specify your name",
    email: {
     required: "We need your email address to contact you",
     email: "Your email address must be in the format of name@domain.com*"
    },
    phone: "Please specify your phone",
   }
  });
 }

 const mask = (selector) => {
  let setCursorPosition = (pos, elem) => {
   elem.focus();

   if (elem.setSelectionRange) {
    elem.setSelectionRange(pos, pos);
   } else if (elem.createTextRange) {
    let range = elem.createTextRange();

    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
   }
  };

  function createMask(event) {
   let matrix = '+ 38 (0__) ___ __ __',
    i = 0,
    def = matrix.replace(/\D/g, ''),
    val = this.value.replace(/\D/g, '');

   if (def.length >= val.length) {
    val = def;
   }

   this.value = matrix.replace(/./g, function (a) {
    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
   });

   if (event.type === 'blur') {
    if (this.value.length == 2) {
     this.value = '';
    }
   } else {
    setCursorPosition(this.value.length, this);
   }
  }

  let inputs = document.querySelectorAll(selector);

  inputs.forEach(input => {
   input.addEventListener('input', createMask);
   input.addEventListener('focus', createMask);
   input.addEventListener('blur', createMask);
  });
 };

 mask('[name="phone"]');

 const file = document.querySelector('#contacts__file');
 const uploadFile = document.querySelector('#upload-file')

 file.addEventListener('input', () => {
  const item = file.files[0].name;
  uploadFile.innerHTML = item;
 });

 const sendData = document.querySelector('#myform');
 const nameData = document.querySelector('.name-data');
 const numberData = document.querySelector('.number-data');
 const emailData = document.querySelector('.email-data');
 const telegramData = document.querySelector('.telegram-data');
 const fileData = document.querySelector('.contacts__file');
 const errorMessage = document.querySelector('.error-wrapper');
 const acceptMessage = document.querySelector('.accept-wrapper');

 if (sendData) {
  sendData.addEventListener('submit', function (event) {
   event.preventDefault();
   _postData().catch(error => {
    console.dir(error.message);
    if (error.message !== 200) {
     errorMessage.classList.add('show-message');
     setTimeout(() => {
      errorMessage.classList.remove('show-message');
     }, 3000);
    }
   });
  });

  async function _postData() {
   const formData = new FormData(sendData);

   // for (const [key, value] of formData.entries()) {
   //  console.log(key, value);
   // }
   console.log(...formData);
   // data.append("name",nameData.value)
   // data.append("email",emailData.value)
   // data.append("phone",numberData.value.replace(/(\(|\)|\s)/g,""))
   // data.append("telegram",telegramData.value)
   // data.append("file",fileData.value)
   // let data = {
   //   name: nameData.value,
   //   email: emailData.value,
   //   phone: numberData.value.replace(/(\(|\)|\s)/g,""),
   //   telegram: telegramData.value,
   //   // file: fileData.value
   //  }

   //  let dataForm = new FormData();
   //  Object.keys(data).forEach(item => {
   //   dataForm.append(item, data[item]);
   //  });

   //  dataForm.append("file",fileData.value);

   const response = await fetch('https://nconn.recruitersvoice.com.ua/form/recruiters', {
    method: 'POST',
    headers: {
     "Content-type": "multipart/form-data"
    },
    body: formData
    // body: JSON.stringify(data)
   })
   console.log(response.status);
   if (!response.ok) {
    // const message = `Ошибка по адресу 'https://nconn.recruitersvoice.com.ua/form/recruiters', статус ошибки ${response.status}`
    throw new Error(response.status);
   } else {
    acceptMessage.classList.add('show-message');
    setTimeout(() => {
     acceptMessage.classList.remove('show-message');
    }, 3000);
   }
   return await response.text();
  }
 }
 const ticker = document.querySelector('.ticker');
 const modal = document.querySelector('.modal');
 const modalClose = document.querySelector('.modal__close img');
 const tyModal = document.querySelector('.ty-page');
 const tyBtn = document.querySelector('.ty__btn');
 const tyClose = document.querySelector('#ty-close');

 if (ticker) {
  ticker.addEventListener('click', e => {
   e.preventDefault();
   modal.classList.add('show-modal');
  });
 }

 if (modalClose) {
  modalClose.addEventListener('click', () => {
   modal.classList.remove('show-modal');
  });
 }

 if (tyBtn) {
  tyBtn.addEventListener('click', e => {
   e.preventDefault();
   tyModal.classList.remove('show-modal');
  });
 }

 if (tyClose) {
  tyClose.addEventListener('click', e => {
   e.preventDefault();
   tyModal.classList.remove('show-modal');
  });
 }
});