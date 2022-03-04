//import { useEffect } from 'react'
import { Nav, Container, Navbar, Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';

const MyNavbar = () => {

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  /*
  , user, getAccessTokenSilently
  useEffect(() => {

    const getAccessToken = async () => {
      try {

        const accessToken = await getAccessTokenSilently(
          {
            audience: `https://books-api-project`
          }
        )

        console.log('Access Token : ', accessToken)
        //  console.log('newBook : ',newBook)

      } catch (error) {

        console.log(error)
      }
    }

    getAccessToken();

  }, [getAccessTokenSilently])

*/



  // console.log(isAuthenticated, user)



  return (
    <section>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">

            Get-A-Book.com
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/about"}>About</Nav.Link>


            </Nav>



            {isAuthenticated ?

              <Form className="d-flex">
                <Link to="/mybooks">
                  <Button variant="success" className="me-2">Sell A Book</Button> <br />

                </Link>

                <Button type="submit" variant="outline-danger" onClick={() => {
                  logout({ returnTo: window.location.origin })
                }}>LogOut</Button>
              </Form>
              :
              <Form className="d-flex">
                <Button type="submit" variant="outline-success" onClick={loginWithRedirect}>Login</Button>

              </Form>

            }


          </Navbar.Collapse>
        </Container>
      </Navbar>

    </section>

  )



}

export default MyNavbar;
