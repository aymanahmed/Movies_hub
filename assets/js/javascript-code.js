(function() {
  // {
  //   question: "Justice or revenge",
  //   choices: ['Lego Star Wars', 'Batman v Superman', 'The Revenant', 'Jurassic World'],
  //   correctAnswer: 1
  // }
 
  var questions = generateQuestions();  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questions = generateQuestions();
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#container').css({'background-image' : 'url("assets/images/oscar game2.jpg")'});
    $('#quiz').css({'margin': '-40px 0 -50px 200px'});
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  $('.button1').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button1').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  $('.button2').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button2').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<div id="quest"> <h2 id="question_label">Question ' + (index + 1) + ':</h2> </div>');
    qElement.append(header);
    
    var question = header.append('<p id="quest_content">'+questions[index].question+'</p>');
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul id="answers">');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li class="li">');
      input = '<input id="choice_'+i+'" type="radio" value="'+i+'" name="answer"><label for="choice_'+i+'">'+questions[index].choices[i]+'</label>';
      // input = '<input id="choice_'+i+'" type="radio" name="answer" value=' + i + ' ><label for=" choice_'+i+'">'+questions[index].choices[i]+'</label>';
      // input += ;
      item.append(input);
      radioList.append(item);

    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }

         $('.li').on('click',function(e) {
          var i = $(this).index();
          if (!$(e.target).is('#choice_'+i)) {
                  $(this).find("#choice_"+i).trigger('click');
                  $('.li').css({'background-color' : '#939395'});
                  $(this).css({'background-color' : '#07aaeb'});
          }
       });
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    console.log(numCorrect);
    $('#container').css({'background-image' : 'url("assets/images/oscar game3.jpg")'});
    $('#quiz').css({'margin': '-218px 10px 0px 290px'});

    if(numCorrect == 0)
	{
    score.append('<div id="quest"> You Got ' + numCorrect +' Correct Answers You LOST!</div>');
      
      	  }
    else if(numCorrect < 5){
      score.append('<div id="quest"><p id="quest_content"> You Got ' + numCorrect +' Correct Answers You won a Bronze Oscar</p></div>');
      score.append("</br><img class='oscar' src='assets/images/bronze oscar.png' />");
      $(".button2").css({'margin-top' : '-20px'});
	  }
    else if(numCorrect < 8 ){
      score.append('<div id="quest"><p id="quest_content"> You Got ' + numCorrect +' Correct Answers You won a Silver Oscar</p></div>');
      score.append("</br><img class='oscar' src='assets/images/silver oscar.png' />");
      $(".button2").css({'margin-top' : '-20px'});
	  }
    else{
      score.append('<div id="quest"><p id="quest_content"> You Got ' + numCorrect +' Correct Answers You won a Golden Oscar</p></div>');
      score.append("</br><img class='oscar' src='assets/images/golden oscar.png' />");
      $(".button2").css({'margin-top' : '-20px'});


	  }

    return score;
  }
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  function generateQuestions(){
      var data = [ { "title": "Captain America: Civil War", "tag": "Divided We Fall" }, { "title": "The Secret Life of Pets", "tag": "Think this is what they do all day?" }, { "title": "The Conjuring 2", "tag": "The next true story from the case files of Ed and Lorraine Warren" }, { "title": "The Dark Knight", "tag": "Why So Serious?" }, { "title": "The Legend of Tarzan", "tag": "Human. Nature." }, { "title": "Jurassic World", "tag": "The park is open." }, { "title": "Big Hero 6", "tag": "From the creators of Wreck-it Ralph and Frozen" }, { "title": "Batman v Superman: Dawn of Justice", "tag": "Justice or revenge" }, { "title": "10 Cloverfield Lane", "tag": "Monsters come in many forms." }, { "title": "London Has Fallen", "tag": "The world's leaders have assembled. So have their enemies." }, { "title": "The Martian", "tag": "Bring Him Home" }, { "title": "Ice Age: Collision Course", "tag": "One small step. One giant mess." }, { "title": "Guardians of the Galaxy", "tag": "All heroes start somewhere." }, { "title": "Now You See Me 2", "tag": "You Haven't Seen Anything Yet" }, { "title": "John Wick", "tag": "Don't set him off." }, { "title": "Furious 7", "tag": "Vengeance Hits Home" }, { "title": "Star Wars: The Force Awakens", "tag": "Every generation has a story." }, { "title": "The Hateful Eight", "tag": "No one comes up here without a damn good reason." }, { "title": "Terminator Genisys", "tag": "Reset the future" }, { "title": "The Equalizer", "tag": "What do you see when you look at me?" }, { "title": "The Revenant", "tag": "(n. One who has returned, as if from the dead.)" }, { "title": "The Incredibles", "tag": "No gut, no glory" }, { "title": "The Hobbit: The Battle of the Five Armies", "tag": "Witness the defining chapter of the Middle-Earth saga" }, { "title": "Kung Fu Panda 3", "tag": "Grab destiny by the rice dumplings." }, { "title": "The Hunger Games: Mockingjay - Part 2", "tag": "The fire will burn forever." }, { "title": "Spectre", "tag": "A Plan No One Escapes" }, { "title": "Insurgent", "tag": "One Choice Can Destroy You" }, { "title": "Star Wars", "tag": "A long time ago in a galaxy far, far away..." }, { "title": "The Hunger Games: Catching Fire", "tag": "Every revolution begins with a spark." }, { "title": "The BFG", "tag": "The world is more giant than you can imagine." }, { "title": "Ant-Man", "tag": "Heroes Don't Get Any Bigger" }, { "title": "Avengers: Age of Ultron", "tag": "A New Age Has Come." }, { "title": "Whiplash", "tag": "The road to greatness can take you to the edge." }, { "title": "The Purge: Election Year", "tag": "Keep America great" }, { "title": "The Hunger Games: Mockingjay - Part 1", "tag": "Fire burns brighter in the darkness" }, { "title": "Batman Begins", "tag": "Evil fears the knight." }, { "title": "The Maze Runner", "tag": "Run - Remember - Survive" }, { "title": "Kill Bill: Vol. 1", "tag": "Go for the kill." }, { "title": "X-Men: Apocalypse", "tag": "Only the strong will survive" }, { "title": "The Witch", "tag": "Evil takes many forms." }, { "title": "Teenage Mutant Ninja Turtles", "tag": "Mysterious. Dangerous. Reptilious. You've never seen heroes like this." }, { "title": "Mission: Impossible - Rogue Nation", "tag": "Desperate Times. Desperate Measures." }, { "title": "Iron Man", "tag": "Heroes aren't born. They're built." }, { "title": "The Jungle Book", "tag": "Man is forbidden!" }, { "title": "Lucy", "tag": "The average person uses 10% of their brain capacity. Imagine what she could do with 100%." }, { "title": "The Shawshank Redemption", "tag": "Fear can hold you prisoner. Hope can set you free." }, { "title": "San Andreas", "tag": "A rescue pilot survived an earthquake, this is what happens next" }, { "title": "Pixels", "tag": "Game On." }, { "title": "Demolition", "tag": "Life: Some disassembly required." }, { "title": "Gone Girl", "tag": "You don't know what you've got 'til it's..." }, { "title": "Birdman", "tag": "or (The Unexpected Virtue of Ignorance)" }, { "title": "Thor: The Dark World", "tag": "Delve into the darkness" }, { "title": "Fury", "tag": "War never ends quietly." }, { "title": "X-Men: Days of Future Past", "tag": "To save the future, they must alter the past" }, { "title": "Spotlight", "tag": "Break the story. Break the silence." }, { "title": "Forrest Gump", "tag": "The world will never be the same, once you've seen it through the eyes of Forrest Gump." }, { "title": "Inglourious Basterds", "tag": "Once upon a time in Nazi occupied France..." }, { "title": "Tomorrowland", "tag": "Imagine a world where nothing is impossible." }, { "title": "Inception", "tag": "Your mind is the scene of the crime." }, { "title": "Cinderella", "tag": "Midnight is just the beginning." }, { "title": "Nightcrawler", "tag": "The city shines brightest at night" }, { "title": "Man of Steel", "tag": "You will believe that a man can fly." }, { "title": "The Fundamentals of Caring", "tag": "Caring is a funny thing." }, { "title": "Captain America: The Winter Soldier", "tag": "In heroes we trust." }, { "title": "Captain America: The First Avenger", "tag": "When patriots become heroes" }, { "title": "Suicide Squad", "tag": "Worst Heroes Ever" }, { "title": "Thor", "tag": "Two worlds. One hero." }, { "title": "Spider-Man", "tag": "With great power comes great responsibility." }, { "title": "The Fault in Our Stars", "tag": "One Sick Love Story" }, { "title": "Pirates of the Caribbean: The Curse of the Black Pearl", "tag": "Prepare to be blown out of the water." }, { "title": "Chronicle", "tag": "What are you capable of?" }, { "title": "The Imitation Game", "tag": "The true enigma was the man who cracked the code." }, { "title": "Independence Day", "tag": "Earth. Take a good look. It might be your last." }, { "title": "Inside Out", "tag": "Meet the little voices inside your head." }, { "title": "Eye in the Sky", "tag": "Welcome to the new front line" }, { "title": "The Cell", "tag": "When everyone is connected no one is safe." }, { "title": "The Matrix", "tag": "Welcome to the Real World." }, { "title": "Ice Age: The Meltdown", "tag": "The Ice age is melting away." }, { "title": "Minions", "tag": "Before Gru, they had a history of bad bosses" }, { "title": "Midnight Special", "tag": "He's not like us." }, { "title": "All About Anna", "tag": "The passionate story of a sensuous woman." }, { "title": "Dawn of the Planet of the Apes", "tag": "One last chance for peace." }, { "title": "Frozen", "tag": "Only the act of true love will thaw a frozen heart." }, { "title": "Se7en", "tag": "Seven deadly sins. Seven ways to die." }, { "title": "Warcraft: The Beginning", "tag": "Two worlds. One home." }, { "title": "Gods of Egypt", "tag": "The battle for eternity begins" }, { "title": "Pulp Fiction", "tag": "Just because you are a character doesn't mean you have character." }, { "title": "Django Unchained", "tag": "Life, liberty and the pursuit of vengeance." }, { "title": "Pacific Rim", "tag": "To Fight Monsters, We Created Monsters" }, { "title": "Run All Night", "tag": "No sin goes unpunished" }, { "title": "Finding Nemo", "tag": "There are 3.7 trillion fish in the ocean, they're looking for one." }, { "title": "Avatar", "tag": "Enter the World of Pandora." }, { "title": "Reservoir Dogs", "tag": "Every dog has his day." }, { "title": "The Hobbit: An Unexpected Journey", "tag": "From the smallest beginnings come the greatest legends." }, { "title": "The Godfather", "tag": "An offer you can't refuse." }, { "title": "Exodus: Gods and Kings", "tag": "Once brothers, now enemies." }, { "title": "The Purge: Anarchy", "tag": "Welcome to America, where one night a year, all crime Is legal." }, { "title": "It Follows", "tag": "It doesn't think, it doesn't feel, it doesn't give up" }, { "title": "Triple 9", "tag": "The Code on the Street is Never Black & White" }, { "title": "Jupiter Ascending", "tag": "Expand your universe." }, { "title": "WALL·E", "tag": "An adventure beyond the ordinar-E." }, { "title": "Now You See Me", "tag": "4 amazing magicians. 3 impossible heists. 1 billion dollars. This is no illusion." }, { "title": "Harry Potter and the Prisoner of Azkaban", "tag": "Something wicked this way comes." }, { "title": "The Fifth Element", "tag": "There is no future without it." }, { "title": "Her", "tag": "A Spike Jonze Love Story" }, { "title": "Fight Club", "tag": "How much can you know about yourself if you've never been in a fight?" }, { "title": "Iron Man 2", "tag": "It's not the armor that makes the hero, but the man inside." }, { "title": "Night at the Museum: Secret of the Tomb", "tag": "One Final Night to Save the Day." }, { "title": "The Dark Knight Rises", "tag": "The Legend Ends" }, { "title": "Chappie", "tag": "I am consciousness. I am alive. I am Chappie." }, { "title": "The Nice Guys", "tag": "Nice pair" }, { "title": "The Avengers", "tag": "Some assembly required." }, { "title": "The Boy", "tag": "Every child needs to feel loved." }, { "title": "The Lord of the Rings: The Fellowship of the Ring", "tag": "One ring to rule them all" }, { "title": "Alice Through the Looking Glass", "tag": "It's time for a little madness." }, { "title": "Maleficent", "tag": "Don't believe the fairy tale." }, { "title": "Alien", "tag": "In space no one can hear you scream." }, { "title": "Prometheus", "tag": "The Search for Our Beginning Could Lead to Our End." }, { "title": "Taken 3", "tag": "It Ends Here" }, { "title": "Despicable Me", "tag": "Superbad. Superdad." }, { "title": "Central Intelligence", "tag": "Saving the world takes a little Hart and a big Johnson" }, { "title": "Pirates of the Caribbean: On Stranger Tides", "tag": "Live Forever Or Die Trying." }, { "title": "Vice", "tag": "Where the future is your past." }, { "title": "Room", "tag": "Love knows no boundaries" }, { "title": "Divergent", "tag": "What makes you different makes you dangerous." }, { "title": "Green Room", "tag": "One way in. No way out." }, { "title": "How to Be Single", "tag": "Welcome to the party" }, { "title": "The Good Dinosaur", "tag": "Little Arms With Big Attitude" }, { "title": "The Huntsman: Winter's War", "tag": "The story before Snow White" }, { "title": "Hellboy", "tag": "From the Dark Side to Our Side." }, { "title": "Home", "tag": "Worlds Collide" }, { "title": "Ratatouille", "tag": "He's dying to become a chef." }, { "title": "Monsters, Inc.", "tag": "We Scare Because We Care." }, { "title": "Mission: Impossible - Ghost Protocol", "tag": "No Plan. No Backup. No Choice." }, { "title": "Concussion", "tag": "Even Legends Need a Hero" }, { "title": "Fantastic Four", "tag": "Change is coming." }, { "title": "Sicario", "tag": "The deeper you go, the darker it gets." }, { "title": "The Finest Hours", "tag": "32 survivors, room for 12." }, { "title": "Ghostbusters", "tag": "Who You Gonna Call" }, { "title": "Harry Potter and the Deathly Hallows: Part 1", "tag": "One Way… One Fate… One Hero." }, { "title": "Gravity", "tag": "Don't Let Go" }, { "title": "The Lord of the Rings: The Return of the King", "tag": "The eye of the enemy is moving." }, { "title": "Kick-Ass", "tag": "Shut up. Kick ass." }, { "title": "The Big Short", "tag": "This is a true story." }, { "title": "The Intouchables", "tag": "Sometimes you have to reach into someone else's world to find out what's missing in your own." }, { "title": "Iron Man 3", "tag": "Unleash the power behind the armor." }, { "title": "Whiskey Tango Foxtrot", "tag": "From the headlines to the front lines" }, { "title": "Kill Bill: Vol. 2", "tag": "The bride is back for the final cut." }, { "title": "Ouija", "tag": "Keep telling yourself it's just a game" }, { "title": "District 9", "tag": "You are not welcome here." }, { "title": "Kingsman: The Secret Service", "tag": "Manners maketh man." }, { "title": "The Bourne Identity", "tag": "He was the perfect weapon until he became the target." }, { "title": "Finding Dory", "tag": "An unforgettable journey she probably won't remember." }, { "title": "Dirty Grandpa", "tag": "This is Jason. He's a little worried about his grandpa." }, { "title": "Bridge of Spies", "tag": "In the shadow of war, one man showed the world what we stood for." }, { "title": "Ex Machina", "tag": "There is nothing more human than the will to survive" }, { "title": "Transformers: Age of Extinction", "tag": "This is not war. It's extinction." }, { "title": "Up", "tag": "Fly Up to Venezuela" }, { "title": "Knock Knock", "tag": "One night can cost you everything." }, { "title": "The Truman Show", "tag": "On the air. Unaware" }, { "title": "Schindler's List", "tag": "Whoever saves one life, saves the world entire." }, { "title": "Terminator 2: Judgment Day", "tag": "It's nothing personal." }, { "title": "Southpaw", "tag": "Believe in Hope." }, { "title": "World War Z", "tag": "Remember Philly!" }, { "title": "Alice in Wonderland", "tag": "You're invited to a very important date." }, { "title": "Edge of Tomorrow", "tag": "Live, Die, Repeat" }, { "title": "Pitch Perfect 2", "tag": "We're back pitches" }, { "title": "Ice Age", "tag": "They came. They thawed. They conquered." }, { "title": "The Hobbit: The Desolation of Smaug", "tag": "Beyond darkness... beyond desolation... lies the greatest danger of all." }, { "title": "Men in Black 3", "tag": "They are back... in time." }, { "title": "Zero Days", "tag": "World War 3.0" }, { "title": "Pirates of the Caribbean: Dead Man's Chest", "tag": "Jack is back!" }, { "title": "Sherlock Holmes", "tag": "Nothing escapes him." }, { "title": "The Lord of the Rings: The Two Towers", "tag": "A New Power Is Rising." }, { "title": "Blackhat", "tag": "We are no longer in control." }, { "title": "Men in Black", "tag": "Protecting the Earth from the scum of the universe." }, { "title": "Skyfall", "tag": "Think on your sins." }, { "title": "Lara Croft: Tomb Raider", "tag": "Born into Wealth. Groomed by the Elite. Trained for Combat." }, { "title": "My Big Fat Greek Wedding 2", "tag": "People change. Greeks don't." }, { "title": "Titanic", "tag": "Nothing on Earth could come between them." }, { "title": "The Hangover", "tag": "Some guys just can't handle Vegas." }, { "title": "Batman", "tag": "Have you ever danced with the devil in the pale moonlight?" }, { "title": "No Country for Old Men", "tag": "There are no clean getaways." }, { "title": "Goosebumps", "tag": "The stories are alive." }, { "title": "Casino Royale", "tag": "Everyone has a past. Every legend has a beginning." }, { "title": "Terminator 3: Rise of the Machines", "tag": "The Machines Will Rise." }, { "title": "Men in Black II", "tag": "Same Planet. New Scum." }, { "title": "Aliens", "tag": "This Time It's War" }, { "title": "Taken", "tag": "They took his daughter.  He'll take their lives." }, { "title": "Apocalypse Now", "tag": "This is the end..." }, { "title": "Mission: Impossible", "tag": "Expect the Impossible." }, { "title": "The Grey", "tag": "Live or Die on This Day" }, { "title": "Trainwreck", "tag": "We All Know One." }, { "title": "The Terminator", "tag": "Your future is in his hands." }, { "title": "In the Heart of the Sea", "tag": "Based on the incredible true story that inspired Moby Dick" }, { "title": "The Hunger Games", "tag": "May The Odds Be Ever In Your Favor." }, { "title": "The Brothers Grimsby", "tag": "Behind every hero is an embarrassing sibling" }, { "title": "The Walk", "tag": "Dream High." }, { "title": "Wanted", "tag": "Choose your destiny." }, { "title": "Ice Age: Continental Drift", "tag": "Manny, Diego, and Sid embark upon another adventure after their continent is set adrift." }, { "title": "Mr. Holmes", "tag": "The man behind the myth" }, { "title": "Ted 2", "tag": "Ted is Coming, Again." }, { "title": "Sin City: A Dame to Kill For", "tag": "There is no justice without sin." }, { "title": "The Lobster", "tag": "An unconventional love story..." }, { "title": "Kung Fu Panda", "tag": "Prepare for awesomeness." }, { "title": "Die Hard", "tag": "40 Stories. Twelve Terrorists. One Cop." }, { "title": "The Wolf of Wall Street", "tag": "EARN. SPEND. PARTY." }, { "title": "Creed", "tag": "Your legacy is more than a name" }, { "title": "The Empire Strikes Back", "tag": "The Adventure Continues..." }, { "title": "The Age of Adaline", "tag": "Love is timeless." }, { "title": "RoboCop", "tag": "We've got the future under control." }, { "title": "The Interview", "tag": "The Film Hackers Tried To Get Banned" }, { "title": "The Usual Suspects", "tag": "Five Criminals. One Line Up. No Coincidence." }, { "title": "Harry Potter and the Deathly Hallows: Part 2", "tag": "It all ends here." }, { "title": "Thor: Ragnarok", "tag": "We Should Fight" }, { "title": "The Shallows", "tag": "What was once in the deep is now in the shallows." }, { "title": "Non-Stop", "tag": "The hijacking was just the beginning." }, { "title": "Despicable Me 2", "tag": "Back 2 Work" }, { "title": "The Babadook", "tag": "If it's in a word, or it's in a look, you can't get rid of the Babadook." }, { "title": "Everybody Wants Some", "tag": "Here for a good time not a long time" }, { "title": "From Dusk Till Dawn", "tag": "One night is all that stands between them and freedom. But it's going to be a hell of a night." }, { "title": "Salt", "tag": "Who is Salt?" }, { "title": "Penguins of Madagascar", "tag": "The Movie Event That Will Blow Their Cover" }, { "title": "The Secret Life of Walter Mitty", "tag": "Stop Dreaming, Start Living" }, { "title": "The Lego Movie", "tag": "The story of a nobody who saved everybody." }, { "title": "Trainspotting", "tag": "Choose life." }, { "title": "Charlie and the Chocolate Factory", "tag": "Willy Wonka is semi-sweet and nuts." }, { "title": "Dracula Untold", "tag": "Every bloodline has a beginning" }, { "title": "Aladdin", "tag": "Wish granted!" }, { "title": "Harry Potter and the Chamber of Secrets", "tag": "Hogwarts is back in session." }, { "title": "Edward Scissorhands", "tag": "His scars run deep." }, { "title": "The Man from U.N.C.L.E.", "tag": "Saving the world never goes out of style." }, { "title": "Secret in Their Eyes", "tag": "Don't look back" }, { "title": "Ender's Game", "tag": "This is not a game." }, { "title": "Kill Command", "tag": "You can't fight the future." }, { "title": "Zoolander 2", "tag": "Long time no Z" }, { "title": "Ice Age: Dawn of the Dinosaurs", "tag": "The sub-zero heroes are back, on an incredible adventure... for the ages." }, { "title": "Sherlock Holmes: A Game of Shadows", "tag": "The Game is Afoot." }, { "title": "Jason Bourne", "tag": "You know his name" }, { "title": "Star Trek", "tag": "The future begins." }, { "title": "A Walk Among the Tombstones", "tag": "Some people are afraid of all the wrong things" }, { "title": "The Lion King", "tag": "Life's greatest adventure is finding your place in the Circle of Life." }, { "title": "Return of the Jedi", "tag": "The Empire Falls..." }, { "title": "Goodfellas", "tag": "Three Decades of Life in the Mafia." }, { "title": "Harry Potter and the Order of the Phoenix", "tag": "Evil Must Be Confronted." }, { "title": "2012", "tag": "We Were Warned." }, { "title": "Shrek", "tag": "The greatest fairy tale never told." }, { "title": "Mike", "tag": "They needed hot dates. They got hot messes." }, { "title": "Highlander", "tag": "There can be only one." }, { "title": "Seventh Son", "tag": "When darkness falls, the son will rise. When the son falls, the dark knight will rise." }, { "title": "Let's Be Cops", "tag": "Fake Cops. Real Trouble." }, { "title": "Self/less", "tag": "God Created Man. Man Created Immortality." }, { "title": "Batman: The Dark Knight Returns, Part 1", "tag": "Justice Returns... Vengeance Returns... Redemption Comes to Gotham." }, { "title": "Crimson Peak", "tag": "Beware." }, { "title": "Atonement", "tag": "Torn apart by betrayal. Separated by war. Bound by love." }, { "title": "Dredd", "tag": "Judgement is coming" }, { "title": "22 Jump Street", "tag": "They're not 21 anymore" }, { "title": "Spy", "tag": "One of the guys. One of the Spies." }, { "title": "Eddie the Eagle", "tag": "Win or lose, always aim high" }, { "title": "A Beautiful Mind", "tag": "I need to believe that something extra ordinary is possible...." }, { "title": "Rendez-vous", "tag": "A provocative erotic drama, stylishly rendered by Andre Techine, who won the Best Director award at the Cannes Film Festival for this compelling investigation into the intersection of sexual and artistic passion." }, { "title": "21 Jump Street", "tag": "They thought the streets were mean. Then they went back to high school." }, { "title": "The Giver", "tag": "Search for truth. Find freedom." }, { "title": "The Bourne Supremacy", "tag": "They should have left him alone." }, { "title": "Outcast", "tag": "To save their souls they must save a kingdom." }, { "title": "Harry Potter and the Goblet of Fire", "tag": "Dark And Difficult Times Lie Ahead." }, { "title": "Sex Tape", "tag": "A movie about a movie they don't want you to see." }, { "title": "Victor Frankenstein", "tag": "Discover the origin of the monster and his creation." }, { "title": "Hotel Transylvania 2", "tag": "They're back to raise a little terror" }, { "title": "Survivor", "tag": "His Next Target is Now Hunting Him" }, { "title": "Riddick", "tag": "Survival Is His Revenge" }, { "title": "Black Hawk Down", "tag": "Leave No Man Behind." }, { "title": "Fifty Shades of Grey", "tag": "Are you curious?" }, { "title": "Oblivion", "tag": "Earth is a memory worth fighting for" }, { "title": "Quantum of Solace", "tag": "For love, for hate, for justice, for revenge." }, { "title": "Mission: Impossible III", "tag": "The Mission Begins 05:05:06." }, { "title": "Pearl Harbor", "tag": "December 7, 1941 - A day that shall live in infamy." }, { "title": "Kung Fu Panda 2", "tag": "Prepare for the Year of Awesomeness!" }, { "title": "The Mummy Returns", "tag": "The most powerful force on earth is about to be unleashed by the two people who should know better." }, { "title": "Black Swan", "tag": "In the era of personal branding, the scariest possibility is that someone might be better at being you than you are." }, { "title": "Under the Skin", "tag": "A mysterious seductress preys upon the population of Scotland" }, { "title": "The Prestige", "tag": "Are You Watching Closely?" }, { "title": "The Cabin in the Woods", "tag": "If you hear a strange sound outside... have sex" }, { "title": "Poltergeist", "tag": "They're Here. And They Know What Scares You." }, { "title": "Risen", "tag": "Witness the manhunt that changed the course of human history" }, { "title": "Focus", "tag": "Never Drop The Con." }, { "title": "Snowpiercer", "tag": "AD 2031, the passengers in the train are the only survivors on Earth." }, { "title": "Cloud Atlas", "tag": "Everything is Connected" }, { "title": "The Amazing Spider-Man 2", "tag": "No more secrets." }, { "title": "Watchmen", "tag": "Justice is coming to all of us.  No matter what we do." }, { "title": "Brave", "tag": "Change your fate." }, { "title": "American Psycho", "tag": "I think my mask of sanity is about to slip." }, { "title": "Dead Poets Society", "tag": "He was their inspiration. He made their lives extraordinary." }, { "title": "A.I. Artificial Intelligence", "tag": "Journey to a world where robots dream and desire." }, { "title": "Patch Adams", "tag": "Laughter is contagious." }, { "title": "Magnolia", "tag": "Things fall down. People look up. And when it rains, it pours." }, { "title": "Into the Wild", "tag": "Into the heart. Into the soul." }, { "title": "Blade II", "tag": "Faster. Sharper. Deadlier." }, { "title": "Jaws", "tag": "Don't go in the water." }, { "title": "We're the Millers", "tag": "-If anyone asks." }, { "title": "The Island", "tag": "Your time will come..." }, { "title": "Teenage Mutant Ninja Turtles: Out of the Shadows", "tag": "Raise some shell." }, { "title": "The Peanuts Movie", "tag": "The story of an underdog. And his dog." }, { "title": "Scarface", "tag": "The world is yours..." }, { "title": "Dumb and Dumber", "tag": "What the one doesn't have, the other is missing." }, { "title": "Starship Troopers", "tag": "The only good bug is a dead bug." }, { "title": "Pride and Prejudice and Zombies", "tag": "Bloody lovely." }, { "title": "Harry Potter and the Half-Blood Prince", "tag": "Dark Secrets Revealed" }, { "title": "Bolt", "tag": "Fully Awesome. Ridonculous. Let It Begin." }, { "title": "How to Train Your Dragon 2", "tag": "The training is over." }, { "title": "Neighbors 2: Sorority Rising", "tag": "New neighbors." }, { "title": "Mission: Impossible II", "tag": "Expect the impossible again" }, { "title": "Bad Moms", "tag": "Bad moms" }, { "title": "Saving Private Ryan", "tag": "The mission is a man." }, { "title": "Ghostbusters", "tag": "They ain't afraid of no ghost." }, { "title": "Dr. No", "tag": "NOW meet the most extraordinary gentleman spy in all fiction!" }, { "title": "The Bourne Ultimatum", "tag": "Remember everything. Forgive nothing." }, { "title": "Indiana Jones and the Temple of Doom", "tag": "If adventure has a name... it must be Indiana Jones." }, { "title": "Blade Runner", "tag": "Man has made his match... now it's his problem." }, { "title": "Heist", "tag": "Never make a bet you can't afford to lose." }, { "title": "Mean Girls", "tag": "Welcome to girl world." }, { "title": "Underworld: Awakening", "tag": "Vengeance Returns" }, { "title": "The Expendables", "tag": "Choose Your Weapon." }, { "title": "Predator", "tag": "If it bleeds, we can kill it..." }, { "title": "Pirates of the Caribbean: At World's End", "tag": "At the end of the world, the adventure begins." }, { "title": "Unbreakable", "tag": "Some things are only revealed by accident." }, { "title": "Daddy's Home", "tag": "Choose your Daddy" }, { "title": "American Sniper", "tag": "The most lethal sniper in U.S. history." }, { "title": "Resident Evil", "tag": "A secret experiment. A deadly virus. A fatal mistake." }, { "title": "Fantastic Four", "tag": "4 times the action. 4 times the adventure. 4 times the fantastic." }, { "title": "Star Wars: Episode II - Attack of the Clones", "tag": "A Jedi Shall Not Know Anger. Nor Hatred. Nor Love." }, { "title": "St. Vincent", "tag": "Love Thy Neighbor" }, { "title": "Real Steel", "tag": "If you get one shot, make it real." }, { "title": "Hardcore Henry", "tag": "First they made him dangerous. Then they made him mad." }, { "title": "Precious Cargo", "tag": "Never steal from a thief" }, { "title": "Everest", "tag": "The Storm Awaits." }, { "title": "Underworld", "tag": "An immortal battle for supremacy." }, { "title": "Cast Away", "tag": "At the edge of the world, his journey begins." }, { "title": "The Purge", "tag": "One night a year, all crime is legal." }, { "title": "Battle: Los Angeles", "tag": "It's not war. It's survival." }, { "title": "Hotel Transylvania", "tag": "Where monsters go to get away from it all" }, { "title": "Marauders", "tag": "The rich will pay" }, { "title": "Tracers", "tag": "It's not a crime if they can't catch you." }, { "title": "Emma's Chance", "tag": "In rescuing I was rescued" }, { "title": "Super 8", "tag": "It Arrives." }, { "title": "Captain Fantastic", "tag": "He Prepared Them for Everything Except the Outside World." }, { "title": "Raiders of the Lost Ark", "tag": "Indiana Jones - the new hero from the creators of JAWS and STAR WARS." }, { "title": "How to Train Your Dragon", "tag": "One adventure will change two worlds" }, { "title": "2 Guns", "tag": "2 Guns, 1 Bank." }, { "title": "Signs", "tag": "It’s not like they didn’t warn us." }, { "title": "Beauty and the Beast", "tag": "The most beautiful love story ever told." }, { "title": "The Amazing Spider-Man", "tag": "The untold story begins." }, { "title": "The Birdcage", "tag": "Come as you are." }, { "title": "Legend", "tag": "Love, fight, live, rule like a legend." }, { "title": "Alvin and the Chipmunks: The Road Chip", "tag": "Fast & furry-ous" }, { "title": "Moon", "tag": "The last place you'd ever expect to find yourself." }, { "title": "12 Years a Slave", "tag": "The extraordinary true story of Solomon Northup" }, { "title": "Changeling", "tag": "To find her son, she did what no one else dared." }, { "title": "Sinister", "tag": "Once you see him, nothing can save you." }, { "title": "E.T. the Extra-Terrestrial", "tag": "He is afraid. He is alone. He is three million light years from home." }, { "title": "The Conjuring", "tag": "Based on the true case files of the Warrens" }, { "title": "Le avventure di Monella e la sua famiglia", "tag": "A determined young virgin is on the loose..." }, { "title": "The Mummy", "tag": "The legend you know. The adventure you have yet to imagine." }, { "title": "Cinderella", "tag": "The greatest love story ever told." }, { "title": "Entourage", "tag": "Dream Large. Live Larger." }, { "title": "Robots", "tag": "You can shine no matter what you're made of." }, { "title": "The Thing", "tag": "Man is The Warmest Place to Hide." }, { "title": "Toy Story", "tag": "The adventure takes off!" }, { "title": "Maggie", "tag": "Don't Get Bitten" }, { "title": "Alien", "tag": "The bitch is back." }, { "title": "Star Trek Into Darkness", "tag": "Earth Will Fall" }, { "title": "Madagascar", "tag": "It's All Some Type Of Whacked Out Conspiracy." }, { "title": "Carol", "tag": "Some people change your life forever." }, { "title": "A Bug's Life", "tag": "An epic presentation of miniature proportions." }, { "title": "Night at the Museum", "tag": "Where History Comes To Life" }, { "title": "Criminal", "tag": "The CIA's last hope is in the mind of a criminal" }, { "title": "The World's End", "tag": "Good food. Fine ales. Total Annihilation." }, { "title": "Twelve Monkeys", "tag": "The future is history" }, { "title": "The Last Witch Hunter", "tag": "Hunt forever." }, { "title": "Twilight", "tag": "When you can live forever, what do you live for?" }, { "title": "The Croods", "tag": "Meet the first modern family." }, { "title": "Children of Men", "tag": "The future's a thing of the past." }, { "title": "The Graduate", "tag": "This is Benjamin. He's a little worried about his future." }, { "title": "The Bourne Legacy", "tag": "There Was Never Just One" }, { "title": "The Infiltrator", "tag": "The true story of one man against the biggest drug cartel in history." }, { "title": "Sucker Punch", "tag": "You Will Be Unprepared." }, { "title": "The 40-Year-Old Virgin", "tag": "The longer you wait, the harder it gets." }, { "title": "The Longest Ride", "tag": "Two couples. Two love stories. One epic tale." }, { "title": "Star Wars: Episode I - The Phantom Menace", "tag": "Every generation has a legend. Every journey has a first step. Every saga has a beginning." }, { "title": "Olympus Has Fallen", "tag": "When our flag falls our nation will rise." }, { "title": "Stonehearst Asylum", "tag": "No one is what they seem." }, { "title": "Miracles from Heaven", "tag": "How do we explain the impossible?" }, { "title": "Predestination", "tag": "To save the future he must reshape the past." }, { "title": "The Grand Budapest Hotel", "tag": "A perfect holiday without leaving home." }, { "title": "The Chronicles of Narnia: The Voyage of the Dawn Treader", "tag": "Return to magic. Return to hope. Return to Narnia." }, { "title": "Cars", "tag": "Ahhh... it's got that new movie smell." }, { "title": "The Forest", "tag": "Everyone comes here looking for a way out" }, { "title": "Gremlins", "tag": "Don't get him wet, keep him out of bright light, and never feed him after midnight." }, { "title": "The Gift", "tag": "Not every gift is welcome." }, { "title": "Jurassic Park", "tag": "An adventure 65 million years in the making." }, { "title": "John Carter", "tag": "Lost in Our World. Found in Another." }, { "title": "The Jungle Book", "tag": "The Jungle is JUMPIN'!" }, { "title": "The Godfather: Part II", "tag": "I don't feel I have to wipe everybody out, Tom. Just my enemies." }, { "title": "Horrible Bosses 2", "tag": "New Crime. Same Tools." }, { "title": "Equilibrium", "tag": "Two men. One battle. No compromise." }, { "title": "Pitch Perfect", "tag": "Get pitch slapped." }, { "title": "Van Helsing", "tag": "The One Name They All Fear." }, { "title": "The Shining", "tag": "A masterpiece of modern horror." }, { "title": "Toy Story 2", "tag": "The toys are back!" }, { "title": "Blended", "tag": "Single Dad, No Clue. Single Mum, Flying Solo." }, { "title": "TRON: Legacy", "tag": "The Game Has Changed." }, { "title": "The Neon Demon", "tag": "The wicked die young" }, { "title": "Goldfinger", "tag": "Everything he touches turns into excitement!" }, { "title": "Ride Along 2", "tag": "The brothers-in-law are back" }, { "title": "The Perks of Being a Wallflower", "tag": "We are infinite." }, { "title": "Die Another Day", "tag": "Events don't get any bigger than..." }, { "title": "Cloudy with a Chance of Meatballs", "tag": "Prepare to get served." }, { "title": "Gladiator", "tag": "A Hero Will Rise." }, { "title": "Fantastic 4: Rise of the Silver Surfer", "tag": "Discover the secret of the Surfer." }, { "title": "Transcendence", "tag": "Yesterday, Dr. Will Caster was only human..." }, { "title": "Gran Torino", "tag": "Ever come across somebody you shouldn't have messed with?" }, { "title": "The Choice", "tag": "Let your heart decide." }, { "title": "Saw", "tag": "Live or die. Make your choice." }, { "title": "Scouts Guide to the Zombie Apocalypse", "tag": "Always bring protection." }, { "title": "The Transporter", "tag": "Rules are made to be broken." }, { "title": "Bridesmaids", "tag": "Save the date" }, { "title": "Hachi: A Dog's Tale", "tag": "A true story of faith, devotion and undying love." }, { "title": "Valkyrie", "tag": "Many saw evil. They dared to stop it." }, { "title": "V for Vendetta", "tag": "People should not be afraid of their governments. Governments should be afraid of their people." }, { "title": "Paper Towns", "tag": "Get Lost. Get Found." }, { "title": "RoboCop", "tag": "Part man. Part machine. All cop. The future of law enforcement." }, { "title": "Cloverfield", "tag": "Some Thing Has Found Us" }, { "title": "Green Lantern", "tag": "In our darkest hour, there will be light." }, { "title": "Eternal Sunshine of the Spotless Mind", "tag": "I already forget how I used to feel about you." }, { "title": "Ted", "tag": "Ted is coming." }, { "title": "Homefront", "tag": "How far would you go to protect your home?" }, { "title": "The Fly", "tag": "Be afraid. Be very afraid." }, { "title": "The Incredible Hulk", "tag": "You'll like him when he's angry." }, { "title": "The Taking of Deborah Logan", "tag": "Evil lives within you" }, { "title": "Rise of the Planet of the Apes", "tag": "Evolution Becomes Revolution." }, { "title": "RED", "tag": "Still armed. Still dangerous. Still got it." }, { "title": "Silver Linings Playbook", "tag": "Watch For The Signs" }, { "title": "GoldenEye", "tag": "When the world is the target and the threat is real, you can still depend on one man." }, { "title": "Dumb and Dumber To", "tag": "The Second Parts Are More Fools" }, { "title": "Godzilla", "tag": "A king's arrival is never silent." } ];
      var questions = [];
      for(i=0;i<10;i++){
        qIndex = Math.floor(Math.random() * data.length);
        console.log(data[qIndex]);
        alts = [data[qIndex].title];

        //generating choices
        for(j=0;j<3;j++){
          alt = qIndex;
          while(alt == qIndex) alt = Math.floor(Math.random() * data.length);
          alts.push(data[alt].title);
        }

        questions.push(
        {
          question : data[qIndex].tag,
          choices : shuffle(alts),
          correctAnswer : alts.indexOf(data[qIndex].title)
        });
      }
      console.log(questions);
      return questions;
  }
})();