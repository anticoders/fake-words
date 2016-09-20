Tinytest.add('muqube:fake - simpleSchemaDoc - Supports String, Number and Boolean type fields in a SimpleSchema definition', (test) => {    // test body
    let schema = new SimpleSchema({
        numberField: {
            type: Number,
        },
        stringField: {
            type: String
        },
        booleanField: {
            type: Boolean
        }
    });

    let doc = Fake.simpleSchemaDoc(schema);
    test.isTrue(_.isNumber(doc.numberField));
    test.isTrue(_.isString(doc.stringField));
    test.isTrue(_.isBoolean(doc.booleanField));
});

Tinytest.add('muqube:fake - simpleSchemaDoc - Respects max and min limits of Number type fields in a SimpleSchema definition', (test) => {    // test body
    let schema = new SimpleSchema({
        numberField: {
            type: Number,
            max: 10,
            min: 0
        }
    });

    _.times(10, () => {
        let doc = Fake.simpleSchemaDoc(schema);
        test.isTrue(_.isNumber(doc.numberField));
        test.isFalse(10 < doc.numberField);
        test.isFalse(0 > doc.numberField);
    });

});