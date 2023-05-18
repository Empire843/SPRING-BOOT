import { useState, useEffect, useCallback } from 'react';
import "./admincss/crud_category.css";
import axios from "axios";



const CRUD_categoryView = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');

    const [editData, setEditData] = useState({
        id: null,
        name2: ""
    });

    const [isAddClicked, setIsAddClicked] = useState(false);


    const [isMounted, setIsMounted] = useState(false);
    const [isEditClicked, setIsEditClicked] = useState(false);


    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/categories/all");
            setCategories(response.data);
            console.log("size" + categories.length);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        if (!isMounted) {
            fetchCategories();
            setIsMounted(true);
        }
    }, [fetchCategories, isMounted]);


    const handleSubmit = async (event) => {
        console.log("Name " + name);
        event.preventDefault();
        if (isAddClicked && name.trim() !== '') {
            try {
                const response = await axios.post('http://localhost:8080/api/categories/add', {
                    "name": name
                });
                if (response.status === 200) {
                    setIsAddClicked(false);
                    console.log("status" + response.data);
                    fetchCategories();
                    setName('');
                    setIsEditClicked(false);
                }

            } catch (error) {
                console.error(error);
            }
        }
    };


    const handleEdit = useCallback((category) => {
        const categoryId = category.id;
        const categoryName = editData.name2;

        console.log("categoryId" + categoryId);
        console.log("categoryName" + categoryName);
        console.log("code" + category.code);

        // Gọi API để chỉnh sửa danh mục
        axios.put(`http://localhost:8080/api/categories/${categoryId}`, {


            "id": category.id,
            "name": categoryName,
            "code": category.code

        })
            .then((response) => {
                console.log(response.data);
                // Xử lý phản hồi từ API
                // ...
            })
            .catch((error) => {
                console.log(error);
                // Xử lý lỗi
                // ...
            });
    }, [categories, editData]);

    return (
        <div className='formcategory'>
            <h4>CRUD Category </h4>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">

                    <div className="input-group">
                        <input
                            type="text"
                            className="category-input"
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <button className="btn btn-primary" type="submit" onClick={() => setIsAddClicked(true)}>
                            Add
                        </button>
                    </div>
                </div>
            </form>

            <table className="table-custom table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td><input
                                type="text"
                                // value={category.name}
                                value={category.id === editData.id ? editData.name2 : category.name}
                                onChange={(e) =>
                                    setEditData({ id: category.id, name2: e.target.value })
                                }
                            /></td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEdit(category)}>
                                    Edit
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default CRUD_categoryView;

