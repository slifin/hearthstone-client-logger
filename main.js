(function(){
	'use strict';
	var fs = require('fs');
	function HearthStoneLogger(){
		var that = {},
		configFile = 'log.config',
		getDataLocation = function(){
			return 'C:/Program Files (x86)/Hearthstone/Hearthstone_Data/output_log.txt';
		},
		getConfigLocation = function(){
			return process.env.LOCALAPPDATA+'/Blizzard/Hearthstone/'+configFile;
		},
		configExist = function(){
			return fs.existsSync(getConfigLocation());
		},
		createConfig = function(callback){
			if (configExist()) return; 
			fs.renameSync(process.cwd()+'/'+configFile, getConfigLocation());
		},
		parseEvents = function(line){
			if (line.toLowerCase().indexOf('victory_screen_start')!==-1){
				alert('yo win yourself a horse');
			}
			if (line.toLowerCase().indexOf('defeat_screen_start')!==-1){
				alert('yo lost yo game');
			}
			console.log(line);
		},
		monitorChanges = function(){
			var ft = require('file-tail').startTailing(getDataLocation());
			ft.on('line',parseEvents);
		}
		;
		that.monitorChanges = monitorChanges; 
		that.createConfig = createConfig;
		return that; 
	}
	var hearth = new HearthStoneLogger(); 
	hearth.createConfig();
	hearth.monitorChanges();
})();