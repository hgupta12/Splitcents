import React, { useEffect, useState } from "react"

export default function Input ({ placeholder, debounce, setter, loader }) {
    let [ value, setValue ] = useState("")
    let [ loading, setLoading ] = useState(false)

    async function set () {
        setLoading(true)
        await setter(value)
        setLoading(false)
    }

    useEffect(() => {
        if (!debounce) {
            set()
            return
        }

        let timeout = setTimeout(set, debounce)
        return () => clearTimeout(timeout)
    }, [ value ])

    return (
        <input
            placeholder = {placeholder}
            value = {value}
            onChange = {e => setValue(e.target.value)}
            className = "bg-neutral-100 py-1 px-3 rounded-md border-cyan-300 focus:border-cyan-500 transition-colors border-2 outline-none"
        />
    )
}