import { useState } from "react";
import CopyButton from "./components/CopyButton";

export default function App() {
  const [algorithm, setAlgorithm] = useState("OTP");
  const [encinput, setEncinput] = useState("");
  const [decinput, setDecinput] = useState("");
  const [encryptionkey, setEncryptionkey] = useState("");
  const [decryptionkey, setDecryptionkey] = useState("");
  const [error, setError] = useState("");
  const [encoutput, setEncoutput] = useState("");
  const [decoutput, setDecoutput] = useState("");

  const encryptHandler = async () => {
    setError("")
    try {
      const response = await fetch("http://127.0.0.1:8000/api/encryption/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          algorithm: algorithm,
          encinput: encinput,
          encryptionkey: encryptionkey,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setEncoutput(data.enc_ciphertext); 
    } catch (error) {
      setError(error.message);
    }
  };

  const decryptHandler = async () => {
    setError("")
    try {
      const response = await fetch("http://127.0.0.1:8000/api/decryption/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          algorithm: algorithm,
          decinput: decinput,
          decryptionkey: decryptionkey,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setDecoutput(data.dec_ciphertext); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main>
      <div className="flex flex-col justify-center items-center p-10 w-full min-h-screen">
        <div className="flex gap-2 rounded-full bg-red-500 my-3">
          <label htmlFor="algorithm" className="w-auto p-3">
            Choose Algorithm
          </label>
          <select
            id="algorithm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="w-auto p-2"
          >
            <option value="OTP">OTP</option>
            <option value="3DES">3DES</option>
            <option value="AES">AES</option>
          </select>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex gap-6 bg-blue-200 w-full h-full p-20 max-md:p-5 max-md:flex-col">
          <div className="flex flex-col gap-3 bg-white w-1/2 h-full max-md:w-full">
            <div className="bg-blue-400 w-full h-1/2 flex flex-col gap-2 items-center justify-center px-10">
              <label htmlFor="encinput" className="text-3xl font-serif my-3 max-md:text-2xl text-center">
                Enter Message to Encrypt
              </label>
              <textarea
                className="w-full rounded-2xl text-center"
                id="encinput"
                value={encinput}
                onChange={(e) => setEncinput(e.target.value)}
                rows={10}
                cols={10}
                placeholder="Enter Message to Encrypt"
              ></textarea>
              <div className="flex gap-7 m-4 justify-center w-full">
                <label htmlFor="encryptionkey" className="text-xl text-neutral-700 max-md:text-sm w-full">
                  Enter Encryption key
                </label>
                <input
                  id="encryptionkey"
                  value={encryptionkey}
                  placeholder="Enter Encryption key"
                  className="p-1 rounded-2xl text-center w-full"
                  onChange={(e) => setEncryptionkey(e.target.value)}
                />
              </div>
              <button className="bg-yellow-400 text-white w-auto h-auto p-2 my-3 rounded-full" onClick={encryptHandler}>
                Encrypt
              </button>
            </div>

            <div className="bg-blue-400 w-full h-1/2 flex flex-col items-center pt-3">
              <h2 className="text-3xl font-serif my-3 max-md:text-2xl">Result</h2>
              {encoutput && (
                <div className="bg-white text-black w-auto h-auto mb-5 mx-10 max-md:text-xs p-2 overflow-scroll">
                  {encoutput}
                </div>
              )}
              {encoutput && <CopyButton textToCopy={encoutput} />}
            </div>
          </div>
          <div className="flex flex-col gap-3 bg-white w-1/2 h-full max-md:w-full">
            <div className="bg-blue-400 w-full h-1/2 flex flex-col gap-2 items-center justify-center px-10">
              <label htmlFor="decinput" className="text-3xl max-md:text-2xl font-serif my-3 text-center">
                Enter Message to Decrypt
              </label>
              <textarea
                className="w-full rounded-2xl text-center"
                id="decinput"
                value={decinput}
                onChange={(e) => setDecinput(e.target.value)}
                rows={10}
                cols={10}
                placeholder="Enter Message to Decrypt"
              ></textarea>
              <div className="flex gap-7 m-4 justify-center w-full">
                <label htmlFor="decryptionkey" className="text-xl text-neutral-700 max-md:text-sm w-full">
                  Enter Decryption key
                </label>
                <input
                  id="decryptionkey"
                  value={decryptionkey}
                  placeholder="Enter Decryption key"
                  className="p-1 rounded-2xl text-center w-full"
                  onChange={(e) => setDecryptionkey(e.target.value)}
                />
              </div>
              <button className="bg-yellow-400 text-white w-auto h-auto p-2 my-3 rounded-full" onClick={decryptHandler}>
                Decrypt
              </button>
            </div>
            <div className="bg-blue-400 w-full h-1/2 flex flex-col items-center pt-3">
              <h2 className="text-3xl font-serif my-3 max-md:text-2xl">Result</h2>
              {decoutput && (
                <div className="bg-white text-black w-auto h-auto mb-5 mx-10 overflow-scroll max-md:text-xs p-2">
                  {decoutput}
                </div>
              )}
              {decoutput && <CopyButton textToCopy={decoutput} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}