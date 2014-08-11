(function() {
    'use strict';

    var querySelector = document.querySelector.bind(document),
        elStart = querySelector('#start'),
        elapsedTime = querySelector('#elapsed-time'),
        results = querySelector('#results'),
        time,
        timer = new interval(10, count);

    elStart.addEventListener("ontouchstart" in document.documentElement ? 'touchstart' : 'mousedown', btnAction);
    elStart.addEventListener("ontouchstart" in document.documentElement ? 'touchend' : 'mouseup', btnAction);

    function btnAction(e) {
        if (e.type === 'mousedown' || e.type === 'touchstart') {
            time = 0;
            timer.run();
            results.classList.add('hide');
            e.target.classList.add('pressed');
        } else {
            timer.stop();
            e.target.classList.remove('pressed');
            displayResults();
            timer = new interval(10, count);
        }
    }

    function count() {
        var timePassed = (++time / 100).toString().split('.');
        var s = timePassed[0] < 10 ? '0' + timePassed[0] : timePassed[0];
        var ms = timePassed[1] === undefined ? '00' : timePassed[1];
        if (ms.length === 1)
            ms = ms + '0';
        elapsedTime.innerHTML = s + ":" + ms;
    }

    function displayResults() {
        var seconds = time / 100;
        var ft = ((seconds * seconds) * 16).toFixed(2);
        var meter = (ft / 3.2808).toFixed(2);

        results.innerHTML = meter + "m <br/>" + ft + "ft";
        results.classList.remove('hide');
    }

    function interval(duration, fn) {
        this.baseline = undefined

        this.run = function() {
            if (this.baseline === undefined) {
                this.baseline = new Date().getTime()
            }
            fn()
            var end = new Date().getTime()
            this.baseline += duration

            var nextTick = duration - (end - this.baseline)
            if (nextTick < 0) {
                nextTick = 0
            }
            (function(i) {
                i.timer = setTimeout(function() {
                    i.run(end)
                }, nextTick)
            })(this)
        }
        this.stop = function() {
            clearTimeout(this.timer)
        }
    }
})();
