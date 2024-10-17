export const allCourses: {
  name: string;
  type:
    | "Balboa"
    | "Blues"
    | "West Coast Swing"
    | "Lindy Hop"
    | "St. Louis Shag"
    | "Collegiate Shag"
    | "Charleston"
    | "Solo Jazz"
    | "Slow Balboa"
    | "Party";
  day: "Friday" | "Saturday" | "Sunday";
  number?: string;
  level?: "BEG" | "INT" | "ADV" | "ALL" | "BEG/INT" | "INT/ADV";
  teachers?:
    | "Madlen & Jens"
    | "Lenka & Jirka"
    | "Anna & Martin"
    | "Ron"
    | "Mr. Kong & His Swinging Monkeys"
    | "Swing Kong Dance Orchestra & Pilsner Jazz Band";
  time:
    | "15:45 - 17:15"
    | "17:30 - 19:00"
    | "14:00 - 15:30"
    | "12:15 - 13:45"
    | "10:30 - 12:00"
    | "20:00 - 01:30"
    | "20:30 - 00:00";
  place?: string; // DEPO nebo cislo salu
  start: Date;
  end: Date;
}[] = [
  {
    number: "Nr. 01",
    name: "Stretch & Rotation in Flow",
    level: "INT",
    teachers: "Madlen & Jens",
    type: "Lindy Hop",
    day: "Friday",
    time: "15:45 - 17:15",
    start: new Date("2024-11-22T15:45+01:00"),
    end: new Date("2024-11-22T17:15+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 02",
    name: "Easy Redirections",
    level: "BEG",
    teachers: "Lenka & Jirka",
    type: "Collegiate Shag",
    day: "Friday",
    time: "15:45 - 17:15",
    start: new Date("2024-11-22T15:45+01:00"),
    end: new Date("2024-11-22T17:15+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 03",
    name: "Welcome to Slow Balboa",
    level: "BEG/INT",
    teachers: "Lenka & Jirka",
    type: "Slow Balboa",
    day: "Friday",
    time: "17:30 - 19:00",
    start: new Date("2024-11-22T17:30+01:00"),
    end: new Date("2024-11-22T19:00+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 04",
    name: "Shim Sham Improvisation",
    level: "ALL",
    teachers: "Ron",
    type: "Solo Jazz",
    day: "Friday",
    time: "17:30 - 19:00",
    start: new Date("2024-11-22T17:30+01:00"),
    end: new Date("2024-11-22T19:00+01:00"),
    place: undefined,
  },
  {
    number: "Friday party",
    name: "Friday party",
    type: "Party",
    day: "Friday",
    teachers: "Mr. Kong & His Swinging Monkeys",
    time: "20:30 - 00:00",
    start: new Date("2024-11-22T20:00+01:00"),
    end: new Date("2024-11-23T00:00+01:00"),
    place: undefined,
  },

  // Saturday
  {
    number: "Nr. 05",
    name: "Clear Connection",
    level: "ADV",
    teachers: "Ron",
    type: "Lindy Hop",
    day: "Saturday",
    time: "10:30 - 12:00",
    start: new Date("2024-11-23T10:30+01:00"),
    end: new Date("2024-11-23T12:00+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 06",
    name: "Bluesy Moves",
    level: "INT",
    teachers: "Anna & Martin",
    type: "Blues",
    day: "Saturday",
    time: "10:30 - 12:00",
    start: new Date("2024-11-23T10:30+01:00"),
    end: new Date("2024-11-23T12:00+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 07",
    name: "Lovely Travels",
    level: "BEG",
    teachers: "Lenka & Jirka",
    type: "Balboa",
    day: "Saturday",
    time: "10:30 - 12:00",
    start: new Date("2024-11-23T10:30+01:00"),
    end: new Date("2024-11-23T12:00+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 08",
    name: "Rhythmical Variations",
    level: "BEG",
    teachers: "Ron",
    type: "Lindy Hop",
    day: "Saturday",
    time: "12:15 - 13:45",
    start: new Date("2024-11-23T12:15+01:00"),
    end: new Date("2024-11-23T13:45+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 09",
    name: "Charleston in 20’s Style",
    level: "INT/ADV",
    teachers: "Madlen & Jens",
    type: "Charleston",
    day: "Saturday",
    time: "12:15 - 13:45",
    start: new Date("2024-11-23T12:15+01:00"),
    end: new Date("2024-11-23T13:45+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 10",
    name: "Is There a Rock Step in Shag?",
    level: "INT/ADV",
    teachers: "Lenka & Jirka",
    type: "Collegiate Shag",
    day: "Saturday",
    time: "14:00 - 15:30",
    start: new Date("2024-11-23T14:00+01:00"),
    end: new Date("2024-11-23T15:30+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 11",
    name: "Swivels & Texas Handshakes Unlimited",
    level: "INT",
    teachers: "Madlen & Jens",
    type: "Lindy Hop",
    day: "Saturday",
    time: "14:00 - 15:30",
    start: new Date("2024-11-23T14:00+01:00"),
    end: new Date("2024-11-23T15:30+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 12",
    name: "Rhythm & Step",
    level: "BEG",
    teachers: "Anna & Martin",
    type: "Blues",
    day: "Saturday",
    time: "14:00 - 15:30",
    start: new Date("2024-11-23T14:00+01:00"),
    end: new Date("2024-11-23T15:30+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 13",
    name: "Stories in Jazz Music",
    level: "INT",
    teachers: "Ron",
    type: "Lindy Hop",
    day: "Saturday",
    time: "15:45 - 17:15",
    start: new Date("2024-11-23T15:45+01:00"),
    end: new Date("2024-11-23T17:15+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 14",
    name: "Close Embrace",
    level: "BEG",
    teachers: "Anna & Martin",
    type: "Blues",
    day: "Saturday",
    time: "15:45 - 17:15",
    start: new Date("2024-11-23T15:45+01:00"),
    end: new Date("2024-11-23T17:15+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 15",
    name: "Funky Steals",
    level: "ADV",
    teachers: "Lenka & Jirka",
    type: "Lindy Hop",
    day: "Saturday",
    time: "15:45 - 17:15",
    start: new Date("2024-11-23T15:45+01:00"),
    end: new Date("2024-11-23T17:15+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 16",
    name: "Anchors Whips and Stutters",
    level: "BEG",
    teachers: "Madlen & Jens",
    type: "West Coast Swing",
    day: "Saturday",
    time: "17:30 - 19:00",
    start: new Date("2024-11-23T17:30+01:00"),
    end: new Date("2024-11-23T19:00+01:00"),
    place: undefined,
  },
  {
    number: "Saturday party",
    name: "Saturday party",
    type: "Party",
    day: "Saturday",
    teachers: "Swing Kong Dance Orchestra & Pilsner Jazz Band",
    time: "20:00 - 01:30",
    place: "DEPO2015, Pilsen, Czech Republic",
    start: new Date("2024-11-23T20:00+01:00"),
    end: new Date("2024-11-24T01:30+01:00"),
  },

  // Sunday
  {
    number: "Nr. 17",
    name: "Rhythms Everywhere!",
    level: "ADV",
    teachers: "Ron",
    type: "Lindy Hop",
    day: "Sunday",
    time: "10:30 - 12:00",
    start: new Date("2024-11-24T10:30+01:00"),
    end: new Date("2024-11-24T12:00+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 18",
    name: "Intricate Balboa Moves",
    level: "INT",
    teachers: "Madlen & Jens",
    type: "Balboa",
    day: "Sunday",
    time: "10:30 - 12:00",
    start: new Date("2024-11-24T10:30+01:00"),
    end: new Date("2024-11-24T12:00+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 19",
    name: "Walk",
    level: "BEG",
    teachers: "Anna & Martin",
    type: "Blues",
    day: "Sunday",
    time: "10:30 - 12:00",
    start: new Date("2024-11-24T10:30+01:00"),
    end: new Date("2024-11-24T12:00+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 20",
    name: "Texas Tommy Tricks",
    level: "INT",
    teachers: "Lenka & Jirka",
    type: "St. Louis Shag",
    day: "Sunday",
    time: "12:15 - 13:45",
    start: new Date("2024-11-24T12:15+01:00"),
    end: new Date("2024-11-24T13:45+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 21",
    name: "Clear Connection",
    level: "BEG",
    teachers: "Ron",
    type: "Lindy Hop",
    day: "Sunday",
    time: "12:15 - 13:45",
    start: new Date("2024-11-24T12:15+01:00"),
    end: new Date("2024-11-24T13:45+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 22",
    name: "Spicy Basic & Social Patterns",
    level: "BEG",
    teachers: "Madlen & Jens",
    type: "Lindy Hop",
    day: "Sunday",
    time: "12:15 - 13:45",
    start: new Date("2024-11-24T12:15+01:00"),
    end: new Date("2024-11-24T13:45+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 23",
    name: "Limitation & Conceptual Funtime",
    level: "ADV",
    teachers: "Madlen & Jens",
    type: "Lindy Hop",
    day: "Sunday",
    time: "14:00 - 15:30",
    start: new Date("2024-11-24T14:00+01:00"),
    end: new Date("2024-11-24T15:30+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 24",
    name: "Groove & Isolations",
    level: "INT",
    teachers: "Ron",
    type: "Blues",
    day: "Sunday",
    time: "14:00 - 15:30",
    start: new Date("2024-11-24T14:00+01:00"),
    end: new Date("2024-11-24T15:30+01:00"),
    place: undefined,
  },
  {
    number: "Nr. 25",
    name: "Have Fun with Turns",
    level: "BEG",
    teachers: "Lenka & Jirka",
    type: "St. Louis Shag",
    day: "Sunday",
    time: "14:00 - 15:30",
    start: new Date("2024-11-24T14:00+01:00"),
    end: new Date("2024-11-24T15:30+01:00"),
    place: undefined,
  },
];

// document.querySelectorAll('.xxx ul').forEach((el, index) => {
//   const enTr = el.querySelector('li:nth-child(3)').innerText
//   a[index +1 ] = enTr
// })

export const desc = {
  "Nr. 01":
    "We will train patterns to understand how one move can naturally preshape a next one. OR how you break that. Moves with some stretch and rotations. Have some contrast in the right moments to make all the difference.",
  "Nr. 02":
    "Changes of direction as a welcome refresher for moves you may or may not be familiar with.",
  "Nr. 03":
    "An introduction to the slow form of Balboa dancing and some nice figures to use at your next party.",
  "Nr. 04":
    "Exploring how we can change movements we know and how combinations and choreographies can really upgrade our improvisation skills. In the process, we will also learn some fun jazz step variations made popular by old time great dancers, enriching our vocabulary and options in solo jazz. Basic knowledge of the shim sham is recommended!",
  "Nr. 05":
    "Upgrading our connection in partnered dancing, learning effective techniques that can improve our dance and allow using less energy while being able to communicate better with each other.",
  "Nr. 06":
    "In this lesson, we will focus on stylish blues moves and dips that can also be applied to other dances, including Lindy Hop and Balboa.",
  "Nr. 07":
    "Move from your seat and ride the wave of cool! Your balboa will get the wind in its sails!",
  "Nr. 08":
    "Understanding swinging rhythms better, and taking the basic movements we know to the next level by changing their rhythms and adding fun variations on top.",
  "Nr. 09":
    "This class will be simple and fancy Golden 20s Charleston moves. Legs flying high with your partner in a good connection. Dance with us in a reckless and graceful flappers style.",
  "Nr. 10":
    "Do you know the answer? ;) Maybe you will find it in this lesson full of dynamic changes!",
  "Nr. 11":
    "How many Texas Handshake and Swivel variations can you think of? We will show you plenty more, including some superhero swivels.",
  "Nr. 12":
    "In the introductory lesson to Blues, we will focus on the basic pulse and step.",
  "Nr. 13":
    "A fun musicality workshop that will allow to better understand and interact with the layers of Swing music, understanding the structure of the music and explore ways to react to it in our partner dancing.",
  "Nr. 14": "In this lesson, we will focus on dancing in a close embrace.",
  "Nr. 15":
    'So-called "stealing", a skill you seem to find at a party with friends. Playfulness is very welcome, there are no limits to creativity!',
  "Nr. 16":
    "West Coast Swing got it's roots in Lindy Hop developing with the music. We will learn the characteristics of this smooth dance with it's basic signature moves, and work with it's similarities to Lindy Hop, including followers backleading some moves.",
  "Nr. 17":
    "We will learn how to create a more rhythmical movement in our dance, how to take rhythmical inspiration from the music, how we can reflect various instruments and how to be an instrument in our own dancing, adding on top of the music.",
  "Nr. 18":
    "In this class we take your toss-outs and come-arounds to the next level with intricate moves that will spice up your Balboa repertoire. We're excited to see where this french-swedish Balboa excursion will lead us to.",
  "Nr. 19": "In this lesson, we will focus on walking together.",
  "Nr. 20":
    "Not only the popular lindy-hop figure in the St. Louis version and tips on how to use it in interesting ways.",
  "Nr. 21":
    "Upgrading our connection in partnered dancing, understanding the elements that make the connection feel good and also understandable and effective.",
  "Nr. 22":
    "Tired of the basics? No way! We will show you some simple variations, including basic patterns giving you space to sparkle on the floor.",
  "Nr. 23":
    "Including advanced ninja moves the focus of that class is on good partner connection. Limitation games. Plus techniques and fun exercises you'll be able to lead and follow all the steps that you want.",
  "Nr. 24":
    "Enrich your dancing by better connecting to the various grooves Blues music offers, and upgrade your movements by adding different body isolations to your steps",
  "Nr. 25":
    "How do you use spin to improve your basic St. Louis moves and take them up a few levels? Find out when you come in ;)",

  "Lenka & Jirka": `
    <p><strong>Lenka Sekaninova </strong>is a professional dancer, experienced trainer and choreographer as well as founder of and teacher at the Pilsen dance Studio "Dance by Lion's". She grew up on the dance floor and dedicated her life to dancing. She beams with love and enthusiasm for dancing and also infects her students with this passion. During class, she is consequent and expects discipline. According to Lenka, dancing can recharge one's batteries.</p> 
    <p><strong>Jirka Winter</strong> got into dancing for the first time at the age of 14, when he enrolled in swing classes with Lenka. Since then, he has tried many dances, but none has interested him as much as swing. His great pleasure is travelling and thanks to this he has gained experience at swing festivals around the world. During his student life he moved to Dublin, Ireland, for a year where he danced and taught classes at the Full Swing Dublin dance school. In his classes, he focuses most on the feeling of the dance and the music and says that dance is a combination of 3 factors - self, partner and music.</p>
  `,

  "Madlen & Jens": `
    <p>Jens and Madlen live and dance in Dresden, Germany. <strong>Jens Rahnfeld</strong> has been swing dancing in Dresden since 2007. As a DJ &amp; teacher at <em style="">Jam Circle Dresden</em>, he wants to bring as many people as possible to Lindy Hop and get them excited about music and dancing. At his events such as Plenty Hot and Balboa Days, he creates a relaxed space for people to meet, learn, have fun and exchange ideas. Besides Lindy Hop, he is particularly fond of Balboa &amp; Blues. <strong>Madlen Paul</strong> believes that dancing always helps. Dancing has been an integral part of her life for many years. Together they always like to try out new styles and steps. In swing, she particularly likes shag, 20's Charleston, Stealing and Switching. True to the motto 'Always stay curious, you never stop learning'. She loves to share this curiosity and enthusiasm with people in the dance studio and on the world's social floors.</p>
  `,

  "Anna & Martin": `
    <p><strong>Anna Rasmussen</strong> started dancing at the age of 5 in a ballet preparatory school and continued her studies at the State Dance Conservatory in Prague. After graduation she got an engagement at the National Theatre in Prague, where she worked for a total of 14 years.In 2015 she decided to end her ballet career and at the same time tried swing (Lindy Hop and Balboa) for the first time. Although she had been listening to the blues since childhood, in 2020 she started to discover it dancing. She completely fell in love with this dance, regularly attending local and international dance festivals and workshops. In recent years she has also started to develop her choreographic and teaching skills.</p> 
    <p><strong>Martin Klekner</strong> has been dancing since he was a child, first standard and Latin-American dances, and since 2014 exclusively swing. However, when he discovered the Prague blues scene before the covid-period, he quickly realized that this is the dance - slow, emotional, yet full of energy - that he wanted to focus on first and foremost. To broaden his dance experience, he regularly participates in national and international festivals and workshops.</p>
  `,

  Ron: `
    <p><strong>Ron Dobrovinsky</strong> is fascinated with Jazz, its dancers, musicians, rhythms and grooves. He loves taking inspiration from great artists, alongside pursuing his own artistic ideas. He is always excited to share his insights with his students.</p>
    <p>Ron is known for his pedagogy and didactics. He introduces his students to inspiring ideas and movements while promoting deep understanding and fast implementation, in a clear and fun way.</p>
    <p>As a certified fitness trainer with a rich background in other dances and martial arts, he helps dancers create high quality movement in their dance, and provides them with ways to take care of their body and to prevent injuries.</p>
    <p>Ron combines the valuable experience of developing a local scene with his experience as an international teacher. Besides teaching regularly around Europe, Ron is also the director of Swing It dance school, where he teaches and promotes swing dance culture around Israel.</p>
  `,

  "Mr. Kong & His Swinging Monkeys":
    "<p>Four members of Swing Kong Dance Orchestra perform occasionally as a combo named Mr. Kong And His Swinging Monkeys with different repertoire, but again in 30s swing style.</p>",

  "Swing Kong Dance Orchestra & Pilsner Jazz Band": `
    <p><strong>Swing Kong Dance Orchestra</strong> is a newly established 1930s style big band based in Brno, Czech Republic, which aims to play 1930s style swing music with authentic sound, steady dancing rhythm and stirring arrangements that will excite both traditional jazz lovers (that we are) as well as Lindy hoppers and other swing dancers (that we are, too). Amongst our greatest influencers are the orchestras of Jimmie Lunceford, Benny Goodman, Artie Shaw, Count Basie, Duke Ellington, Chick Webb, Cab Calloway, Gene Krupa, Lionel Hampton, Harry James, and many more, from the era of 1930s and early 1940s - the era when the Lindy hop was born. Last but not least, don't you think they look great in custom tailored suits on the stage? You simply must see them live!</p>
    <p><strong>Pilsner Jazz Band</strong>, in the 16 years of its existence, the band has become an integral part of the Czech swing scene. They regularly take part in festivals all over the Czech Republic and in many European countries (Sweden, Switzerland, Latvia, Poland, Germany, ...), in January 2020 the band had great success in the USA (Virginia, Washington DC, New York). The core of the repertoire consists of arranged swing compositions by orchestras by Duke Ellington, Count Basie and Glenn Miller, but also a Dixieland of the so-called Chicago style. In 2021 the band released their fourth CD, a recording from a concert in Washington - <em>Live at the Kennedy Center</em>.&nbsp;<strong >Pilsner Jazz Band is the organizer of the Lindy Hop Herbs Camp</strong>, as well as the International Dixieland Festival Pilsen and regular swing dance evenings "After the siren swing!".</p>
  `,
};
