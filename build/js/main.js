let number = document.querySelector('.stepper.vertical').getAttribute('data-start');
let numberH = document.querySelector('.stepper.horizontal').getAttribute('data-start');
let tl = anime.timeline();
let trigger = true;

let eachNumberDelay = 50;
let speed = 1800;

// FOR VERTICAL

$('body').on('click', '.vertical .arrow.top', () => {
  if (trigger) {
    trigger = false;
    number++;

    setTimeout(() => {
      trigger = true;
    }, 400);

    setNumbers(number, '.vertical');

    tl.pause();  
    
    tl = anime.timeline();
  
    tl
    .add({
      targets: '.vertical .box > div.active span',
      translateY: 95,
      delay: anime.stagger(eachNumberDelay),
      duration: speed
    })
    .add({
      targets: '.vertical .box > div:not(.active) span',
      translateY: [-95, 0],
      delay: anime.stagger(eachNumberDelay),
      duration: speed
    }, '-=' + speed * 1.06);
  
    changeClass('.vertical');
  }  
});


$('body').on('click', '.vertical .arrow.bottom', () => {
  if (trigger) {
    trigger = false;
    number--;

    setTimeout(() => {
      trigger = true;
    }, 400);

    setNumbers(number, '.vertical');
  
    tl.pause();  
    
    tl = anime.timeline();
  
    tl
    .add({
      targets: '.vertical .box > div.active span',
      translateY: -95,
      delay: anime.stagger(eachNumberDelay),
      duration: speed
    })
    .add({
      targets: '.vertical .box > div:not(.active) span',
      translateY: [95, 0],
      delay: anime.stagger(eachNumberDelay),
      duration: speed
    }, '-=' + speed * 1.06);
  
    changeClass('.vertical');
  }
});

// FOR HORIZONTAL

$('body').on('click', '.horizontal .arrow.top', () => {
  if (trigger) {
    trigger = false;
    numberH--;

    setTimeout(() => {
      trigger = true;
    }, 400);

    setNumbers(numberH, '.horizontal');
  
    tl.pause();  
    
    tl = anime.timeline();

    anime({
      targets: '.horizontal .box > div:not(.active) span',
      translateX: -185,
      duration: 0
    })
  
    tl.add({
      targets: '.horizontal .box > div.active span',
      translateX: 185,
      easing: 'spring(1, 80, 10, 0)',
      delay: anime.stagger(30),
    })
    .add({
      targets: '.horizontal .box > div:not(.active) span',
      translateX: 0,
      easing: 'spring(1, 80, 10, 0)',
      delay: anime.stagger(30),
    }, '-=' + speed / 1.1);
  
    changeClass('.horizontal');
  }
});

$('body').on('click', '.horizontal .arrow.bottom', () => {
  if (trigger) {
    trigger = false;
    numberH++;

    setTimeout(() => {
      trigger = true;
    }, 400);

    setNumbers(numberH, '.horizontal');

    tl.pause();  
    
    tl = anime.timeline();

    anime({
      targets: '.horizontal .box > div:not(.active) span',
      translateX: 185,
      duration: 0
    })    
  
    tl.add({
      targets: '.horizontal .box > div.active span',
      translateX: -185,
      duration: speed,
      easing: 'spring(1, 80, 10, 0)',
      delay: anime.stagger(30),
    })
    .add({
      targets: '.horizontal .box > div:not(.active) span',
      translateX: 0,
      duration: speed,
      easing: 'spring(1, 80, 10, 0)',
      delay: anime.stagger(30),
    }, '-=' + speed / 1.1);
  
    changeClass('.horizontal');
  }  
});



let setNumbers = (number, direction) => {
  $('.stepper' + direction + ' .box > div:not(.active)').html('');
  
  for (char of number.toString()) {
    $('.stepper' + direction + ' .box > div:not(.active)').append('<span>' + char + '</span>');
  }
}

let changeClass = (direction) => {
  if ($('.stepper' + direction + ' .numbers1').hasClass('active')) {
    $('.stepper' + direction + ' .numbers1').removeClass('active');
    $('.stepper' + direction + ' .numbers2').addClass('active');
  } else {
    $('.stepper' + direction + ' .numbers2').removeClass('active');
    $('.stepper' + direction + ' .numbers1').addClass('active');
  }
}
