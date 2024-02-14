import { searchCategoryThunk } from '../../store/slices/product.slice.jsx';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SearchButton = () => {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState("")

  return (
    <InputGroup className="w-75">
      <Form.Control
        placeholder="Search by name"
        aria-label="Search by name"
        aria-describedby="basic-addon2"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      <Button
        variant="dark"
        id="button-addon2"
        onClick={() => dispatch(searchCategoryThunk(searchValue))}
        className='w-25'
      >
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchButton;