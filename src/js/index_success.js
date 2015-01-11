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

if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(str) {
        return this.indexOf(str, this.length - str.length) !== -1;
    };
}

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.lastIndexOf(str, 0) === 0;
    }
}


var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        var element = document.getElementById('hammer');
        //var element = document.body;
        // Hammer
        Hammer(element).get('pinch').set({enable: true});
        //  Hammer(element).get('rotate').set({enable: true});
        Hammer(element).get('pan').set({direction: Hammer.DIRECTION_ALL});
        Hammer(element).get('swipe').set({direction: Hammer.DIRECTION_ALL});

        this.hammer(element, ['panstart', 'panmove', 'panend']);
        this.hammer(element, ['pinchstart', 'pinchmove', 'pinchend']);
        this.hammer(element, ['rotatestart', 'rotatemove']);
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
        console.log('Received Event: ' + event.type);

        var element = event.target;
        var center = event.center;

        element['data-ds'] = element['data-ds'] || 1.0;
        var ds = event.scale * element['data-ds']; // scale

        if (event.type.endsWith('start')) {
//            var dw = (1.0 - ds) * element.clientWidth;
//            var dh = (1.0 - ds) * element.clientHeight;
//            console.log('dw:' + dw + ' dh:' + dh);

            var bounds = element.getBoundingClientRect();
//            console.log('bounds.left:' + bounds.left + ' bounds.top:' + bounds.top);
//            element['data-dx'] = center.x - bounds.left;
//            element['data-dy'] = center.y - bounds.top;
            element['data-dx'] = element['data-dx'] || bounds.left;
            element['data-dy'] = element['data-dy'] || bounds.top;

        }

        //    var dx = center.x - element['data-dx'];
        //    var dy = center.y - element['data-dy'];
            var dx = event.deltaX + element['data-dx'];
            var dy = event.deltaY + element['data-dy'];

        var transform = [
            'translate3d(' + [dx + 'px', dy + 'px', 0].join(',') + ')',
            'scale(' + ds + ')'
        ].join(' ');

//        console.log('scale:' + event.scale);

        var bounds = element.getBoundingClientRect();
        console.log('bounds.left:' + bounds.left + ' bounds.top:' + bounds.top);

        element.style.webkitTransform = transform;

        if (event.type.endsWith('end')) {
            element['data-dx'] = dx;
            element['data-dy'] = dy;
            element['data-ds'] = event.scale * element['data-ds'];
        }
    }
};


app.initialize();