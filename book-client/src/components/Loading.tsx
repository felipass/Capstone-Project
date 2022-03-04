import { Spinner, Button } from "react-bootstrap";


const Loading = () => {
    return (

        <div className="centerLoader">
            <Button variant="success" disabled>
                <Spinner
                    as="span"
                    variant="warning"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    animation="grow" />
                Loading...
            </Button>
        </div>

    )
}

export default Loading;