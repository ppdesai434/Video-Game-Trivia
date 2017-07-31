'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this:  var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = undefined;

//This function returns a descriptive sentence about your data.  Before a user starts a quiz, they can ask about a specific data element,
//like "Ohio."  The skill will speak the sentence from this function, pulling the data values from the appropriate record in your data.
function getSpeechDescription(item)
{
    var sentence = item.GameName + " was released in the year" + item.Year + ", created by " + item.Creator + ".  The Genre of " + item.GameName + " is " + item.Genre + "I've added " + item.GameName + " to your Alexa app.  Which other Game would you like to know about?";
    return sentence;
}

//We have provided two ways to create your quiz questions.  The default way is to phrase all of your questions like: "What is X of Y?"
//If this approach doesn't work for your data, take a look at the commented code in this function.  You can write a different question
//structure for each property of your data.
function getQuestion(counter, property, item)
{
    return "Here is your " + counter + "th question.  What is the " + formatCasing(property) + " of "  + item.GameName + "?";

    /*
    switch(property)
    {
        case "City":
            return "Here is your " + counter + "th question.  In what city do the " + item.League + "'s "  + item.Mascot + " play?";
        break;
        case "Sport":
            return "Here is your " + counter + "th question.  What sport do the " + item.City + " " + item.Mascot + " play?";
        break;
        case "HeadCoach":
            return "Here is your " + counter + "th question.  Who is the head coach of the " + item.City + " " + item.Mascot + "?";
        break;
        default:
            return "Here is your " + counter + "th question.  What is the " + formatCasing(property) + " of the "  + item.Mascot + "?";
        break;
    }
    */
}

//This is the function that returns an answer to your user during the quiz.  Much like the "getQuestion" function above, you can use a
//switch() statement to create different responses for each property in your data.  For example, when this quiz has an answer that includes
//a state abbreviation, we add some SSML to make sure that Alexa spells that abbreviation out (instead of trying to pronounce it.)
function getAnswer(property, item)
{
    
            return "The " + formatCasing(property) + " of " + item.GameName + " is " + item[property] + ". "
       
}

//This is a list of positive speechcons that this skill will use when a user gets a correct answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
var speechConsCorrect = ["Booya", "All righty", "Bam", "Bazinga", "Bingo", "Boom", "Bravo", "Cha Ching", "Cheers", "Dynomite",
"Hip hip hooray", "Hurrah", "Hurray", "Huzzah", "Oh dear.  Just kidding.  Hurray", "Kaboom", "Kaching", "Oh snap", "Phew",
"Righto", "Way to go", "Well done", "Whee", "Woo hoo", "Yay", "Wowza", "Yowsa"];

//This is a list of negative speechcons that this skill will use when a user gets an incorrect answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
var speechConsWrong = ["Argh", "Aw man", "Blarg", "Blast", "Boo", "Bummer", "Darn", "D'oh", "Dun dun dun", "Eek", "Honk", "Le sigh",
"Mamma mia", "Oh boy", "Oh dear", "Oof", "Ouch", "Ruh roh", "Shucks", "Uh oh", "Wah wah", "Whoops a daisy", "Yikes"];

//This is the welcome message for when a user starts the skill without a specific intent.
var WELCOME_MESSAGE = "Welcome to the Video Game Quiz!  You can ask me about one of the most popular games, or you can ask me to start a quiz.  What would you like to do?";

//This is the message a user will hear when they start a quiz.
var START_QUIZ_MESSAGE = "OK.  I will ask you 10 questions about the Video games.";

//This is the message a user will hear when they try to cancel or stop the skill, or when they finish a quiz.
var EXIT_SKILL_MESSAGE = "Thank you for playing the Video Games Quiz Game!  Let's play again soon!";

//This is the message a user will hear after they ask (and hear) about a specific data element.
var REPROMPT_SPEECH = "Which other Video game would you like to know about?";

//This is the message a user will hear when they ask Alexa for help in your skill.
var HELP_MESSAGE = "I know lots of things about the Video Games.  You can ask me about a Video Game, and I'll tell you what I know.  You can also test your knowledge by asking me to start a quiz.  What would you like to do?";


//This is the response a user will receive when they ask about something we weren't expecting.  For example, say "pizza" to your
//skill when it starts.  This is the response you will receive.
function getBadAnswer(item) { return "I'm sorry. " + item + " is not something I know very much about in this skill. " + HELP_MESSAGE; }

//This is the message a user will receive after each question of a quiz.  It reminds them of their current score.
function getCurrentScore(score, counter) { return "Your current score is " + score + " out of " + counter + ". "; }

//This is the message a user will receive after they complete a quiz.  It tells them their final score.
function getFinalScore(score, counter) { return "Your final score is " + score + " out of " + counter + ". "; }

//These next four values are for the Alexa cards that are created when a user asks about one of the data elements.
//This only happens outside of a quiz.

//If you don't want to use cards in your skill, set the USE_CARDS_FLAG to false.  If you set it to true, you will need an image for each
//item in your data.
var USE_CARDS_FLAG = true;

//This is what your card title will be.  For our example, we use the name of the state the user requested.
function getCardTitle(item) { return item.GameName;}

//This is the small version of the card image.  We use our data as the naming convention for our images so that we can dynamically
//generate the URL to the image.  The small image should be 720x400 in dimension.
function getSmallImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/720x400/" + item.Abbreviation + "._TTH_.png"; }

//This is the large version of the card image.  It should be 1200x800 pixels in dimension.
function getLargeImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/1200x800/" + item.Abbreviation + "._TTH_.png"; }

//=========================================================================================================================================
//TODO: Replace this data with your own.
//=========================================================================================================================================
var data = [
  {Year:2013	, GameName:"The Last of Us"	, Genre:"Survival horror"	, Creator:"Naughty Dog"},
{Year:2013	, GameName:"Grand Theft Auto V"	, Genre:"Action-adventure"	, Creator:"Rockstar Games"},
{Year:2012	, GameName:"Journey"	, Genre:"Adventure"	, Creator:"thatgamecompany"},
{Year:2011	, GameName:"Portal 2"	, Genre:"Puzzle platformer"	, Creator:"Valve Corporation"},
{Year:2011	, GameName:"Dark Souls"	, Genre:"Action role-playing"	, Creator:"FromSoftware"},
{Year:2011	, GameName:"The Elder Scrolls V: Skyrim"	, Genre:"Action role-playing"	, Creator:"Bethesda Game Studios"},
{Year:2011	, GameName:"Batman: Arkham City"	, Genre:"Action-adventure"	, Creator:"Rocksteady Studios"},
{Year:2011	, GameName:"Minecraft"	, Genre:"Sandbox, survival"	, Creator:"Mojang"},
{Year:2010	, GameName:"Mass Effect 2"	, Genre:"Role-playing shooter"	, Creator:"Bioware"},
{Year:2010	, GameName:"Red Dead Redemption"	, Genre:"Action-adventure"	, Creator:"Rockstar Games"},
{Year:2010	, GameName:"Super Mario Galaxy 2"	, Genre:"Platform"	, Creator:"Nintendo"},
{Year:2009	, GameName:"Uncharted 2: Among Thieves"	, Genre:"Action-adventure"	, Creator:"Naughty Dog"},
{Year:2008	, GameName:"Fallout 3"	, Genre:"Role-playing shooter"	, Creator:"Bethesda Game Studios"},
{Year:2008	, GameName:"Grand Theft Auto IV"	, Genre:"Action-adventure"	, Creator:"Rockstar Games"},
{Year:2007	, GameName:"BioShock"	, Genre:"First-person shooter"	, Creator:"2K Games"},
{Year:2007	, GameName:"Super Mario Galaxy"	, Genre:"Platform"	, Creator:"Nintendo"},
{Year:2007	, GameName:"Portal"	, Genre:"Puzzle platformer"	, Creator:"Valve Corporation"},
{Year:2007	, GameName:"Call of Duty 4: Modern Warfare"	, Genre:"First-person shooter"	, Creator:"Infinity Ward"},
{Year:2006	, GameName:"Ōkami"	, Genre:"Action-adventure"	, Creator:"Capcom"},
{Year:2005	, GameName:"Resident Evil 4"	, Genre:"Survival horror"	, Creator:"Capcom"},
{Year:2005	, GameName:"Shadow of the Colossus"	, Genre:"Action-adventure"	, Creator:"Team Ico"},
{Year:2004	, GameName:"Half-Life 2"	, Genre:"First-person shooter"	, Creator:"Valve Corporation"},
{Year:2004	, GameName:"World of Warcraft"	, Genre:"MMORPG"	, Creator:"Blizzard Entertainment"},
{Year:2004	, GameName:"Metal Gear Solid 3: Snake Eater"	, Genre:"Stealth"	, Creator:"Konami"},
{Year:2004	, GameName:"Grand Theft Auto: San Andreas"	, Genre:"Action-adventure"	, Creator:"Rockstar Games"},
{Year:2003	, GameName:"Star Wars: Knights of the Old Republic"	, Genre:"Role-playing"	, Creator:"BioWare"},
{Year:2003	, GameName:"Prince of Persia: The Sands of Time"	, Genre:"Action-adventure"	, Creator:"Ubisoft"},
{Year:2002	, GameName:"Metroid Prime"	, Genre:"Action-adventure"	, Creator:"Nintendo"},
{Year:2002	, GameName:"The Legend of Zelda: The Wind Waker"	, Genre:"Action-adventure"	, Creator:"Nintendo"},
{Year:2002	, GameName:"Kingdom Hearts"	, Genre:"Action role-playing"	, Creator:"Square"},
{Year:2001	, GameName:"Super Smash Bros. Melee"	, Genre:"Fighting"	, Creator:"HAL Laboratory"},
{Year:2001	, GameName:"Halo: Combat Evolved"	, Genre:"First-person shooter"	, Creator:"Bungie"},
{Year:2001	, GameName:"Metal Gear Solid 2: Sons of Liberty"	, Genre:"Stealth"	, Creator:"Konami"},
{Year:2001	, GameName:"Advance Wars"	, Genre:"Turn-based tactics"	, Creator:"Intelligent Systems"},
{Year:2001	, GameName:"Ico"	, Genre:"Action-adventure"	, Creator:"Team Ico"},
{Year:2001	, GameName:"Silent Hill 2"	, Genre:"Survival horror"	, Creator:"Konami"},
{Year:2001	, GameName:"Final Fantasy X"	, Genre:"Role-playing"	, Creator:"Square"},
{Year:2001	, GameName:"Grand Theft Auto III"	, Genre:"Action-adventure"	, Creator:"DMA Design"},
{Year:2000	, GameName:"Diablo II"	, Genre:"Action role-playing"	, Creator:"Blizzard Entertainment"},
{Year:2000	, GameName:"The Legend of Zelda: Majora's Mask"	, Genre:"Action-adventure"	, Creator:"Nintendo"},
{Year:2000	, GameName:"Deus Ex"	, Genre:"Role-playing shooter"	, Creator:"Ion Storm"},
{Year:2000	, GameName:"Counter-Strike"	, Genre:"First-person shooter"	, Creator:"Valve Corporation"},
{Year:2000	, GameName:"Perfect Dark"	, Genre:"First-person shooter"	, Creator:"Rare"},
{Year:2000	, GameName:"Skies of Arcadia"	, Genre:"Role-playing"	, Creator:"Sega"},
{Year:2000	, GameName:"Baldur's Gate II: Shadows of Amn"	, Genre:"Role-playing"	, Creator:"BioWare"},
{Year:1999	, GameName:"Shenmue"	, Genre:"Adventure"	, Creator:"Sega AM2"},
{Year:1998	, GameName:"The Legend of Zelda: Ocarina of Time"	, Genre:"Action-adventure"	, Creator:"Nintendo"},
{Year:1998	, GameName:"Metal Gear Solid"	, Genre:"Stealth"	, Creator:"Konami"},
{Year:1998	, GameName:"Pokémon Red and Blue"	, Genre:"Role-playing"	, Creator:"Game Freak"},
{Year:1998	, GameName:"SoulCalibur"	, Genre:"Fighting"	, Creator:"Namco"},
{Year:1998	, GameName:"StarCraft"	, Genre:"Real-time strategy"	, Creator:"Blizzard Entertainment"},
{Year:1998	, GameName:"Half-Life"	, Genre:"First-person shooter"	, Creator:"Valve Corporation"},
{Year:1998	, GameName:"Grim Fandango"	, Genre:"Adventure"	, Creator:"LucasArts"},
{Year:1998	, GameName:"Resident Evil 2"	, Genre:"Survival horror"	, Creator:"Capcom"},
{Year:1998	, GameName:"Xenogears"	, Genre:"Role-playing"	, Creator:"Square"},
{Year:1997	, GameName:"Final Fantasy VII"	, Genre:"Role-playing"	, Creator:"Square"},
{Year:1997	, GameName:"GoldenEye 007"	, Genre:"First-person shooter"	, Creator:"Rare"},
{Year:1997	, GameName:"Castlevania: Symphony of the Night"	, Genre:"Platform-adventure"	, Creator:"Konami"},
{Year:1997	, GameName:"Star Fox 64"	, Genre:"Shoot 'em up"	, Creator:"Nintendo"},
{Year:1997	, GameName:"Final Fantasy Tactics"	, Genre:"Tactical role-playing"	, Creator:"Square"},
{Year:1996	, GameName:"Super Mario 64"	, Genre:"Platform"	, Creator:"Nintendo"},
{Year:1996	, GameName:"Resident Evil"	, Genre:"Survival horror"	, Creator:"Capcom"},
{Year:1996	, GameName:"Tomb Raider"	, Genre:"Action-adventure"	, Creator:"Eidos Interactive"},
{Year:1996	, GameName:"Nights into Dreams..."	, Genre:"Action"	, Creator:"Sonic Team"},
{Year:1995	, GameName:"Chrono Trigger"	, Genre:"Role-playing"	, Creator:"Square"},
{Year:1995	, GameName:"Super Mario World 2: Yoshi's Island"	, Genre:"Platform"	, Creator:"Nintendo"},
{Year:1994	, GameName:"Super Metroid"	, Genre:"Platform-adventure"	, Creator:"Nintendo"},
{Year:1994	, GameName:"Final Fantasy VI"	, Genre:"Role-playing"	, Creator:"Square"},
{Year:1994	, GameName:"EarthBound"	, Genre:"Role-playing"	, Creator:"HAL Laboratory"},
{Year:1994	, GameName:"Star Wars: TIE Fighter"	, Genre:"Space simulation"	, Creator:"LucasArts"},
{Year:1993	, GameName:"Doom"	, Genre:"First-person shooter"	, Creator:"id Software"},
{Year:1993	, GameName:"Secret of Mana"	, Genre:"Action role-playing"	, Creator:"Square"},
{Year:1993	, GameName:"The Legend of Zelda: Link's Awakening"	, Genre:"Action-adventure"	, Creator:"Nintendo"},
{Year:1993	, GameName:"Gunstar Heroes"	, Genre:"Run and gun"	, Creator:"Treasure"},
{Year:1993	, GameName:"Daytona USA"	, Genre:"Racing"	, Creator:"Sega AM2"},
{Year:1992	, GameName:"Super Mario Kart"	, Genre:"Kart racing"	, Creator:"Nintendo"},
{Year:1992	, GameName:"Sonic the Hedgehog 2"	, Genre:"Platform"	, Creator:"Sonic Team"},
{Year:1991	, GameName:"The Legend of Zelda: A Link to the Past"	, Genre:"Action-adventure"	, Creator:"Nintendo"},
{Year:1991	, GameName:"Street Fighter II: The World Warrior"	, Genre:"Fighting"	, Creator:"Capcom"},
{Year:1991	, GameName:"Sonic the Hedgehog"	, Genre:"Platform"	, Creator:"Sonic Team"},
{Year:1991	, GameName:"Final Fantasy IV"	, Genre:"Role-playing"	, Creator:"Square"},
{Year:1990	, GameName:"Super Mario World"	, Genre:"Platform"	, Creator:"Nintendo"},
{Year:1988	, GameName:"Super Mario Bros. 3"	, Genre:"Platform"	, Creator:"Nintendo"},
{Year:1988	, GameName:"Mega Man 2"	, Genre:"Platform"	, Creator:"Capcom"},
{Year:1987	, GameName:"Contra"	, Genre:"Run and gun"	, Creator:"Konami"},
{Year:1987	, GameName:"Double Dragon"	, Genre:"Beat 'em up"	, Creator:"Technōs Japan"},
{Year:1987	, GameName:"R-Type"	, Genre:"Shoot 'em up"	, Creator:"Irem"},
{Year:1987	, GameName:"Tecmo Bowl"	, Genre:"Sports"	, Creator:"Tecmo"},
{Year:1986	, GameName:"The Legend of Zelda"	, Genre:"Action-adventure"	, Creator:"Nintendo"},
{Year:1986	, GameName:"Metroid"	, Genre:"Platform-adventure"	, Creator:"Nintendo"},
{Year:1986	, GameName:"OutRun"	, Genre:"Racing"	, Creator:"Sega AM2"},
{Year:1985	, GameName:"Super Mario Bros."	, Genre:"Platform"	, Creator:"Nintendo"},
{Year:1984	, GameName:"Tetris"	, Genre:"Puzzle"	, Creator:"Alexei Pajitnov"},
{Year:1984	, GameName:"Punch-Out!!"	, Genre:"Sports"	, Creator:"Nintendo"},
{Year:1984	, GameName:"Elite"	, Genre:"Space simulation"	, Creator:"David Braben"},
{Year:1982	, GameName:"Ms. Pac-Man"	, Genre:"Maze"	, Creator:"Bandai Namco Entertainment"},
{Year:1982	, GameName:"Robotron"	, Genre:"Shoot 'em up"	, Creator:"Williams Entertainment"},
{Year:1981	, GameName:"Donkey Kong"	, Genre:"Platform"	, Creator:"Nintendo"},
{Year:1981	, GameName:"Galaga"	, Genre:"Shoot 'em up"	, Creator:"Namco"},
{Year:1980	, GameName:"Pac-Man"	, Genre:"Maze"	, Creator:"Namco"},
{Year:1978	, GameName:"Space Invaders"	, Genre:"Shoot 'em up"	, Creator:"Taito"},


            ];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

var counter = 0;

var states = {
    START: "_START",
    QUIZ: "_QUIZ"
};

const handlers = {
     "LaunchRequest": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
     },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AnswerIntent": function() {
        this.handler.state = states.START;
        this.emitWithState("AnswerIntent");
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
    }
};

var startHandlers = Alexa.CreateStateHandler(states.START,{
    "Start": function() {
        this.emit(":ask", WELCOME_MESSAGE, HELP_MESSAGE);
    },
    "AnswerIntent": function() {
        console.log(this.event.request.intent.slots.GameName);
        if(this.event.request.intent.slots.Year.Value!=null)
        {
        var item = getItem(this.event.request.intent.slots);    
        }
        
        if(this.event.request.intent.slots.GameName.Value!=null)
        {
            console.log(this.event.request.intent.slots);
        var item = getItem(this.event.request.intent.slots);    
        }
        
        if(this.event.request.intent.slots.Genre.value!=null)
        {
        var item = getItem(this.event.request.intent.slots);    
        }
        
        if(this.event.request.intent.slots.Creator!=null)
        {
        var item = getItem(this.event.request.intent.slots);    
        }
        console.log(item);

        if (item && item[Object.getOwnPropertyNames(data[0])[0]] != undefined)
        {
          console.log("\nMEMO's TEST\n");
            if (USE_CARDS_FLAG)
            {
                this.emit(":askWithCard", getSpeechDescription(item), REPROMPT_SPEECH, getCardTitle(item), getTextDescription(item));
            }
            else
            {
                this.emit(":ask", getSpeechDescription(item), REPROMPT_SPEECH);
            }
        }
        else
        {
            this.emit(":ask", getBadAnswer(item), getBadAnswer(item));

        }
    },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.emitWithState("Start");
    }
});


var quizHandlers = Alexa.CreateStateHandler(states.QUIZ,{
    "Quiz": function() {
        this.attributes["response"] = "";
        this.attributes["counter"] = 0;
        this.attributes["quizscore"] = 0;
        this.emitWithState("AskQuestion");
    },
    "AskQuestion": function() {
        if (this.attributes["counter"] == 0)
        {
            this.attributes["response"] = START_QUIZ_MESSAGE + " ";
        }

        var random = getRandom(0, data.length-1);
        var item = data[random];

        var propertyArray = Object.getOwnPropertyNames(item);
        var property = propertyArray[getRandom(1, propertyArray.length-1)];

        this.attributes["quizitem"] = item;
        this.attributes["quizproperty"] = property;
        this.attributes["counter"]++;

        var question = getQuestion(this.attributes["counter"], property, item);
        var speech = this.attributes["response"] + question;

        this.emit(":ask", speech, question);
    },
    "AnswerIntent": function() {
        var response = "";
        var item = this.attributes["quizitem"];
        var property = this.attributes["quizproperty"]

        var correct = compareSlots(this.event.request.intent.slots, item[property]);

        if (correct)
        {
            response = getSpeechCon(true);
            this.attributes["quizscore"]++;
        }
        else
        {
            response = getSpeechCon(false);
        }

        response += getAnswer(property, item);

        if (this.attributes["counter"] < 10)
        {
            response += getCurrentScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.attributes["response"] = response;
            this.emitWithState("AskQuestion");
        }
        else
        {
            response += getFinalScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.emit(":tell", response + " " + EXIT_SKILL_MESSAGE);
        }
    },
    "AMAZON.StartOverIntent": function() {
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.emitWithState("AnswerIntent");
    }
});

function compareSlots(slots, value)
{
    for (var slot in slots)
    {
        if (slots[slot].value != undefined)
        {
            if (slots[slot].value.toString().toLowerCase() == value.toString().toLowerCase())
            {
                return true;
            }
        }
    }
    return false;
}

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}

function getRandomSymbolSpeech(symbol)
{
    return "<say-as interpret-as='spell-out'>" + symbol + "</say-as>";
}

function getItem(slots)
{
    console.log(Object.getOwnPropertyNames(data[0])+"These are prop array");
    var propertyArray = Object.getOwnPropertyNames(data[0]);
    var value;

    for (var slot in slots)
    {
        console.log(slot);
        console.log(slots[slot]);
        if (slots[slot].value !== null)
        {
            value = slots[slot].value;
            for (var property in propertyArray)
            {
                var item = data.filter(x => x[propertyArray[property]].toString().toLowerCase() === slots[slot].value.toString().toLowerCase());
                if (item.length > 0)
                {
                    return item[0];
                }
            }
        }
    }
    return value;
}

function getSpeechCon(type)
{
    var speechCon = "";
    if (type) return "<say-as interpret-as='interjection'>" + speechConsCorrect[getRandom(0, speechConsCorrect.length-1)] + "! </say-as><break strength='strong'/>";
    else return "<say-as interpret-as='interjection'>" + speechConsWrong[getRandom(0, speechConsWrong.length-1)] + " </say-as><break strength='strong'/>";
}

function formatCasing(key)
{
    key = key.split(/(?=[A-Z])/).join(" ");
    return key;
}

function getTextDescription(item)
{
    var text = "";

    for (var key in item)
    {
        text += formatCasing(key) + ": " + item[key] + "\n";
    }
    return text;
}

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers, startHandlers, quizHandlers);
    alexa.execute();
};
