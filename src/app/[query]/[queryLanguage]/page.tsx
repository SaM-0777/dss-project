"use client"
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Link from "next/link"

export default function Result({params}: {params: {query: string, queryLanguage: "hindi" | "english" | "sanskrit"}}) {
  const [selectedLanguage, setSelectedLanguage] = useState<"hindi" | "english" | "sanskrit">(params.queryLanguage)
  const [sloka, setSloka] = useState<string>(params.query)
  const [results, setResults] = useState<string[] | undefined | null>()

  function handleSelectedLanguage(language: "hindi" | "english" | "sanskrit") {
    setSelectedLanguage(language)
  }

  useEffect(() => {
    onClickSubmit()
    return () => {}
  }, [])

  async function onClickSubmit(e?: any) {
    e?.preventDefault()
    if (selectedLanguage && sloka !== "") {
      const response: AxiosResponse = await axios.post("https://hari1105.pythonanywhere.com/slok", {
        query: sloka,
        queryLanguage: selectedLanguage?.toLowerCase()
      })
      //console.log(response.data.result);
      const relatedSlokas = response.data.result.split("\sl/")
      //console.log(relatedSlokas);
      setResults(relatedSlokas)
    }
  }

  return (
    <div className="p-6 flex flex-col items-center justify-center" >
      <div className="w-[500px]" >
        <div className="border border-black rounded-full px-4 py-2 w-[500px] flex flex-row items-center justify-between" >
          <input type="text" name="search" id="search" value={sloka} onChange={e => setSloka(e.target.value)} className="outline-none w-11/12" />
          <Link href={`/${sloka}/${selectedLanguage}`} className="w-4" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search"><g data-name="Layer 2"><path d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" data-name="search"></path></g></svg>
          </Link>
        </div>
        <div className="pt-3 flex justify-start items-center gap-6" >
          <button className={`${selectedLanguage == "hindi" ? "bg-blue-200" : "border-gray-400" } border px-3 rounded-full`} onClick={() => handleSelectedLanguage("hindi")} >
            Hindi
          </button>
          <button className={`${selectedLanguage === "english" ? "bg-blue-200" : "border-gray-400"} border px-3 rounded-full`} onClick={() => handleSelectedLanguage("english")} >
            English
          </button>
          <button className={`${selectedLanguage === "sanskrit" ? "bg-blue-200" : "border-gray-400"} border px-3 rounded-full`} onClick={() => handleSelectedLanguage("sanskrit")} >
            Sanskrit
          </button>
        </div>
        {results &&
          <div className="mt-6" >
            {results.map((res, ind) => (
              res !== "" && <div key={ind.toString()} className="w-[500px] p-2 bg-slate-200 rounded-xl mb-2" >
                {res}
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}
