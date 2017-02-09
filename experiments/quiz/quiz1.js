var questions = 
        [ {Q: 'Which house is Harry Potter in?', 
           A: 'Gryffindor',
           B: 'Hufflepuff',
           C: 'Ravenclaw',
           D: 'Slytherin',
           ANS: 'A'},
          {Q: "which was the Frodo's final destination?",
           A: 'Rivendell',
           B: 'Mirkwood',
           C: 'The Lonely Mountain',
           D: 'Mordor',
           ANS: 'D'},
          {Q: "Which is the correct title for C.S. Lewis's fantasy?",
           A: 'Lions and Tigers and Bears',
           B: 'The Lion, The Witch and the Wardrobe',
           C: 'Stars Wars: The Next Generation',
           D: 'Pirates of the Caribbean',
           E: 'The Hobbit',
           F: 'Through the Looking Glass',
           ANS: 'B'
          }
];

questions.forEach(makeQuestion);
