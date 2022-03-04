
import { useState, useContext } from 'react'
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";
import { HomeContextType } from '../types/BookRequest';
import { HomeContext } from '../context/HomeContext';

const SearchBook = () => {

    const { setSearchFor, setSearchBy } = useContext(HomeContext) as HomeContextType;

    const [search, setSearch] = useState("");



    const handleSubmit = () => {

        setSearchBy("title")

        setSearchFor(search);


    }


    return (
        <section className="col-md-12 section search">
            <div className="search-form" >
                <Form >
                    <InputGroup >
                        <FormControl
                            placeholder="Search By title"
                            aria-label="Search By title"
                            aria-describedby="basic-addon2"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button variant="outline-success" id="button-addon2" onClick={handleSubmit}>
                            Search
                        </Button>
                    </InputGroup>
                </Form>



            </div>
        </section>
    )
}

export default SearchBook;
