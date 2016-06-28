/* ---------- ---------- ---------- ---------- ---------- ---------- */
/* Source arrays */
/* ---------- ---------- ---------- ---------- ---------- ---------- */


/* Most common syllabes in English language */

syllabes = [
    'the','ing','er','a','ly','ed','i','es','re','tion','in','e','con','y','ter','ex','al','de','com','o','di','en','an','ty','ry','u',
    'ti','ri','be','per','to','pro','ac','ad','ar','ers','ment','or','tions','ble','der','ma','na','si','un','at','dis','ca','cal','man','ap',
    'po','sion','vi','el','est','la','lar','pa','ture','for','is','mer','pe','ra','so','ta','as','col','fi','ful','get','low','ni','par','son',
    'tle','day','ny','pen','pre','tive','car','ci','mo','an','aus','pi','se','ten','tor','ver','ber','can','dy','et','it','mu','no','ple','cu',
    'fac','fer','gen','ic','land','light','ob','of','pos','tain','den','ings','mag','ments','set','some','sub','sur','ters','tu','af','au','cy','fa','im',
    'li','lo','men','min','mon','op','out','rec','ro','sen','side','tal','tic','ties','ward','age','ba','but','cit','cle','co','cov','daq','dif','ence',
    'ern','eve','hap','ies','ket','lec','main','mar','mis','my','nal','ness','ning','nu','oc','pres','sup','te','ted','tem','tin','tri','tro','up',
];

syllabesLength = syllabes.length;

/* Popular names in several English-speaking countries */

names = [
    'Abigail','Alice','Amelia','Angelina','Ann',
    'Ashley','Avery','Barbara','Brianna','Camila',
    'Chloe','Dorothy','Elizabeth','Ella','Emily',
    'Emma','Fiona','Florence','Gabrielle','Haley',
    'Hannah','Isabella','Jasmine','Jennifer','Jessica',
    'Juliette','Kate','Leah','Lily','Linda',
    'Lea','Madison','Makayla','Margaret','Maria',
    'Mariana','Mary','Megan','Mia','Olivia',
    'Patricia','Rachel','Samantha','Sarah','Sophie',
    'Susan','Taylor','Valeria','Victoria','Zoe',
    'Alexander','Anthony','Benjamin','Brandon','Carter',
    'Charles','Charlie','Christian','Christopher','Daniel',
    'David','Deven','Dylan','Elijah','Eric',
    'Ethan','Felix','Gabriel','George','Harry',
    'Hudson','Hunter','Jack','Jacob','James',
    'Jason','Jayden','Jeremiah','John','Joseph',
    'Joshua','Justin','Kevin','Liam','Logan',
    'Lucas','Matthew','Michael','Neil','Noah',
    'Oliver','Owen','Raphael','Richard','Robert',
    'Ryan','Samuel','Thomas','Tyler','William'
];

/* Sample colors */
/* TODO: Split them to several palettes and allow choice of which palettes to use, ie. warm, cool, grays, greens, etc. */

colors = [
    'antiquewhite', 'brown', 'chocolate', 'coral', 'crimson',
    'darkgray', 'darkred', 'darkorange', 'darksalmon',
    'firebrick', 'floralwhite', 'gainsboro', 'gold', 'goldenrod',
    'gray', 'indianred', 'khaki', 'lightcoral', 'lightsalmon', 'lightyellow',
    'maroon', 'mistyrose', 'navajowhite', 'mocassin', 'orange', 'orangered',
    'peru', 'red', 'rosybrown', 'saddlebrown', 'sandybrown', 'sienna',
    'silver', 'slategray', 'tan', 'tomato', 'teal', 'navy', 'black',
];


namesLength = names.length;

/* Domain suffixes */

domains = [
    '.net', '.org', '.edu', '.com',
    '.com', '.com', '.com', '.com',
];

/* Frequency table for word lengths */

wordLengths = [
    1, 1,
    2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3,
    4, 4,
    5
];

/* Frequency table for random syllabes */

syllabeCounts = [
    10,
    15,
    20,
    25,

    30,
    35,
    40,
    45,

    50,
    75,
    100,
    125,

    150,
    175,
    175,
    175,
];
