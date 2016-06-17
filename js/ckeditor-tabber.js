(function ($) {
  Drupal.behaviors.ckeditorTabber = {
    attach: function (context, settings) {
      // create tabbed functionality if tabs are available
      var $ckeditorTabber = $('.ckeditor-tabber');
      if($ckeditorTabber.length > 0) {
        // create simple tabbing mechanism for each tab
        // run only once
        $ckeditorTabber.once('ckeditorTabs').each(function() {
          // go through the children and create the tabbed area
          var tabsHTML = '';
          var tabsContentHTML = '';
          var tabX = 0;
          var tabContentX = 0;
          $(this).children().each(function() {
            var $t = $(this);
            var nodeName = this.nodeName.toLowerCase();
            // check whether the child is tab title or tab contents
            if(nodeName.toLowerCase() == 'dt') {
              ++tabX;
              // the first tab is open by default
              var activeClass = (tabX == 1) ? ' active' : '';
              tabsHTML += '<li class="'+activeClass+'"><a class="tab tab-'+tabX + activeClass+'" data-tabber-index="'+tabX+'" href="#">'+$t.text().trim()+'</a></li>';
            } else if(nodeName == 'dd') {
              ++tabContentX;
              // the first tab is open by default
              var activeClass = (tabX == 1) ? ' active' : '';
              tabsContentHTML += '<div class="tab-content tab-content-'+tabContentX + activeClass+'">'+$t.html()+'</div>';
            }
          });

          // create the tabs
          $(this).before('<section class="ckeditor-tabber-tabs"><ul class="tabs-holder">'+tabsHTML+'</ul><div class="tabs-content-holder">'+tabsContentHTML+'</div></section>');

          // get the added tabs container
          var $tabsContainer = $(this).prev();

           // delete the <dl>
          $(this).remove();

          // add event listener for changing tabs
          function changeTab(e) {
            var $t = $(this);
            
            // ignore if we are on active tab
            if(!$t.hasClass('active')) {
              var index = $t.attr('data-tabber-index');
              // remove active classes
              $tabsContainer.find('.active').removeClass('active');

              // add active to tab and to new tab content
              $t.addClass('active').parent().addClass('active');
              $tabsContainer.find('.tab-content-'+index).addClass('active');
            }

            // don't add hash to url
            e.preventDefault();
          }
          $tabsContainer.find('.tab')
            .click(changeTab)
            .keypress(function(e) {
              // if it was enter pressed while user focuses on tab, open the tab
              if(e.which == 13) {
                $(this).click();
              }
            });

        });
      }
    }
  }
})(jQuery);