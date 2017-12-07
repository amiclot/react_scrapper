import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Books extends Component {
  state = {
    articles: [],
    saved:[]
  }

  componentDidMount() {
    this.loadBooks();
    this.loadsavedBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ articles: res.data },  
        function () {
        console.log(this.state);
        })
      )
      .catch(err => console.log(err));
  }

  loadsavedBooks = () => {
    API.getSavedBooks()
      .then(res =>
        this.setState({ saved: res.data },  
        function () {
        console.log(this.state);
        })
      )
      .catch(err =>console.log(err));

  }

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  }

  saveBook = (id, title, link, info, img) => {
    API.saveBook({
      title: title,
      link: link,
      info: info,
      id: id,
      img: img
    })
      .then(res => this.loadsavedBooks())
      .catch(err => console.log(err));

  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>New Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(book => (
                  <ListItem key={book._id}>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    <SaveBtn onClick={() => this.saveBook(book._id, book.title, book.link, book.info, book.img)}/>
                    <a href={book.link}>
                      <strong>
                        {book.title}
                      </strong>
                      <img alt="articleimg" className="img-responsive center-block" src={book.img}/>
                    </a>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.saved.length ? (
              <List>
                {this.state.articles.map(book => (
                  <ListItem key={book._id}>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    <SaveBtn onClick={() => this.saveBook(book._id, book.title, book.link, book.info, book.img)}/>
                    <a href={book.link}>
                      <strong>
                        {book.title}
                      </strong>
                      <img alt="other" className="img-responsive center-block" src={book.img}/>
                    </a>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Comments</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
