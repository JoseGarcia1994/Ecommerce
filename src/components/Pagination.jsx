import Button from 'react-bootstrap/Button';

const Pagination = ({num, setCurrentPage}) => {
    return (
        <div>
            <Button onClick={ () => setCurrentPage(num) }  variant="link">{num}</Button>
        </div>
    );
};

export default Pagination;