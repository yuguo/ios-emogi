var fs = require('fs')
  , gm = require('gm');

// 读取图片


// 读取json
var emojis = JSON.parse(fs.readFileSync('emoji-out.json', 'utf8'));

var printemoji = function(i){
	//一排有20个
	m = i % 20;
	n = Math.floor(i / 20);
	if (i >= emojis.length) {return 0;};
	console.log(emojis[i].emoji);
	// 生成缩略图
	
	gm('emoji.out.png')
		.crop(64, 64, 16 + (64 + 16)*m, 37 + (64 + 56)*n)
		.write('out/' + emojis[i].unicode + '.png', function (err) {
			i++;
			printemoji(i)
		  	if (err) console.log(err);
		});

}


printemoji(0);

// for (var i = 0; i <= emojis.length - 1; i++) {
// 	setTimeout(printemoji(i), 1000);
// };
