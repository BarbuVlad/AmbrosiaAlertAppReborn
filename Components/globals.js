import base64 from "react-native-base64";

global.shouldNotificationsFire= true
global.shouldFollowUser = true;
global.showSplash = true
global.initialRegion = null

global.username = 'AA_user'
global.password = 'ambrosiaAlertPass321'
global.authHeader = 'Basic ' + base64.encode(`${username}:${password}`);
