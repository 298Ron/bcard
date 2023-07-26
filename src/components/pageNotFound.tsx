import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface pageNotFoundProps {

}

const pageNotFound: FunctionComponent<pageNotFoundProps> = () => {

    return (
        <>
            <h1 className="display-1">404 - Page Not Found</h1>

        </>
    )
}

export default pageNotFound;