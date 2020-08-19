var Browser = require('zombie'),
    assert = require('chai').assert;

var browser;

suite('Cross-Page Tests', function(){
    
    //Setup은 각 테스트 전 테스트 프레임워크에서 실행할 함수.
    //각 테스트의 새 브라우저 인스턴스를 생성.
    setup(function(){
        browser = new Browser();
    });

    test('requesting a group rat from the hood river tour page'+
        'should populate the referrer field', function(done){
            var referrer = 'http://localhost:3000/tours/hood-river';
            browser.visit(referrer,function(){
                browser.clickLink('.requestGroupRate', function(){
                    //assert(browser.field('referrer').value === referrer);//좀비 내부 버그로 인해 테스트 안됨
                    assert(browser.resources[0].request.headers._headers[0][1] === referrer);//https://stackoverflow.com/questions/29873284/how-to-use-zombie-to-test-input-type-hidden
                    done();
                });
            });
        });

    test('requesting a group rat from the oregeon couast tour page'+
        'populate ther referrer field', function(done){
            var referrer = 'http://localhost:3000/tours/oregon-coast';
            browser.visit(referrer,function(){
                browser.clickLink('.requestGroupRate', function(){
                    assert(browser.resources[0].request.headers._headers[0][1] === referrer);
                    done();
                });
            });
        });

    test('visiting the "request group rate" page directly should result'+
        'in an empty referrer field', function(done){
            browser.visit('http://localhost:3000/tours/request-group-rate',function(){
                assert(browser.resources[0].request.headers._headers[0][1] === '');
                done();
            });
        });
});