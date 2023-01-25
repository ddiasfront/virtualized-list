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
    // console.log(listRef.current)
    if (scrollTop + clientHeight >= scrollHeight) {
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
    
    if(scrollTop + clientHeight <= scrollHeight){
      setBlockFetch(false)
    }
  }, [listRef.current])
  useEffect(() => {
    listRef.current.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {console.log(list, "LIST ON LIST")}, [list])

  return (
    <div ref={listRef} onScroll={handleScroll} style={{height: "500px", overflow: "scroll"}}>
      {list.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))}
    </div>
  );
}