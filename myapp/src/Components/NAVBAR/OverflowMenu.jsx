import React, {  useMemo, useState } from 'react'
import "./overflow.css"

const OverflowMenu = ({children,visibility}) => {
   
    const [openMore,closeMore]=useState(false)
    
    const handleClick=(event)=>{
        closeMore(!openMore) 
    }

    const handleClose=()=>{
        closeMore(!openMore)
    }

    const shouldShowMenu=useMemo(()=>Object.values(visibility).some((v)=>v===false),[visibility]);

   

  return (
    <>
     <div style={{order:"99",position:"inherit",right:"0",marginRight:"6rem",paddingTop:"1.4rem"}}>
       <p style={{position:"sticky",right:"0",zIndex:"100",marginLeft:"3rem"}}  className="More" aria-label='more' aria-controls='long-menu' aria-haspopup="true" onClick={handleClick} >
          More {
            <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.293 1.29302C0.480528 1.10555 0.734836 1.00023 1 1.00023C1.26516 1.00023 1.51947 1.10555 1.707 1.29302L5 4.58602L8.293 1.29302C8.38525 1.19751 8.49559 1.12133 8.6176 1.06892C8.7396 1.01651 8.87082 0.988924 9.0036 0.98777C9.13638 0.986616 9.26806 1.01192 9.39095 1.0622C9.51385 1.11248 9.6255 1.18673 9.71939 1.28062C9.81329 1.37452 9.88754 1.48617 9.93782 1.60907C9.9881 1.73196 10.0134 1.86364 10.0123 1.99642C10.0111 2.1292 9.98351 2.26042 9.9311 2.38242C9.87869 2.50443 9.80251 2.61477 9.707 2.70702L5.707 6.70702C5.51947 6.89449 5.26516 6.99981 5 6.99981C4.73484 6.99981 4.48053 6.89449 4.293 6.70702L0.293 2.70702C0.105529 2.51949 0.000213623 2.26518 0.000213623 2.00002C0.000213623 1.73486 0.105529 1.48055 0.293 1.29302Z" fill="white"/>
            </svg>
          } 
       </p>
       { shouldShowMenu !==false &&
       <div id="long-menu" className='More_contain'  style={openMore===true?{display:"inherit",backgroundColor:"black",width:"10rem",borderRadius:"1rem",marginRight:"-7rem",position:"absolute"}:{display:'none',backgroundColor:"black",width:'10rem',borderRadius:"1rem"}} onClick={handleClose}>
        {
          Array.isArray(children) && children.map((child)=>{
                if(!visibility[child.props['data-targetid']]){
                      return( 
                        <div className='More_Child' key={child.props["data-targetid"]}  styles={{display:"flex",flex:"0 0 auto",order:"99",position:"sticky",right:"0",color:'white'}} onClick={handleClose}>
                            {child}
                        </div>
                    )
                }

            })
        }
       </div>
      }
     </div>
    
     </>
  )
}

export default OverflowMenu