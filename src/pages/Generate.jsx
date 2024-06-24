import { useState } from "react";
import Title from "../components/Title";
import Loading from "./Loading";

const Generate = () => {

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    console.log(e.target.prompt.value)


    const form = new FormData()
    form.append('prompt', e.target.prompt.value)

    fetch('https://clipdrop-api.co/text-to-image/v1', {
      method: 'POST',
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY,
      },
      body: form,
    })
      .then(response => response.arrayBuffer())
      .then(buffer => {
        // buffer here is a binary representation of the returned image
        console.log(buffer)
        const blob = new Blob([buffer], { type: 'image/jpeg' })
        const image_url = URL.createObjectURL(blob)
        setImages([image_url, ...images])
        setLoading(false)
      })

  }

  if (loading) return <Loading></Loading>

  return (
    <div className="container">
      <Title>Generate Paintings</Title>


      <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 justify-center mt-10">
        <input
          type="text"
          name="prompt"
          placeholder="What kind of painting do you need?"
          className="input input-bordered w-10/12" />
        <button className="btn btn-primary ">Generate</button>
      </form>

      <div className="grid lg:grid-cols-1 gap-5">
        {
          images.map((image, idx) =>

            <div key={idx}>

              <img className="border-8 p-4" src={image} alt="" />

            </div>)
        }
      </div>
    </div>
  );
};

export default Generate;




















// import { useContext, useState } from "react";
// import Title from "../components/Title";
// import Loading from "./Loading";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { AuthContext } from "../providers/AuthProvider";
// import { useNavigate } from "react-router-dom";

// const Generate = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const painting_types = [
//     "Oil Painting",
//     "Watercolor Painting",
//     "Acrylic Painting",
//     "Pastel Painting",
//     "Gouache Painting",
//     "Encaustic Painting",
//     "Fresco Painting",
//     "Impasto Painting",
//     "Miniature Painting",
//     "Abstract Painting",
//     "Realistic/Representational Painting",
//   ];
//   const painting_categories = [
//     "Colorful ",
//     "Black and White ",
//     "Monochromatic ",
//     "Landscape ",
//     "Portrait ",
//     "Still Life ",
//     "Abstract ",
//     "Impressionistic ",
//     "Surrealistic ",
//     "Realistic ",
//   ];
//   const [activeCat, setActiveCat] = useState("");
//   const [activeType, setActiveType] = useState("");
//   const [loading, setLoading] = useState(false);
//   const handleSubmit = (e) => {
//     const prompt = e.target.prompt.value;

//     e.preventDefault();
//     if (activeCat.length == 0) {
//       return Swal.fire("error", "please choose a category", "error");
//     }
//     if (activeType.length == 0) {
//       return Swal.fire("error", "please choose a Type", "error");
//     }
//     if (prompt.length < 10) {
//       return Swal.fire(
//         "error",
//         "add minimum 10-30 character. not more",
//         "error"
//       );
//     }
//     setLoading(true);
//     axios
//       .post("http://localhost:5000/api/v1/paintings/generate", {
//         prompt,
//         type: activeType,
//         category: activeCat,
//         email: user?.email,
//       })
//       .then((res) => {
//         if (res?.data?.insertedId) {
//           Swal.fire("great", "painting generated", "success");
//           navigate(`/paintings/${res?.data?.insertedId}`);
//           setLoading(false);
//         }
//       });
//   };
//   if (loading) return <Loading></Loading>;
//   return (
//     <div className="container">
//       <Title>Generate Paintings</Title>

//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-wrap mt-10 justify-center gap-2"
//       >
//         <input
//           type="text"
//           name="prompt"
//           placeholder="what kind of painting do you need"
//           className="input input-bordered w-10/12 "
//         />
//         <button className="btn btn-primary ">Generate</button>
//       </form>

//       <div className="grid md:grid-cols-2 pt-10">
//         <div className="">
//           <h2 className="text-xl font-bold">Choose A Category</h2>
//           <div className="space-x-5 space-y-3">
//             {painting_categories.map((cat) => (
//               <button
//                 className={`${activeCat === cat && "bg-orange-400"}`}
//                 onClick={() => setActiveCat(cat)}
//                 key={cat}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="space-x-5 space-y-3">
//           <h2 className="text-xl font-bold">Choose A Type</h2>
//           {painting_types.map((type) => (
//             <button
//               className={`${activeType === type && "bg-orange-400"}`}
//               onClick={() => setActiveType(type)}
//               key={type}
//             >
//               {type}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Generate;


