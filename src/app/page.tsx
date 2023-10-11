"use client"

import Link from "next/link"
import { redirect } from "next/navigation"
import { useState } from "react"

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<"Hindi" | "English" | "Sanskrit">("Hindi")
  const [sloka, setSloka] = useState<string>("")

  function onClickSubmit() {
    console.log(sloka);
    redirect(`/${sloka}/${selectedLanguage}`)
    //if (selectedLanguage && sloka !== "") {
    //  const response: AxiosResponse = await axios.post("https://hari1105.pythonanywhere.com/slok", {
    //    query: sloka,
    //    queryLanguage: selectedLanguage?.toLowerCase()
    //  })
    //  //console.log(response.data.result);
    //  const relatedSlokas = response.data.result.split("\sl/")
    //  //console.log(relatedSlokas);
    //}
  }

  return (
    <div className='p-6 h-screen flex flex-col items-center justify-center' >
      <div className="w-[500px]" >
        <h1 className="text-center font-bold text-4xl mb-3" >Sloka Search Engine</h1>
        <div className="border border-black rounded-full px-4 py-2 w-[500px] flex flex-row items-center justify-between" >
          <input type="text" name="search" id="search" value={sloka} placeholder="search" onChange={e => setSloka(e.target.value)} className="outline-none w-11/12" />
          <Link href={`/${sloka}/${selectedLanguage.toLowerCase()}`}  >
            <div className="w-4" >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search"><g data-name="Layer 2"><path d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" data-name="search"></path></g></svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
