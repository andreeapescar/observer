/**
 * Created by andreeapescar on 7/15/16.
 */
(function () {
    var index;

    /*var Observer = function (i) {
     this.id = i;
     };

     Observer.prototype = {
     doSmth: function (connValue) {
     //alert(connValue + "  " + this.id);
     document.getElementById(this.id.toString()).innerText = "  " + connValue.toString();

     }
     };
     var Observable     = function () {
     this.subscribers = [];
     };

     Observable.prototype = {
     addSubscriber: function (i) {
     var observer = Observer2(i);
     this.subscribers.push(observer.doSmth.bind(observer));
     },
     fire         : function (data) {
     for (var i = 0; i < this.subscribers.length; i++) {
     this.subscribers[i](data);
     }
     }
     };*/

    var Observer2 = function (id) {
        return {
            doSmth: function (connValue) {
                document.getElementById(id.toString()).innerText = '  ' + connValue;
            }
        };
    };


    var Observable2 = function () {
        var subscribers = [],
            observer;

        return {
            addSubscriber: function (i) {
                observer = Observer2(i);
                subscribers.push(observer.doSmth.bind(observer));
            },
            fire         : function (data) {
                for (var i = 0; i < subscribers.length; i++) {
                    subscribers[i](data);
                }
            }
        }
    };


    var initDoc = function (i) {
        var div  = document.createElement('div'),
            p    = document.createElement('p'),
            span = document.createElement('span');

        span.id     = i;
        span.innerText = '  ' + navigator.onLine;
        p.innerText = "Internet connection is:";
        p.appendChild(span);
        div.appendChild(p);
        document.body.insertBefore(div, document.body.lastElementChild);
    };

    for (index = 0; index < 2; index++) {
        initDoc(index);
    }


    var observable = Observable2();
    for (index = 0; index < 2; index++) {
        observable.addSubscriber(index);
    }


    window.addEventListener("offline", function (e) {
        console.log("offline");
        //observable.fire('online', false);
        observable.fire("false");
    });

    window.addEventListener("online", function (e) {
        console.log("online");
        //observable.fire('online', true);
        observable.fire("true");
    });

})();
