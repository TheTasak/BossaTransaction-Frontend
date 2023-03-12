import {isRouteErrorResponse, useRouteError} from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    return  (
        <div>
            <h1>Couldn't find this page.</h1>
            <p>Sorry, an unexpected error has occured.</p>
            {
                isRouteErrorResponse(error) ?
                    <i>{error.status} {error.statusText}</i> :
                    <i>Unknown error</i>
            }
        </div>
    )
}

export default ErrorPage;