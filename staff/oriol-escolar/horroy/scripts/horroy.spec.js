describe('Horroy', function() {
    // WARN is this initializaton necessary?

    // var horroy;

    // beforeEach(function() {
    //     horroy = new Horroy;
    // });

    describe('from', function() {
        it('should create a Horroy from string', function() {
            var string = 'hola mundo';

            var horr = Horroy.from(string);

            expect(horr.toString()).toBe(string.split('').toString()); // h,o,l,a, ,m,u,n,d,o
        })
    });

    describe('push',function(){

        it('should change the original horroy to the original horroy with extra values given',function(){

            var horr = new Horroy(1,2,3,4);

            var expected = new Horroy(1,2,3,4,5);

            horr.push(5);

            

            expect(horr.toString()).toBe(expected.toString())


        });



    })



});