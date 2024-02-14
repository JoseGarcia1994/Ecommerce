import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCategoryThunk } from "../../store/slices/product.slice.jsx";
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";

const Categories = () => {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])
  const [categorySelected, setCategorySelected] = useState("")

  useEffect(() => {
		axios
			.get(`https://e-commerce-api-v2.academlo.tech/api/v1/categories`)
			.then(resp => setCategories(resp.data))
			.catch(error => console.error(error))
	}, [])

  return (
    <ListGroup className='w-100 mb-4' as='ul' >
      {
        categories.map(category => (
          <ListGroup.Item
            key={category.id}
            as='li'
            active={categorySelected === category.name}
            onClick={() => {
              dispatch(filterCategoryThunk(category.id))
              setCategorySelected(category.name)
            }}
          >
            {category.name}
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  );
};

export default Categories;