import React, { useState } from 'react'
import { initalState } from './data'
import "./Carousel.css"
const Carousel = () => {
    const [cards,setCards]=useState(initalState);
    const [center,setCenter]=useState(3);
    const handleleft=()=>{
      const prevState=[...cards]

      const nextCardIdx=prevState.filter((card)=>card.active===true).sort((a,b)=>a.pos>b.pos?a.pos-b.pos:a.pos-b.pos)[0].idx
      
      prevState.find((prv)=>prv.active===false).active=true

      prevState.find((prv)=>prv.idx===nextCardIdx).active=false;

      prevState.find((prv)=>prv.idx===nextCardIdx).pos=Math.max.apply(null,prevState.map(function(arg){
        return  arg.pos
      }))+1;
      setCenter((nextCardIdx+3)%5===0?5:(nextCardIdx+3)%5)
      setCards(prevState)
    }

    const handleright=()=>{
         const prvState=[...cards];

         const nextCardIdx=prvState.filter((prv)=>prv.active===true).sort((a,b)=>b.pos>a.pos ? b.pos-a.pos:b.pos-a.pos)[0].idx
         
         prvState.find((prv)=>prv.active===false).pos=Math.min.apply(null,prvState.map(function(pos){
            return pos.pos;
         }))-1;

         prvState.find((prv)=>prv.active===false).active=true;

         prvState.find((prv)=>prv.idx===nextCardIdx).active=false;
         setCenter((nextCardIdx+3)%5===0?5:(nextCardIdx+3)%5)
         setCards(prvState)
    }


  return (
    <>
    <div>
      <div className='heading'>
        <p className='first_heading' >
          Featured Products
        </p>
        <p className='second_heading' >
           Explore and discover a variety of products
        </p>
      </div>
      <div className='gallery' >
        <div className='gallery-container'>
          {
            cards.filter((data)=>data.active===true).sort((a,b)=>a.pos>b.pos?1:b.pos>a.pos?-1:0).map((card,index)=>(
                <div className={index===center?"active":"notactive"}  key={index}>
                    <img className={`gallery-item gallery-item-${index+1}`}  src={card.link} alt=""/>
                </div>
            ))
          }
          </div>
      </div>
      <div className='arrows' >
      <div onClick={handleleft}>
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75024 10.5H21.6289V13.5H8.75024L13.6896 18.4393L11.5683 20.5606L3.0076 12L11.5683 3.4393L13.6896 5.56062L8.75024 10.5Z" fill="#D3D2D2"/>
      </svg>
      </div>
      <div className='dots'>
      {
        cards.filter((data)=>data.active===true).sort((a,b)=>a.pos>b.pos?1:b.pos>a.pos?-1:0).map((card,index)=>(
          <div className={card.idx===2?"dotcolor":""}>
            { card.idx===2?
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                <circle cx="6.62891" cy="5.99997" r="6" transform="rotate(-180 6.62891 5.99997)" fill="blue"/>
                </g>
                </svg>:
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                <circle cx="6.62891" cy="5.99997" r="6" transform="rotate(-180 6.62891 5.99997)" fill="#D3D2D2"/>
                </g>
                </svg>
            }
          
          </div>
        ))
      }
      </div>
      <div onClick={handleright}>
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1069 13.557H3.5532V10.443H16.1069L11.2922 5.31595L13.36 3.11401L21.7046 12L13.36 20.886L11.2922 18.6841L16.1069 13.557Z" fill="#D3D2D2"/>
      </svg>
      </div>
      </div>
      </div>
    </>
  )
}

export default Carousel