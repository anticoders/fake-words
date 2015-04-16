Notes for updating to Meteor 0.9.0
----------------------------------

This package is now called `anti:fake`.



# Fake text and data generator for Meteor.js

From an article about *Lorem ipsum*:

> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text (...)

And here's the problem: since *Lorem ipsum* is so widely used among developers and designers, it became recognizable and is as distracting as plain English text.

Random text doesn't have this problem. Every time you fill database with fake data, this package creates text randomly generated from most popular English syllabes. The result is a not distracting, random Latin-looking piece of text that still has frequencies and qualities of a typical English article.

Additional utility function allow you to create a fake user object.

If you need more functionality, like fake web address or geographical location, please extend the package and send me a pull request.

# Usage

    meteor add anti:fake


# API


&nbsp;

&nbsp;

### `Fake.word()`

Returns a random word.

*Sample result:*

> Ingbelytion


&nbsp;

&nbsp;

### `Fake.sentence([length])`

*Sample result:*

> Perexnation tily ly someveraticmer sontionamagment inesersinar.

*Optional params:*

- `length`: number of words in the sentence


&nbsp;

&nbsp;

### `Fake.paragraph([length])`


*Sample result:*

> Agepro aldeadunar cones mere exintyecar ofsub refi icerse a muter. Terasedersmag citeden tertionscomiest com ed termenttain lotione uper terpre. Bleday fiu so manen ri. Extionoter ing dity artal erexi edi. De alre ieran altic dianati com. Bani naetordecom reerly comture u reti. Oyoraing con laenter perer com titer. Lyrec tlelec mened tionfulto condide enper miscom terty tionco enterthe ertle. Etuex ingtiesrily troi inter rilow exdisuget ingre lycon tanuperpro ialardisto exes. Inuausry allyaca disna ence aget. Af atias oalthe ac nessence dyob tiveraedi enmu conni. Addytionli bleestydi mocom com naoes. Ryture deu inter mansub.

*Optional params:*

- `length`: number of sentences in the paragraph



&nbsp;

&nbsp;

### `Fake.user([params])`

*Sample result:*

    {
      "name": "Kate",
      "surname": "Belyto",
      "fullname": "Kate Belyto",
      "email": "kate@proespa.com",
    }

*Optional params:*
 
- `fields`: Decide what fields will be included in the result object. Possible values:
    - name
    - surname
    - fullname
    - username
    - email
    - emails.address,
    - profile.name

*Example:*

        Fake.user({
            fields: ['name', 'username', 'emails.address', 'profile.name'],
        });


&nbsp;

&nbsp;

### `Fake.color()`

Returns a random named html color.

*Sample result:*

> navajowhite


&nbsp;

&nbsp;

### `Fake.fromArray(customArray)`

Selects a random element from provided array.

*Example:*

    fake.fromArray(['banana', 'apple', 'strawberry', 'raspberry', 'pear']);
    // 'pear'

&nbsp;

&nbsp;

### `Fake.integer([[min,]max])`

Generate a random integer. If no argument passed, the default output is a random integer between 0 to 1000.

*Example:*

    Fake.integer();
    // 476
    Fake.integer(100);
    // 23
    Fake.integer(5,10);
    // 6

### `Fake.float([[min,]max])`

Generate a random float. If no argument passed, the default output is a random float between 0 to 1000.

*Example:*

    Fake.float();
    // 682.4292875826359
    Fake.float(100);
    // 18.00180042628199
    Fake.float(5,10);
    // 8.542717032833025


