// import { useState } from "react";
// import axios from "axios";

// export default function UploadImage() {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [model, setModel] = useState("gemini-1.5-flash"); 


//   function onFileChange(e) {
//     const f = e.target.files?.[0];
//     setFile(f || null);
//     setStatus("");
//     if (f) {
//       const url = URL.createObjectURL(f);
//       setPreview(url);
//     } else {
//       setPreview(null);
//     }
//   }

//   async function onSubmit(e) {
//     e.preventDefault();
//     if (!file) {
//       setStatus("Please choose an image first.");
//       return;
//     }
//     setLoading(true);
//     setStatus("");

//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("model_name", model); 

//       const res = await axios.post(`https://web-production-793c2.up.railway.app/api/images/upload`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const d = res.data;
//       if (d.status === "duplicate_exact") {
//         setStatus(`Duplicate: this exact image already exists (id: ${d.imageId}).`);
//       } else if (d.status === "created") {
//         setStatus(`Success: stored new image (id: ${d.imageId}).`);
//       } else if (d.status === "duplicate_perceptual") {
//         setStatus(`Duplicate: this perceptual image already exists (id: ${d.imageId}).`);
//       } else if (d.status === "duplicate_ai") {
//         setStatus(`Duplicate: this CNN image already exists (id: ${d.imageId}).`);
//       } else if (d.status === "rejected_ai") {
//         setStatus(`Classified as an AI generated image:\n${d.description}`);
//       } else {
//         setStatus("Unexpected response.");
//       }
//     } catch (err) {
//       const msg = err?.response?.data?.detail || err.message;
//       setStatus(`Error: ${msg}`);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div style={{ maxWidth: 520, margin: "2rem auto", fontFamily: "system-ui" }}>
//       <h2>Upload Image</h2>
//       <form onSubmit={onSubmit}>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={onFileChange}
//           disabled={loading}
//         />

        
//         <div style={{ margin: "1rem 0" }}>
//           <label>Select Model: </label>
//           <select value={model} onChange={(e) => setModel(e.target.value)} disabled={loading}>
//             <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
//             <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
//             <option value="openai-gpt4.1">OpenAI GPT-4.1</option>
//             <option value="groq-llama-3.3-70b">Groq Llama-3.3 70B</option>
//             <option value="groq-gpt-oss-20b">Groq GPT-OSS-20B</option>
//           </select>
//         </div>

//         <div style={{ margin: "1rem 0" }}>
//           {preview && (
//             <img
//               src={preview}
//               alt="preview"
//               style={{ maxWidth: "100%", borderRadius: 8 }}
//             />
//           )}
//         </div>
//         <button type="submit" disabled={loading || !file}>
//           {loading ? "Uploading..." : "Upload"}
//         </button>
//       </form>
//       {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Upload, Loader2 } from "lucide-react";

export default function UploadImage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("gemini-1.5-flash");

  function onFileChange(e) {
    const f = e.target.files?.[0];
    setFile(f || null);
    setStatus("");
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!file) {
      setStatus("⚠️ Please choose an image first.");
      return;
    }
    setLoading(true);
    setStatus("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("model_name", model);

      const res = await axios.post(
        `https://web-production-793c2.up.railway.app/api/images/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const d = res.data;
      if (d.status === "duplicate_exact") {
        setStatus(`⚠️ Duplicate: this exact image already exists (id: ${d.imageId}).`);
      } else if (d.status === "created") {
        setStatus(`✅ Success: stored new image (id: ${d.imageId}).`);
      } else if (d.status === "duplicate_perceptual") {
        setStatus(`⚠️ Duplicate: perceptual image already exists (id: ${d.imageId}).`);
      } else if (d.status === "duplicate_ai") {
        setStatus(`⚠️ Duplicate: CNN image already exists (id: ${d.imageId}).`);
      } else if (d.status === "rejected_ai") {
        setStatus(`❌ Classified as AI generated:\n${d.description}`);
      } else {
        setStatus("❓ Unexpected response.");
      }
    } catch (err) {
      const msg = err?.response?.data?.detail || err.message;
      setStatus(`❌ Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6 text-white"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">🚀 Upload Image</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* File input */}
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/30 rounded-xl cursor-pointer hover:border-indigo-400 transition">
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              disabled={loading}
              className="hidden"
            />
            <Upload className="w-8 h-8 mb-2 text-indigo-400" />
            <span className="text-sm">
              {file ? file.name : "Click or drag & drop your image"}
            </span>
          </label>

          {/* Model select */}
          <div>
            <label className="block mb-1 text-sm">Select Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 rounded-lg bg-gray-900/70 border border-white/20 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
              <option value="openai-gpt4.1">OpenAI GPT-4.1</option>
              <option value="groq-llama-3.3-70b">Groq Llama-3.3 70B</option>
              <option value="groq-gpt-oss-20b">Groq GPT-OSS-20B</option>
            </select>
          </div>

          {/* Preview */}
          {preview && (
            <motion.img
              src={preview}
              alt="preview"
              className="w-full rounded-xl shadow-lg border border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading || !file}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
              </>
            ) : (
              "Upload"
            )}
          </button>
        </form>

        {/* Status */}
        {status && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm whitespace-pre-line p-3 rounded-lg bg-black/40 border border-white/20"
          >
            {status}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

