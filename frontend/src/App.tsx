import { useState } from "react";

export default function App() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      // Automatically submit the form when the image is selected
      handleSubmit();
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // If there's no image, return
    if (!image) return;

    // Sending the image to the server
    fetch("your-server-url", {
      method: "POST",
      body: JSON.stringify({ image }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // Handle response from the server
        console.log(response);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#070F2B",
        minHeight: "100vh",
        color: "#9290C3",
      }}
    >
      <h2 className="text-3xl text-center font-bold">
        Maxi чай или же Кайрат Нуртас?
      </h2>
      <div
        className="m-3"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {image && (
          <img
            src={image}
            alt="Uploaded Image"
            style={{
              width: "15rem",
            }}
          />
        )}
      </div>
      <form
        onSubmit={(e) => e.preventDefault()} // Prevent default submission
        className="space-y-8 font-[sans-serif] max-w-md mx-auto"
      >
        <input
          type="file"
          className="w-full text-black text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
          onChange={handleImageChange}
        />
      </form>
    </div>
  );
}
