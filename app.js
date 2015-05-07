var he = require('he');
var fs = require('fs'),
    readline = require('readline');

//读取emoji.txt，并输出到
var rd = readline.createInterface({
    input: fs.createReadStream('emoji.source.txt'),
    output: process.stdout,
    terminal: false
});

var jsonobject = new Array();
var htmlstring = '<!DOCTYPE html>\
<html>\
<head lang="en">\
<meta charset="UTF-8">\
<title></title>\
</head>\
<body style="font-size:32px;width:800px; background-color:#db85ff; line-height:60px;">\
';


rd.on('line', function(line) {
	if (line.lastIndexOf('-', 0) === 0) {

	}else{
		console.log(line + ' ' + he.encode(line));
    	jsonobject.push({emoji:line, unicode:he.encode(line)});
    	htmlstring += line;
    	htmlstring += '\n'
	};
	
});

rd.on('close', function() {
  var writefile = fs.createWriteStream('emoji-out.json');
  writefile.write(JSON.stringify(jsonobject));
  writefile.close();

  var writehtmlfile = fs.createWriteStream('emoji-out.html');
  htmlstring += '</body></html>';
  writehtmlfile.write(htmlstring);
  writehtmlfile.close();

  console.log('Have a great day!');
  // process.exit(0);
});


