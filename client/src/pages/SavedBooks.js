import React, { useState } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  
  const tokenn = Auth.loggedIn() ? Auth.getToken() : null;
  console.log(tokenn);
  const decodedToken = Auth.getProfile(tokenn).data._id;
  console.log(decodedToken);
  const { loading, data } = useQuery(GET_USER,{
    variables: {_id: decodedToken},
  });
  console.log(data);
  const userData = data?.user || [];
  const [deleteBook, { error }] = useMutation(REMOVE_BOOK);
  const [userState, setData] = useState({});
  
  console.log(userData.savedBooks);



  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    const decodedToken = Auth.getProfile(token).data._id;

    try {
      const response = await deleteBook({
        variables: { bookId: bookId,
          _id: decodedToken
        },
      });

      // const updatedUser = await response.json();
      // setData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
