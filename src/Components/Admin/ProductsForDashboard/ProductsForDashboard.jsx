import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import Pagination from "react-bootstrap/Pagination";
import Loading from "../../Loading/Loading";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";

export default function ProductsForDashboard() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  // const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const[sizes,setSizes]=useState([])
  const [categoryId, setCategoryId] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [updatedname, setupdatedname] = useState("");
  const [updatedDesc, setupdatedDesc] = useState("");
  const [updatedPrice, setupdatedPrice] = useState("");
  const [updatedImages, setupdatedImages] = useState([]);
  const [updatedcolors, setupdatedcolors] = useState([]);
  const [updatedsize, setupdatedsize] = useState([]);
  const [updatedmaterial, setupdatedmaterial] = useState("");
  const [updatedquantity, setupdatedquantity] = useState("");
  const [updatedSubcategory, setupdatedSubcategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading,setLoading] = useState(false)
  const token = localStorage.getItem('token');

  const settings = {
    margin: 20,
    responsiveClass: true,
    loop: true,
    autoplay: false,
    smartSpeed: 500,
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      550: { items:1 },
      750: { items: 1 },
      1000: { items: 1 },
      1200: { items: 1 },
    },
  };
  async function getProducts(pageNumber = 1) {
    setLoading(true)
    try {
      const { data } = await axios.get(
        `https://zahaback.com/api/product/all?page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log(data.products);
      setProducts(data.products);
      setCurrentPage(data.pagination.current_page);
      setLastPage(data.pagination.total_pages);
      setLoading(false)
      //console.log(data);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }


  async function fetchSubcategories() {

    try {
      const { data } = await axios.get(
        `https://zahaback.com/api/subcategory/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubcategories(data.SubCategory.data);
      //console.log("subcategory",data.SubCategory.data)
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };
  
  const handleImageChange2 = (e) => {
    setupdatedImages(e.target.files); // Use e.target.files directly to set new images
  };
  
  const handleColorsChange = (e) => {
    setColors(e.target.value.split(','));
  };

  const handleSizesChange = (e) => {
    setSizes(e.target.value.split(','));
  };

  async function addProduct() {

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("material", material);
      formData.append("quantity", quantity);
      formData.append("price", price);
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

    
      colors.forEach((color, index) => {
        formData.append(`colors[${index}]`, color);
      });

      sizes.forEach((size, index) => {
        formData.append(`sizes[${index}]`, size);
      });

      formData.append("subcategory_id", categoryId);

      // console.log({
      //   name,
      //   desc,
      //   material,
      //   price,
      //   quantity,
      //   images,
      //   colors,
      //   sizes,
      //   subcategory_id: categoryId,
      // });

      await axios.post(
        `https://zahaback.com/api/product/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    
      Swal.fire({
        icon: "success",
        title: "Product created successfully",
      }).then(() =>{
        setShowAddModal(false);
        getProducts(currentPage);
        window.location.reload();
      })
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add product",
      });
    }
  }  

  const handleShowUpdateModal = (product) => {
    const subcategory = subcategories.find(subcat => subcat.name === product.subcategory_id);
    setSelectedProductId(product.id);
    setupdatedname(product.name);
    setupdatedDesc(product.desc);
    setupdatedPrice(product.price);
    setupdatedImages(product.images || []);
    setupdatedcolors(product.colors.map((color)=>color) || []);
    setupdatedsize(product.sizes.map((size) => size.size) || []);
    setupdatedmaterial(product.material);
    setupdatedquantity(product.quantity);
    setupdatedSubcategory(subcategory ? subcategory.id : ""); // Set to ID if found, else empty
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };
  //console.log(updatedSubcategory);

  async function updateProduct() {
    //console.log(updatedSubcategory);

    try {
      const selectedId = updatedSubcategory;
        if (!selectedId) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid subcategory selected',
        });
          //console.log(selectedId) ;
          return; 
      }
      const formData = new FormData();
      formData.append("name", updatedname);
      formData.append("desc", updatedDesc);
      formData.append("material", updatedmaterial);
      formData.append("quantity", updatedquantity);
      formData.append("price", updatedPrice);

      if (updatedImages.length > 0) {
        for (let i = 0; i < updatedImages.length; i++) {
          formData.append(`images[${i}]`, updatedImages[i]);
        }
      }      

      updatedcolors.forEach((color, index) => {
        formData.append(`colors[${index}]`, color);
      });

      updatedsize.forEach((size, index) => {
        formData.append(`sizes[${index}]`, size);
      });

      formData.append("subcategory_id", selectedId);

      await axios.post(
        `https://zahaback.com/api/product/update/${selectedProductId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Product updated successfully",
      }).then(() =>{
        setShowUpdateModal(false);
        getProducts(currentPage);
        window.location.reload();
      })
    //console.log(updatedSubcategory)
    //console.log(selectedId) 

    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update product",
      });
    }
  }

  async function deleteProduct(productId) {
    // Show confirmation dialog before deleting
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.get(
          `https://zahaback.com/api/product/delete/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        getProducts();
        Swal.fire({
          icon: "success",
          title: "Product deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete product",
        });
      }
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    fetchSubcategories();
  }, [categoryId]);


  const paginationItems = [];
  for (let i = 1; i <= lastPage; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => getProducts(i)}
      >
        {i}
      </Pagination.Item>
    );
  }
  return <>
     <h1 className="text-center bg-color text-dark rounded-3 fw-bold text-capitalize p-3 my-3">
        Products
      </h1>

      {loading ? <Loading /> : 
          <div className="container">
            <div className="row g-3">
              {products?.map((product) => (
               <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
               <div className="card product-card">

             <OwlCarousel {...settings}>    
                            {product.images?.map((image, index) => (
                                    <div key={index}>
                                      <img src={image} alt="img"  height={400} className="w-100 object-fit-cover"/>
                                    </div>
                                  ))}
                              </OwlCarousel>

              
                 <div className="card-body d-flex flex-column">
                   <h5 className="card-title">
                     <span>Name: </span> {product.name}
                   </h5>
                   <p className="card-text">
                     <span className="fw-bold">Desc:</span>{" "}
                     {product.desc}
                   </p>
                   <p className="card-text">
                     <span className="fw-bold">Price:</span>{" "}
                     {product.price}
                   </p>
                   <p className="card-text">
                     <span className="fw-bold">Material:</span>{" "}
                     {product.material}
                   </p>
                   <p className="card-text">
                     <span className="fw-bold">Quantity:</span>{" "}
                     {product.quantity}
                   </p>
                   <p className="card-text">
                     <span className="fw-bold">SubCategory:</span>{" "}
                     {product.subcategory_id}
                   </p>
                   <p className="fw-bold mb-1">
                     Colors:{" "}
                     {product.colors?.map((color, index) => (
                       <span key={index}>
                         {color}
                         {index < product.colors.length - 1 && " , "}
                       </span>
                     ))}
                   </p>

                   <p className="card-text">
                     <span className="fw-bold">Sizes:</span> {product.sizes?.map((size) => size.size).join(",")}
                   </p>

                   <div className="mt-auto buttons">
                     <button
                       className="editBtn"
                       onClick={() => handleShowUpdateModal(product)}>
                       Edit
                     </button>
                     <button
                       className="deleteBtn"
                       onClick={() => deleteProduct(product.id)}
                     >
                       Delete
                     </button>
                   </div>
                 </div>
               </div>
             </div>
             
              ))}
            </div>
          </div>
        
    }

      {/* Add Product Button */}
      <div className="Btn">
        <button
          className="addBtn"
          onClick={() => setShowAddModal(true)}
        >
          Add Product
        </button>
      </div>

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="productDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="productSize">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product size"
                value={sizes}
                onChange={(e) => handleSizesChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="productMaterial">
              <Form.Label>Material</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="productQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="productCategory">
              <Form.Label>Subcategory</Form.Label>
              <Form.Control
                as="select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select Subcategory</option>
                {subcategories?.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="productColors">
              <Form.Label>Colors</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product colors (separated by comma)"
                value={colors}
                onChange={(e)=> handleColorsChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="productImages">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => handleImageChange(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={addProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Product Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={updatedname}
                onChange={(e) => setupdatedname(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product description"
                value={updatedDesc}
                onChange={(e) => setupdatedDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product price"
                value={updatedPrice}
                onChange={(e) => setupdatedPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productImages">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => handleImageChange2(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productColors">
              <Form.Label>Colors</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product colors"
                value={updatedcolors.join(', ')}
                onChange={(e) => setupdatedcolors(e.target.value.split(','))}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productSize">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product size"
                value={updatedsize.join(", ")}
                onChange={(e) => setupdatedsize(e.target.value.split(','))}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productMaterial">
              <Form.Label>Material</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product material"
                value={updatedmaterial}
                onChange={(e) => setupdatedmaterial(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product quantity"
                value={updatedquantity}
                onChange={(e) => setupdatedquantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="productCategory">
              <Form.Label>Subcategory</Form.Label>
              <Form.Control
                as="select"
                value={updatedSubcategory}
                onChange={(e) => setupdatedSubcategory(e.target.value)}
              >
                <option value="">Select Subcategory</option>
                {subcategories?.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </Form.Control>

          </Form.Group>
          {/* <Form.Control
                as="select"
                value={updatedSubcategory}
                onChange={(e) => setupdatedSubcategory(e)}
              >
                <option value="">Select Subcategory</option>
                {subcategories?.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </Form.Control> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal }>
            Close
          </Button>
          <Button variant="primary" onClick={updateProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="my-2 d-flex justify-content-center">
        <Pagination>{paginationItems}</Pagination>
      </div>

    </>
  
}
