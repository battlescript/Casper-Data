var casper = require('casper').create({
    pageSettings: {
       loadImages: false,
       loadPlugins: false,
       userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1588.0 Safari/537.36'
    },
});

// casper.start(url, callback);

var testVar1, testVar2;

casper.start('https://www.codewars.com/users/sign_in', function(){

  this.echo(this.getTitle(), 'INFO');
})

casper.then(function(){

  console.log("page loaded");
  this.fill('form#new_user', { 
          'user[email]': 'adam@8bitlit.com', 
          'user[password]': 'battle'
      }, true);
});

casper.then(function(){
  var text = this.evaluate(function(){
    var script = $('.mtn');
    console.log("SCRIPT ", script);
    return script[0].textContent;
  })
  console.log("TEXT", text);

});

casper.thenOpen('http://www.codewars.com/kata/search/my-languages?q=&beta=false&order_by=rank_id+asc', function(){
  // var urls = this.evaluate(function(){
  //   var links = $('.item-title a');
  //   var linkArray = [];
  //     for (var i = 0; i<links.length ; i++){
  //       linkArray.push(links[i].href);
  //     }
  //   return linkArray;
  // })
  // for (var i = 0; i<urls.length ; i++){
  //   console.log("URL", urls[i]);
  // }
});

casper.then(function(){
  // this.scrollToBottom();
  // this.page.scrollPosition = { top: this.page.scrollPosition["top"] + document.body.scrollHeight, left: 0 };
  this.evaluate(function(){
    window.document.body.scrollTop = document.body.scrollHeight;
  });
});

casper.then(function(){
  this.wait(4000, function(){
    var urls = this.evaluate(function(){
      var links = $('.item-title a');
      var linkArray = [];
        for (var i = 0; i<links.length ; i++){
          linkArray.push(links[i].href);
        }
      return linkArray;
    })
    for (var i = 0; i<urls.length ; i++){
      console.log("URL", urls[i]);
    }
  });
})



casper.run(function(){
  this.echo("ENDED");
  this.exit()
})
