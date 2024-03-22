import React, { useEffect, useRef, useState } from 'react'
import OverflowMenu from './OverflowMenu';
import "./intersection.css"

const useIntersectionStyles=()=>({
    visible:{
        order:0,
        visibility:"visible",
        opacity:1
    },
    inVisible:{
       order:100,
       visibility:"hidden",
       opacity:0,
       pointerEvents:"none"
    },
    toobarWrapper:{
        display:"flex",
        overflow:"hidden",
        padding:"0 20px",
        width:"75%"
    },
    overflowStyle:{
        order:99,
        position:"sticky",
        right:"0",
        backgroundColor:"white"
    }
})

const Intersection = ({children,visible,setVisible}) => {
    
    const classes=useIntersectionStyles()
    const navRef=useRef(null);
    // const [visible,setVisible]=useState({});
    

    const handleIntersection=(entries)=>{
      const updateEntries={};
      entries.forEach((entry)=>{
         const targetid=entry.target.dataset.targetid;

         if(entry.isIntersecting){
             updateEntries[targetid]=true;
         }else{
             updateEntries[targetid]=false;
         }
      })

      setVisible((prv)=>({
         ...prv,...updateEntries
      }))

      //console.log(updateEntries)
    }
    useEffect(()=>{
       const observer=new IntersectionObserver(handleIntersection,{
        root:navRef.current,
        threshold:1
       });
       
       Array.from(navRef.current.children).forEach((item)=>{
        
            if(item.dataset.targetid){
                
                observer.observe(item);
            }
       })

       return ()=>{
         observer.disconnect();
       }
    },[])

   
  return (
    <>
    <div className="tagsBackGround">
    <div className="tags"  ref={navRef}>
        {
            React.Children.map(children,(child)=>{
            
               const additionalClassess={
                    [classes.visible]:!!visible[child.props["data-targetid"]],
                    [classes.inVisible]:!visible[child.props["data-targetid"]]
               };
                
               const newClassName=(
                (child.props.className?child.props.className+' ':'')+Object.keys(additionalClassess).filter(className=>additionalClassess[className]).join(' ')
               )
               
               return React.cloneElement(child,{className:newClassName})
            })
        }
     <OverflowMenu visibility={visible}>
     {children}
    </OverflowMenu>
    </div>
    </div>
   </>
  )
}

export default Intersection