const book = {
    title: 'ego is the Enemy',
    author: 'Ryan holiday',
    publisher: {
        name: 'Penguin'
    }
}

const {name: publisherName = 'Self-Published'} = book.publisher;

console.log(`${publisherName}`);

const items = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [coffeeName, , mediumPrice] = items;
console.log(`A medium ${coffeeName} costs ${mediumPrice}`);
