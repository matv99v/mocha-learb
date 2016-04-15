const assert = require('chai').assert;
const Timer  = require('../src/Timer');

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}


suite('Timer testing!');

test('Test timer object API', () => {
    const timer = new Timer();

    assert.instanceOf(timer, Timer, 'timer should be an instance of Timer class');

    assert.isFunction(timer.start, 'timer should have "start" method');
    assert.isFunction(timer.stop, 'timer should have "stop" method');
    assert.isFunction(timer.getSpentTime, 'timer should have "getSpentTime" method');
    assert.isFunction(timer.clear, 'timer should have "clear" method');
});

test('Check timer measurments', (done) => {
    const timer = new Timer();
    assert.equal(timer.getSpentTime(), 0,  'should be equal to 0');

    timer.start();

    delay(250)
        .then(() => assert.closeTo(timer.getSpentTime(), 250, 50, 'should be between [200, 300]' ))
        .then(() => delay(250))
        .then(() => assert.closeTo(timer.getSpentTime(), 500, 50, 'should be between [450, 550]' ))
        .then(() => delay(500))
        .then(() => assert.closeTo(timer.getSpentTime(), 1000, 50, 'should be between [950, 1050]' ))
        .then(() => {
            timer.clear();
            assert.equal(timer.getSpentTime(), 0, 'should be equal to 0');
        })
        .then(() => delay(300))
        .then(() => assert.closeTo(timer.getSpentTime(), 300, 50, 'should be between [250, 350]' ))
        .then(() => timer.stop())
        .then(() => delay(500))
        .then(() => assert.closeTo(timer.getSpentTime(), 300, 50, 'should be between [250, 350]' ))
        .then(() => timer.start())
        .then(() => delay(700))
        .then(() => {
            timer.stop();
            timer.clear();
            assert.equal(timer.getSpentTime(), 0, 'should be equal to 0');
            done();
        })
        .catch(err => done(err)
    );
});

test('Check creating timer with arguments', (done) => {
    const timer = new Timer(500);
    assert.equal(timer.getSpentTime(), 500, 'should be equal to 500');

    timer.start();

    delay(500)
        .then(() => {
            assert.closeTo(timer.getSpentTime(), 1000, 50, 'should be between [950, 1050]' );
            timer.clear();
            assert.closeTo(timer.getSpentTime(), 0, 50, 'should be between [950, 1050]' );
            timer.stop();
        })
        .then(() => done())
        .catch(err => done(err));
});
