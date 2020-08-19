//Suite 는 test의 그룹
suite('Global Tests', function(){
    test('page has a valid title', function(){
        assert(document.title&&document.title.match(/\S/)&&document.title.toUpperCase()!=='TODO');
    });
});