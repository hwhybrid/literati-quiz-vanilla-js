// Import the models
require('dotenv').config();
const { Question, Option } = require('../models');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

const questions = [
    {
        questionNumber: 1,
        imageUrl:
            'https://images.unsplash.com/photo-1647288020655-6b3e2fc5916b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
        alt: 'A photo by Pierre Bamin of a hand selecting a book from a high book shelf',
        credit: 'Pierre Bamin',
        questionText:
            '1. Which of the following quotes do you personally identify with?',
        options: [
            {
                code: 'cc',
                literatiType: 'Cool Connoisseur',
                optionText:
                    "“Always read something that will make you look good if you die in the middle of it.” \n--P. J. O'Rourke",
            },
            {
                code: 'ee',
                literatiType: 'Evolving Egghead',
                optionText:
                    '“A truly good book teaches me better than to read it. I must soon lay it down, and commence living on its hint. What I began by reading, I must finish by acting...” \n--Henry David Thoreau',
            },
            {
                code: 'bb',
                literatiType: 'Budding Bookworm',
                optionText:
                    '“A man ought to read just as inclination leads him, for what he reads as a task will do him little good.” \n--Samuel Johnson',
            },
            {
                code: 'pp',
                literatiType: 'Perpetual Peruser',
                optionText:
                    '“A classic is something that everybody wants to have read and nobody wants to read.” \n--Mark Twain',
            },
            {
                code: 'll',
                literatiType: 'Looney Literati',
                optionText:
                    'Where is human nature so weak as in the bookstore? \n--Henry Ward Beecher',
            },
        ],
    },
    {
        questionNumber: 2,
        imageUrl:
            'https://images.unsplash.com/photo-1466027785809-90d27831b9bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
        alt: 'A closeup photo by Annie Spratt of an empty fancy historic (possibly victorian) dining table',
        credit: 'Annie Spratt',
        questionText:
            "2. You’ve been invited to a fancy 'literati' dinner party. Which group of authors would be your ideal fellow guests?",
        options: [
            {
                code: 'cc',
                literatiType: 'Cool Connoisseur',
                optionText:
                    'Oscar Wilde, Jane Austen, Haruki Murakami, Hanya Yanagihara, Chimamanda Ngozi Adichie, Yann Martel, and Octavia Butler.',
            },
            {
                code: 'ee',
                literatiType: 'Evolving Egghead',
                optionText:
                    'James Baldwin, Paulo Coelho, Bell Hooks, Rainier Maria Rilke, Eckhart Tolle, and Slavoj Zizek. ',
            },
            {
                code: 'bb',
                literatiType: 'Budding Bookworm',
                optionText:
                    'Douglas Adams, Tomi Adeyemi, Margaret Atwood, Gillian Flynn. Neil Gaiman, John Green, Chuck Pahlaniuk, J.K. Rowling, Stephen King, and Donna Tartt',
            },
            {
                code: 'pp',
                literatiType: 'Perpetual Peruser',
                optionText:
                    'David Sedaris,  Ashley C. Ford, Chelsea Handler, Angie Thomas,  Sally Rooney, Oyinkan Braithwaite, and Samantha Irby.',
            },
            {
                code: 'll',
                literatiType: 'Looney Literati',
                optionText:
                    'ALL of the above including any of their friends or relatives! ',
            },
        ],
    },
    {
        questionNumber: 3,
        imageUrl:
            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        alt: 'A dramatic, photo by Felix Mooneeram of the red seats of a movie theater separated by stairs in the middle leading up to the seats in the back, masked by darkness.',
        questionText:
            '3. The latest film adaptation of a bestselling series of novels is about to hit the big screen and tickets are SCARCE: ',
        options: [
            {
                code: 'cc',
                literatiType: 'Cool Connoisseur',
                optionText:
                    'You’ll gladly pay double or triple the price to whomever will sell you a ticket.',
            },
            {
                code: 'ee',
                literatiType: 'Evolving Egghead',
                optionText:
                    'Shrug it off. Surely there’s a more substantive narrative to enjoy like a biography, or a book on happiness, personal fulfillment, or achieving success.',
            },
            {
                code: 'bb',
                literatiType: 'Budding Bookworm',
                optionText:
                    "You really loved the books but can’t be bothered with the chaos so you don't mind waiting till it isn't crowded to see the film.",
            },
            {
                code: 'pp',
                literatiType: 'Perpetual Peruser',
                optionText:
                    "It's all too much hype. You'll wait until it's streaming online.",
            },
            {
                code: 'll',
                literatiType: 'Looney Literati',
                optionText:
                    'You camp out a day or two in advance at the theater for the movie premiere, hoping to meet the actors or better yet, the author! \nYou’re not missing this for anything and you reread the books to keep everything fresh in time for the premiere! ',
            },
        ],
    },
    {
        questionNumber: 4,
        imageUrl:
            'https://images.unsplash.com/photo-1515542706656-8e6ef17a1521?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        alt: 'A sun-dappled wooden book shelf next to a giant rount wooden clock with a white clockface and black dials in a room with cream-coloured walls.',
        credit: 'Lesly Juarez',
        questionText:
            '4. The current residents on your bookshelf are likely to include: ',
        options: [
            {
                code: 'cc',
                literatiType: 'Cool Connoisseur',
                optionText:
                    'A veritable who’s who of renowned authors and literary titles. Also, ideally, a few autographed books, first editions or other collectibles, if you could get your hands on them.',
            },
            {
                code: 'ee',
                literatiType: 'Evolving Egghead',
                optionText:
                    'Books by Bell Hooks or Paulo Coelho; a biography of some luminary or public figure, A book of quotations and perhaps some scented oil reeds and incense.',
            },
            {
                code: 'bb',
                literatiType: 'Budding Bookworm',
                optionText:
                    'A little bit of everything: Magazines, A series of books by an author you’ve grown to like, and a few New York Times Bestsellers etc.',
            },
            {
                code: 'pp',
                literatiType: 'Perpetual Peruser',
                optionText:
                    'Magazines, a couple of books you were given as gifts but have yet to read, Novelty art or pop culture knickknacks.',
            },
            {
                code: 'll',
                literatiType: 'Looney Literati',
                optionText:
                    'Books arranged by genre, except for the ones that are overflowing, a couple of redundant copies of the ones you really love or purchased when you thought you’d lost your other copy and perhaps a novelty ersonal library Kit, or book lover’s companion. Come on! They’re fun! ',
            },
        ],
    },
    {
        questionNumber: 5,
        imageUrl:
            'https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
        alt: 'Spiderman reads a bestseller, whilst crouched in an observation nook on top of a castle',
        credit: 'roadtripwithraj',
        questionText:
            '5. You’ve just come across a fascinating book and are buzzing with excitement: ',
        options: [
            {
                code: 'cc',
                literatiType: 'Cool Connoisseur',
                optionText:
                    'You discuss the underlying themes and meaning behind the story with friends and acquaintances.',
            },
            {
                code: 'ee',
                literatiType: 'Evolving Egghead',
                optionText:
                    'You think of all the lessons and wisdom gleaned from the story and how they can apply to your life.',
            },
            {
                code: 'bb',
                literatiType: 'Budding Bookworm',
                optionText:
                    'You’ll discuss it if and when it comes up in a conversation and you look up anything else written by the same author.',
            },
            {
                code: 'pp',
                literatiType: 'Perpetual Peruser',
                optionText:
                    'You’re still in chapter 3, besides you already know what happens because you read the last chapter first… How else do you find out if it’s worth reading?',
            },
            {
                code: 'll',
                literatiType: 'Looney Literati',
                optionText:
                    'You talk about it to anyone who will listen and go online to find out more about the author, inspiration for the story and to read reviews and impressions from other readers.',
            },
        ],
    },
    {
        questionNumber: 6,
        imageUrl:
            'https://images.unsplash.com/photo-1525715843408-5c6ec44503b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjA2fHxleGNpdGluZyUyMGJvb2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
        alt: '',
        credit: 'Seven Shooter',
        questionText:
            '6. You find you have some unexpected free time in your busy schedule, so you: ',
        options: [
            {
                code: 'cc',
                literatiType: 'Cool Connoisseur',
                optionText:
                    'Attend a book signing and Q & A Session with an internationally renowned bestselling author.',
            },
            {
                code: 'ee',
                literatiType: 'Evolving Egghead',
                optionText:
                    'Use the time to practice or apply some of the ideas presented in the latest book on personal fulfillment.',
            },
            {
                code: 'bb',
                literatiType: 'Budding Bookworm',
                optionText:
                    'Pick up where you left off in a bestseller or the latest adventure trilogy you’ve stumbled upon.',
            },
            {
                code: 'pp',
                literatiType: 'Perpetual Peruser',
                optionText:
                    'Flip through a few magazines or browse some blogs. ',
            },
            {
                code: 'll',
                literatiType: 'Looney Literati',
                optionText:
                    'All of the above and more if you can manage it. You’re going to make the most of every minute you have to spare! ',
            },
        ],
    },
    {
        questionNumber: 7,
        imageUrl:
            'https://images.unsplash.com/photo-1485894944436-a890c1048494?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        alt: '',
        credit: 'Marisa Buhr Mizunaka',
        questionText:
            '7. At any given moment during the day the following could be found in your possession: ',
        options: [
            {
                code: 'cc',
                literatiType: 'Cool Connoisseur',
                optionText:
                    'A limited edition classic, or a well-worn copy of a Russian novel, .',
            },
            {
                code: 'ee',
                literatiType: 'Evolving Egghead',
                optionText: 'A book of meaningful and inspiring quotations.',
            },
            {
                code: 'bb',
                literatiType: 'Budding Bookworm',
                optionText:
                    'A novel by an author whose work you really enjoy or just discovered.',
            },
            {
                code: 'pp',
                literatiType: 'Perpetual Peruser',
                optionText:
                    'At the very most, a periodical or entertainment magazine (i.e. Rolling Stone, Cosmopolitan, GQ, Entertainment Weekly, Self, Sports Illustrated, Vogue etc).',
            },
            {
                code: 'll',
                literatiType: 'Looney Literati',
                optionText:
                    'A novel, a couple of magazines, E-Reader, powerbank, and charger just in case the battery begins to run out. Gotta be prepared and who knows what you might be in the mood for at any given moment. ',
            },
        ],
    },
    {
        questionNumber: 8,
        imageUrl:
            'https://images.unsplash.com/photo-1459369510627-9efbee1e6051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjYxfHxib29rJTIwZXhjaXRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
        alt: "Foreground: A hand holding up a copy of a yellow hardcover book entitled 'Happy', Background: A couple gazing at each other while standing between bookshelves in a bookstore.",
        credit: 'Josh Felise',
        questionText:
            '8. You’re on a blind date with a gorgeous potential romantic partner and the conversion turns to your literary tastes, you: ',
        options: [
            {
                code: 'cc',
                literatiType: 'Cool Connoisseur',
                optionText:
                    'Subtly probe your date with certain ideas or topics that will reveal just how well-read they are and what their taste is in literature. \nIt’s critical that you’re compatible in this regard.',
            },
            {
                code: 'ee',
                literatiType: 'Evolving Egghead',
                optionText:
                    'Share your favourite inspirational quote or describe the effect a certain book or author has had on your perception and outlook on life.',
            },
            {
                code: 'bb',
                literatiType: 'Budding Bookworm',
                optionText:
                    'Ask about their literary interests and share what you’ve recently enjoyed while welcoming recommendations.',
            },
            {
                code: 'pp',
                literatiType: 'Perpetual Peruser',
                optionText:
                    'Discuss a cool or funny article you came across online.',
            },
            {
                code: 'll',
                literatiType: 'Looney Literati',
                optionText:
                    'Begin an intense pitch on why he/she simply MUST read a particular book or series that left you both heartbroken and inspired. \nIt brings you to tears just talking about it. ',
            },
        ],
    },
    {
        questionNumber: 9,
        imageUrl:
            'https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2083&q=80',
        alt: 'School Girl with Book in front of natural rustic red brick background holding book up to her face.',
        credit: 'Siora Photography',
        questionText:
            '9. Which of the following arguments have you had or see yourself having: ',
        options: [
            {
                code: 'cc',
                literatiType: 'Cool Connoisseur',
                optionText:
                    'The hidden virtue of a protagonist’s controversial and unconventional choices in a popular or classic novel. ',
            },
            {
                code: 'ee',
                literatiType: 'Evolving Egghead',
                optionText:
                    'There’s so much wisdom to be gained by reading and learning about the experiences of others. \n How can you go through life without a curiosity about leading a meaningful and fulfilling existence? ',
            },
            {
                code: 'bb',
                literatiType: 'Budding Bookworm',
                optionText:
                    'Reading something just to say you finished it is ridiculous! If it loses your interest you’ll move on to the next thing.',
            },
            {
                code: 'pp',
                literatiType: 'Perpetual Peruser',
                optionText:
                    'How pointless it is to read a book after seeing the film adaptation. Afterall, you already know the entire story!',
            },
            {
                code: 'll',
                literatiType: 'Looney Literati',
                optionText:
                    'You should never judge a book by its film adaptation. They can NEVER truly do the book justice! You MUST read it! ',
            },
        ],
    },
    {
        questionNumber: 10,
        imageUrl:
            'https://images.unsplash.com/photo-1568047571827-8c46fe611345?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMyfHxib29rJTIwYXJndW1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
        alt: "Open books with large black lettering spelling: 'Turn the page' printed accross some of the pages ",
        credit: 'Daniel Schludi',
        questionText: '10. Of the list of 100 greatest books of all time: ',
        options: [
            {
                code: 'cc',
                literatiType: 'Cool Connoisseur',
                optionText:
                    'You may not have read them all per se but the ones that you have read you can recall and expound upon articulately and much to the entertainment of whomever you happen to be engaged in a discussion.',
            },
            {
                code: 'ee',
                literatiType: 'Evolving Egghead',
                optionText:
                    'You choose what to read based on the relevance or impact you feel it could have in your life at the present moment. This may or may not include the books on the list.',
            },
            {
                code: 'bb',
                literatiType: 'Budding Bookworm',
                optionText:
                    'Sure, you’ve probably read a few of these but find most of them boring and you read purely for enjoyment or a quick escape. You’re not in school anymore so why give yourself homework?',
            },
            {
                code: 'pp',
                literatiType: 'Perpetual Peruser',
                optionText:
                    'Isn’t that like one of those suggested reading lists they hand you in high school or college? …Watching the film adaptations gets you there in half the time. Life’s too short.',
            },
            {
                code: 'll',
                literatiType: 'Looney Literati',
                optionText:
                    'You’ve read at least a quarter of them and intend to read them all one day. After all, they made the list for a reason.',
            },
        ],
    },
];

// Function to seed the database:
async function seedDatabase() {
    try {
        // // Use sync with force: true to create or recreate tables
        // await sequelize.sync({ force: true });

        for (const question of questions) {
            let createQuestion;
            try {
                createQuestion = await Question.create({
                    questionNumber: question.questionNumber,
                    questionText: question.questionText,
                    imageUrl: question.imageUrl,
                    alt: question.alt,
                    credit: question.credit,
                });
            } catch (error) {
                console.error('Error creating question: ', error);
            }
            for (const option of question.options) {
                await Option.create({
                    questionId: createQuestion.questionId,
                    optionText: option.optionText,
                    code: option.code,
                    literatiType: option.literatiType,
                });
            }
        }
        console.log(
            'Database seeded with questions and their respective options!'
        );
    } catch (error) {
        console.error('Error seeding the database', error);
    }
}

//  THE FOLLOWING IS COMMENTED OUT BECAUSE THE SEEDING IS AUTOMATED IN server.js
// THEREFORE NO NEED TO CALL THE FUNCTION TWICE AND DUPLICATE THE DATA
// Call the seed function with await to handle the asynchronous behaviour:
// (async () => {
//     try {
//         await seedDatabase();
//         console.log('Database seeding completed successfully');
//         process.exit(0); // Optional: Exit the script once seeding is done.
//     } catch (error) {
//         console.error('Error seeding the database', error);
//         process.exit(1); // Optional: Exit the script with an error code if there's an error.
//     }
// })();

//  Export the seedDatabase function to be used in server.js
module.exports = seedDatabase;
