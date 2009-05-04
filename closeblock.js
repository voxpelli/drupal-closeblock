Drupal.behaviors.closeblock = function (context) {
  var i, length, block,
  closeblock = Drupal.settings.closeblock;

  length = closeblock.length;
  for (i = 0; i < length; i++) {
    block = jQuery('#block-' + closeblock[i].replace('_', '-'), context);
    if (block.length === 0) {
      continue;
    }
    if (block.find('a.closeblock').length === 0) {
      jQuery('<a></a>').text(Drupal.t('Close')).attr('href', '#').addClass('closeblock').appendTo(block.children()).click((function (name, box) {
        return function () {
          if (!jQuery.cookies.get('closeblock[' + name + ']')) {
            jQuery.cookies.set('closeblock[' + name + ']', 1, {hoursToLive : 31536000});
          }
          block.remove();
          return false;
        };
      })(closeblock[i], block));
    }
  }
};
