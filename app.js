const express = require('express');
const app = express();

// Importar los libros
const books = require('./data/books.json');

//  ruta /all
app.get('/all', (req, res) => {
  res.json(books);
});

// código para iniciar el servidor

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CORRIENDO! ${PORT}`);
});

//  ruta /first
app.get('/first', (req, res) => {
    if (books.length > 0) {
      res.json(books[0]); 
    } else {
      res.status(404).send('No libro');
    }
  });

  //ruta /last
app.get('/last', (req, res) => {
    if (books.length > 0) {
      res.json(books[books.length - 1]);
    } else {
      res.status(404).send('No libro');
    }
  });

  //la ruta /middle
app.get('/middle', (req, res) => {
    const middleIndex = 50; 
    if (books.length > middleIndex) {
      res.json(books[middleIndex]); 
    } else {
      res.status(404).send('NO hay libro en la posicion 50');
    }
  });

 // libro de /author/dante-alighieri

  app.get('/author/dante-alighieri', (req, res) => {
   
    const danteBook = books.find(book => book.author === 'Dante Alighieri');
    
    if (danteBook) {
      res.json({ title: danteBook.title }); 
    } else {
      res.status(404).send('estamos en la iglesia');
    }
  });

  //country/charles-dickens
app.get('/country/charles-dickens', (req, res) => {
   
    const dickensBook = books.find(book => book.author === 'Charles Dickens');
    
    if (dickensBook) {
      res.json({ country: dickensBook.country }); 
    } else {
      res.status(404).send('No HAY Charles Dickens');
    }
  });


// ruta /year&pages/cervantes
app.get('/year&pages/cervantes', (req, res) => {
  
  const cervantesBook = books.find(book => book.author === 'Miguel de Cervantes');
  
  if (cervantesBook) {
    const bookData = {
      pages: cervantesBook.pages,
      year: cervantesBook.year
    };
    res.json(bookData);
  } else {
    res.status(404).send('NO HAY MOLINOS!');
  }
});


// ruta /country/count/spain
app.get('/country/count/spain', (req, res) => {
    
    const count = books.filter(book => book.country === 'Spain').length;
    
    res.json({ count: count }); 
  });

  //ruta /country/at-least/germany
app.get('/country/at-least/germany', (req, res) => {
    
    const exists = books.some(book => book.country === 'Germany');
    
    res.json({ exists: exists });
  });

  //ruta /pages/all-greater/200
app.get('/pages/all-greater/200', (req, res) => {
    
    const allGreater = books.every(book => book.pages > 200);
    
    res.json({ allGreater: allGreater });
  });