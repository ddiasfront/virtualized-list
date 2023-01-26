import React, { useState, useRef, useEffect } from 'react';
import { useList} from './queryList';

export function VirtualizedList() {
  const {list, handleNextPage} = useList(100, 1)
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const [blockFecth, setBlockFetch] = useState(true);
  const listRef = useRef(null);
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = listRef.current!;
    // Check if the user has scrolled to the bottom of the list
    console.log(scrollHeight, "SRCOLL SHT")
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      console.log(scrollTop, clientHeight, scrollHeight ,"WTFFF");
      console.log("HIT SCROLL");
      if(!blockFecth){
        handleNextPage();
      }
    }
  };
  useEffect(() => {
    const { scrollTop, clientHeight, scrollHeight } = listRef.current!;
    console.log("scroll height", scrollTop, clientHeight, scrollHeight);
    
    if(scrollTop + clientHeight <= scrollHeight - 50){
      setBlockFetch(false)
    }
  }, [listRef.current])
  useEffect(() => {
    listRef['current'].addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <div ref={listRef} onScroll={handleScroll} style={ {width:'100%', overflow: "scroll", borderTop: '1px solid'}}>
      
        <div style={{display: 'flex', width: '100%', height: "55px"}}>
          <div style={{flex: '1', textAlign: 'center', borderLeft: '1px solid', borderRight: '1px solid'}}>Name"</div>
          <div style={{flex: '1' , textAlign: 'center', borderRight: '1px solid'}}>Description</div>
          <div style={{flex: '1' , textAlign: 'center', borderRight: '1px solid'}}>Price</div>
          </div>
    
    </div>
    <div ref={listRef} onScroll={handleScroll} style={
      {width:'100%', height: "500px", overflow: "scroll", borderBottom: '1px solid', borderTop: '1px solid'}}>
      {list.map((item, index) => (
        <div key={index} style={{display: 'flex', width: '100%', borderBottom: '1px solid'}}>
          <div style={{flex: '1', textAlign: 'center', borderLeft: '1px solid', borderRight: '1px solid'}}>{item.name}</div>
          <div style={{flex: '1' , textAlign: 'center', borderRight: '1px solid'}}>{item.description}</div>
          <div style={{flex: '1' , textAlign: 'center', borderRight: '1px solid'}}>{item.price}</div>
          </div>
      ))}
    </div>
    </>
  );
}