Tinytest.add('muqube:fake - fromArray - Returns an element out of the given array.', (test) => {    // test body
    let array = [1, 2, 3];
    _.times(10, () => {
        let val = Fake.fromArray(array);
        test.include(array, val);
    });
});