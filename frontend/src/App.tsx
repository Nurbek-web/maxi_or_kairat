import { useEffect, useState } from "react";
import { client } from "@gradio/client";
import BarChart from "./BarChart"; // Import the BarChart component

export default function App() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    // Fetch data when the image state changes
    fetchData();

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  async function fetchData() {
    // if (!image) return;

    // Convert the image file to a Blob object
    // const response = await fetch(image);
    // const imageBlob = await response.blob();

    // // Create a FormData object and append the image file to it
    // const formData = new FormData();
    // formData.append("img", imageBlob, "image.png");

    // // Sending the image to the Gradio API
    // const app = await client("actuallyastarfish/maxi_or_kairat");
    // const result = await app.predict("/predict", [imageBlob]);

    // // Set the prediction result
    // console.log(result.data);

    const response_0 = await fetch(
      "https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png"
    );
    const exampleImage = await response_0.blob();

    const app = await client("tunglinwu/cat_or_dog_fastai_sample");
    const result = await app.predict("/predict", [
      exampleImage, // blob in 'img' Image component
    ]);
  }

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen bg-[#070F2B] text-[#9290C3]">
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl text-center font-bold mb-8">
          Maxi чай или же Кайрат Нуртас?
        </h2>
        <div className="flex justify-center mb-8">
          {image && (
            <img
              src={image}
              alt="Uploaded Image"
              className="max-w-full h-auto"
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                objectFit: "contain",
              }}
            />
          )}
        </div>
        <form
          onSubmit={(e) => e.preventDefault()} // Prevent default submission
          className="flex flex-col items-center space-y-4"
        >
          <input
            type="file"
            className="w-full max-w-xs text-black text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
            onChange={handleImageChange}
          />
        </form>
        <div className="max-w-sm mx-auto mt-8">
          <div className="bg-white rounded-lg shadow p-4">
            {prediction && <BarChart data={prediction} />}
          </div>
        </div>
      </div>
    </div>
  );
}
