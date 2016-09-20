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

Tinytest.add('muqube:fake - simpleSchemaDoc - Create inner Object', (test) => {
    let s = new SimpleSchema({f4: {type: Number}});
    let s2 = new SimpleSchema({
        f1: {type: String},
        f2: {type: Object},
        f3: {type: s}
    });
    let doc = Fake.simpleSchemaDoc(s2);

    test.isTrue(_.isString(doc.f1));
    test.isTrue(_.isObject(doc.f2));
    test.isTrue(_.isObject(doc.f3));
    test.isTrue(_.isNumber(doc.f3.f4));
});