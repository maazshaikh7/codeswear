// AddProductPage.tsx
import { useState, ChangeEvent, FormEvent } from "react";

interface Size {
  size: string;
  price: number;
  qtyInStock: number;
}

interface ColorVariant {
  color: string;
  sizes: Size[];
  [key: string]: any;
}

interface FormData {
  title: string;
  slug: string;
  description: string;
  img: string;
  category: string;
  colorVariants: ColorVariant[];
}

const AddProduct = () => {
  const initialSize: Size = {
    size: "",
    price: 0,
    qtyInStock: 0,
  };

  const initialColorVariant: ColorVariant = {
    color: "",
    sizes: [initialSize],
  };

  const initialFormData: FormData = {
    title: "",
    slug: "",
    description: "",
    img: "",
    category: "",
    colorVariants: [initialColorVariant],
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleColorVariantChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const colorVariants: ColorVariant[] = [...formData.colorVariants];
    colorVariants[index][name] = value;
    setFormData({ ...formData, colorVariants });
  };

  const handleSizeChange = (
    colorIndex: number,
    sizeIndex: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const colorVariants: ColorVariant[] = [...formData.colorVariants];
    colorVariants[colorIndex].sizes[sizeIndex][name as keyof Size] =
      value as never;
    setFormData({ ...formData, colorVariants });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/products/addproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Handle success message or redirect to a different page
        console.log("Product added successfully!");
      } else {
        console.log("Failed to add the product. Please try again!");
      }
    } catch (error) {
      console.log("Error in adding a new product:", error);
      console.log("Something went wrong. Please try again!");
    }
  };

  return (
    <div className=" bg-pink-50 py-10 px-4">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <h1 className="text-center text-2xl font-bold text-pink-600 py-4">
          Add Product
        </h1>
        <form onSubmit={handleSubmit} className="px-8 py-6">
          <label className="block">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="block w-full mt-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </label>
          <br />
          <label className="block">
            Slug:
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              required
              className="block w-full mt-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </label>
          <br />
          <label className="block">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="block w-full mt-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </label>
          <br />
          <label className="block">
            Image URL:
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleInputChange}
              required
              className="block w-full mt-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </label>
          <br />
          <label className="block">
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="block w-full mt-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </label>
          <br />
          {formData.colorVariants.map((colorVariant, colorIndex) => (
            <div key={colorIndex} className="my-4">
              <h3 className="text-xl font-semibold text-pink-600">
                Color Variant {colorIndex + 1}
              </h3>
              <label className="block">
                Color:
                <input
                  type="text"
                  name="color"
                  value={colorVariant.color}
                  onChange={(e) => handleColorVariantChange(colorIndex, e)}
                  required
                  className="block w-full mt-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                />
              </label>
              <br />
              {colorVariant.sizes.map((size, sizeIndex) => (
                <div key={sizeIndex} className="my-4">
                  <h4 className="text-lg font-semibold text-pink-600">
                    Size {sizeIndex + 1}
                  </h4>
                  <label className="block">
                    Size:
                    <input
                      type="text"
                      name="size"
                      value={size.size}
                      onChange={(e) =>
                        handleSizeChange(colorIndex, sizeIndex, e)
                      }
                      required
                      className="block w-full mt-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    />
                  </label>
                  <br />
                  <label className="block">
                    Price:
                    <input
                      type="number"
                      name="price"
                      value={size.price}
                      onChange={(e) =>
                        handleSizeChange(colorIndex, sizeIndex, e)
                      }
                      required
                      className="block w-full mt-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    />
                  </label>
                  <br />
                  <label className="block">
                    Quantity in Stock:
                    <input
                      type="number"
                      name="qtyInStock"
                      value={size.qtyInStock}
                      onChange={(e) =>
                        handleSizeChange(colorIndex, sizeIndex, e)
                      }
                      required
                      className="block w-full mt-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    />
                  </label>
                  <br />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const updatedVariants = [...formData.colorVariants];
                  updatedVariants[colorIndex].sizes.push({ ...initialSize });
                  setFormData({ ...formData, colorVariants: updatedVariants });
                }}
                className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
              >
                Add Size Variant
              </button>
              <br />
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setFormData({
                ...formData,
                colorVariants: [
                  ...formData.colorVariants,
                  { ...initialColorVariant },
                ],
              });
            }}
            className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
          >
            Add Color Variant
          </button>
          <br />
          <button
            type="submit"
            className="block w-full mt-4 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
          >
            Add product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
