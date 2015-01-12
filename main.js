(function(){
	'use strict';
	var fs = require('fs');
	function HearthStoneLogger(){
		var that = {},
		configFile = 'log.config',
		getDataLocation = function(){
			//TODO unhardcode
			return 'C:/Program Files (x86)/Hearthstone/Hearthstone_Data/output_log.txt';
		},
		getConfigLocation = function(){
			//TODO osx
			return process.env.LOCALAPPDATA+'/Blizzard/Hearthstone/'+configFile;
		},
		configExist = function(){
			return fs.existsSync(getConfigLocation());
		},
		createConfig = function(callback){
			//TODO 32bit && osx 
			if (configExist()) return; 
			fs.renameSync(
				process.cwd()+'/'+configFile,
				getConfigLocation()
				);
		},
		parseEvents = function(){
			alert('called');
		},
		monitorChanges = function(){
			fs.watchFile(getDataLocation(),parseEvents);
			//here I need to detect when an arena
			//pick event is happening 
			//then store the pick till win/lose condition happens
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