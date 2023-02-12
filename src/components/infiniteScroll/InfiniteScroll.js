import { useEffect, useState } from "react";
import { throttle } from "lodash";

const InfiniteScroll = ({ onScrollEnd, pageNum,setPageNum }) => {
  const [isEnd, setIsEnd] = useState(false);

  const handleScroll = throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight+10 >= scrollHeight) {
      setIsEnd(true);
      if (onScrollEnd) 
      onScrollEnd(pageNum);
      setPageNum(pageNum+1)
      setIsEnd(false);
    }
  }, 300);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { isEnd };
};

export default InfiniteScroll;
