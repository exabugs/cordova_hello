/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Google
// プロジェクト ID: warm-skill-823 プロジェクト番号: 199529005488
// senderID = プロジェクト番号: 199529005488

// API キー AIzaSyCn0OxlbypwegyGSARLx_CdvhTCAPegWgs
// リファラー  許可されたリファラー
// 有効にした日 2015/01/12 6:12:00
// 有効にしたユーザー exabugs@gmail.com （自分）

// GoogleMap
// <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyCn0OxlbypwegyGSARLx_CdvhTCAPegWgs&amp;sensor=true"></script>
// ->googlemap.js

var server = 'http://192.168.11.3:3000';

var senderID = '199529005488';

if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function (str) {
        return this.indexOf(str, this.length - str.length) !== -1;
    };
}

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str) {
        return this.lastIndexOf(str, 0) === 0;
    }
}

function round(val, unit) {
    return Math.round(val / unit) * unit;
}

// result contains any message sent from the plugin call
function successHandler(result) {
    // alert('result = ' + result);
}

// result contains any error description text returned from the plugin call
function errorHandler(error) {
    alert('SNS register error = ' + error);
}

// iOS
function tokenHandler(result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    alert('device token = ' + result);
}

// Android and Amazon Fire OS
function onNotification(e) {

    $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

    switch (e.event) {
        case 'registered':


            if (e.regid.length > 0) {
                $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                $.ajax({
                    type: 'POST',
                    url: server + '/devices',
                    data: {
                        regid: e.regid
                    },
                    success: function (j_data) {
                    }
                });
                console.log("regID = " + e.regid);
            }
            break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            /*
             if (e.foreground) {
             $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

             // on Android soundname is outside the payload.
             // On Amazon FireOS all custom attributes are contained within payload
             var soundfile = e.soundname || e.payload.sound;
             // if the notification contains a soundname, play it.
             var my_media = new Media("/android_asset/www/" + soundfile);
             my_media.play();
             }
             else {  // otherwise we were launched because the user touched a notification in the notification tray.
             if (e.coldstart) {
             $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
             }
             else {
             $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
             }
             }
             */
            //           $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
            //Only works for GCM
//            $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
            //Only works on Amazon Fire OS
//            $status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');

            navigator.vibrate(300);
            //alert(JSON.stringify(e));
            $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.message + '</li>');
            navigator.notification.alert(
                e.message,  // message
                null,         // callback
                'Message from AWS',            // title
                'OK'                  // buttonName
            );

            break;

        case 'error':
            $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
            break;

        default:
            $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
            break;
    }
}

// iOS
function onNotificationAPN(event) {
    alert(JSON.stringify(event));

    if (event.alert) {
        navigator.notification.alert(event.alert);
    }

    if (event.sound) {
        var snd = new Media(event.sound);
        snd.play();
    }

    if (event.badge) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }
}

function status_log(message) {
    $("#app-status-ul").prepend('<li>' + message + '</li>');
}


//
// iBeacon
//

var minor = null;

function didDetermineStateForRegion(pluginResult) {
    status_log('didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
    //        alert('didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
}

function didStartMonitoringForRegion(pluginResult) {
    status_log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
    //        alert('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
}

var minor_timeout = null;
function outFromRoom() {
    if (minor) {
        _outFromRoom();
    }
    /*
     if (minor_timeout) {
     clearTimeout(minor_timeout);
     _outFromRoom(value)
     }
     minor_timeout = setTimeout(function() {
     _outFromRoom(value);
     }, 1000);
     */
}

function _outFromRoom() {
    status_log('Room out :' + minor);
    minor = null;
    minor_timeout = null;
}

function didRangeBeaconsInRegion(pluginResult) {
    // status_log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
    //       alert('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
    //app.didRangeBeaconsInRegion(pluginResult)
    if (0 < pluginResult.beacons.length) {
        var beacon = pluginResult.beacons[0];
        if (beacon.proximity === 'ProximityImmediate') {

            if (!minor) {
                // 入室処理
                minor = beacon.minor;
                status_log('Room in :' + minor);
            } else {
                if (minor != beacon.minor) {
                    // 退室処理
                    outFromRoom();
                }
            }
        } else {
            // 退室処理
            outFromRoom();
        }
    } else {
        // 退室処理
        outFromRoom();
    }
}

var app = {

    beaconRegions: [
        {
            // id: 'sakurai-001',
            id: 'DUMMY-sakurai',
            uuid: '00000000-057B-1001-B000-001C4D5226A7'
            //  major: 1,
            //  minor: 1
        }
    ],


// Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        var self = this;
        document.addEventListener('deviceready', this.onDeviceReady, false);

        // Hammer
        $.each(document.querySelectorAll('.hammer'), function () {
            self.bindHammerEvents(this);
        });
    },

    googleMap: null,
    googleMarker: null,
    coords: null,

    // Map
    geoSuccess: function (pos) {
        app.coords = pos.coords;
        $.each(document.querySelectorAll('td.coords'), function () {
            $(this).text(pos.coords[this.id]);
        });

        if (app.googleMap) {
            var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            app.googleMap.panTo(latlng);

            // Marker
            if (!app.googleMarker) {
                app.googleMarker = new google.maps.Marker({
                    position: latlng,
                    map: app.googleMap,
                    //icon: 'http://gmaps-samples.googlecode.com/svn/trunk/markers/red/blank.png'
                    //icon: 'www/img/marker.png'
                    //icon: $.get('../img/popy.png')
                    animation: google.maps.Animation.DROP
                });
            } else {
                app.googleMarker.setPosition(latlng);
            }
        }
    },

    geoError: function (e) {
        console.log(e);
    },

    // Hammer
    bindHammerEvents: function (element) {
        Hammer(element).get('pinch').set({enable: true});
        Hammer(element).get('rotate').set({enable: true});
        Hammer(element).get('pan').set({direction: Hammer.DIRECTION_ALL});
        Hammer(element).get('swipe').set({direction: Hammer.DIRECTION_ALL});

        this.hammer(element, ['panstart', 'panmove', 'panend']);
        //this.hammer(element, ['pinchstart', 'pinchmove', 'pinchend']);
        this.hammer(element, ['rotatestart', 'rotatemove', 'rotateend']);
        this.hammer(element, ['swipeleft', 'swiperight', 'swipeup', 'swipedown']);
        this.hammer(element, ['tap', 'press']);
    },

    hammer: function (element, type) {
        Hammer(element).on(type.join(' '), this.hammerEvent);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');

        $.each(document.querySelectorAll('td.device'), function () {
            $(this).text(device[this.id]);
        });

        // Map
        navigator.geolocation.watchPosition(app.geoSuccess, app.geoError);

        var canvas = document.getElementById('map-canvas');
        if (google.maps && canvas) {
            app.googleMap = new google.maps.Map(canvas, {
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
        }


        navigator.vibrate(300);


        //
        // iBeacon
        //
        var delegate = new cordova.plugins.locationManager.Delegate();
        delegate.didDetermineStateForRegion = didDetermineStateForRegion;
        delegate.didStartMonitoringForRegion = didStartMonitoringForRegion;
        delegate.didRangeBeaconsInRegion = didRangeBeaconsInRegion;
        cordova.plugins.locationManager.setDelegate(delegate);

        cordova.plugins.locationManager.requestWhenInUseAuthorization();
        //cordova.plugins.locationManager.requestAlwaysAuthorization();

        // Start monitoring and ranging our beacons.
        for (var r in app.beaconRegions) {
            var region = app.beaconRegions[r];

            var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(
                region.id, region.uuid);
            //   region.id, region.uuid, region.major, region.minor);

            // Start monitoring.
            cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
                .fail(console.error)
                .done();

            // Start ranging.
            cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
                .fail(console.error)
                .done();
        }

        //
        // Push Notification
        //
        var pushNotification = window.plugins.pushNotification;
        if (pushNotification) {

            var notification = null;
            switch (device.platform.toLowerCase()) {
                case 'android':
                    notification = {
                        senderID: senderID,
                        ecb: 'onNotification'
                    };
                    pushNotification.register(successHandler, errorHandler, notification);
                    break;
                case 'ios':
                    notification = {
                        badge: 'true',
                        sound: 'true',
                        alert: 'true',
                        ecb: 'onNotificationAPN'
                    };
                    pushNotification.register(tokenHandler, errorHandler, notification);
                    alert('pushNotification : ios');

                    break;
            }
        }

    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    hammerEvent: function (event) {
        //  console.log('Received Event: ' + event.type);

        var element = event.target;

        if (event.type.endsWith('start')) {
            var bounds = element.getBoundingClientRect();
            element['data-dx'] = element['data-dx'] || bounds.left;
            element['data-dy'] = element['data-dy'] || bounds.top;
            element['data-ds'] = element['data-ds'] || 1.0;
            element['data-dr'] = element['data-dr'] || 0.0;
        }

        // Avoid angle sometimes jumps from 180 to -180
        if (170 <= Math.abs(element['data-dd'] - event.rotation)) {
            event.rotation += 180;
            console.log('jumps from 180 to -180');
        }
        element['data-dd'] = event.rotation;

        var dx = element['data-dx'] + event.deltaX;
        var dy = element['data-dy'] + event.deltaY;
        var ds = element['data-ds'] * event.scale;
        var dr = element['data-dr'] + event.rotation;


        var transform = [
            'translate3d(' + [dx + 'px', dy + 'px', 0].join(',') + ')',
            'scale(' + ds + ')',
            'rotate(' + round(dr, 45) + 'deg)'
        ].join(' ');

        element.style.webkitTransform = transform;

        if (event.type.endsWith('end')) {
            element['data-dx'] = dx;
            element['data-dy'] = dy;
            element['data-ds'] = ds;
            element['data-dr'] = dr;
            element['data-dd'] = 0;

            // Avoid a little moving after Pinch.
            if (1 < event.pointers.length) {
                var pan = Hammer(element).get('pan');
                pan.set({enable: false});
                setTimeout(function () {
                    pan.set({enable: true});
                }, 300);
            }

        }
    }
};


app.initialize();