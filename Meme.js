import React from "react"
// import memesData from "./memesData.js"

export default function Meme() {
    
    const [meme , setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemeImages, setAllMemeImages] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemeImages(data.data.memes))
    }, [])
    
    function getMemeImage() {
        
        // const Array = allMemeImages.data.memes
        const random = Math.floor(Math.random() * allMemeImages.length)
        // console.log(random)
        const url = allMemeImages[random].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage:url
        }))
        // console.log(url)
    }
    
    function handleChange(event) {
        const {name,value} = event.target
        setMeme(prevMeme=> ({
            ...prevMeme,
            [name]:value
        }))
    }
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
            <img src={meme.randomImage} alt= " vhv" className="meme--image" />
            <h2 className="meme--text top">{meme.topText}</h2>
            <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}