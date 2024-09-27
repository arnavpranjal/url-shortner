"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

const fallbackImages = ["/link-image (1).jpg"];

interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
  src: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [randomFallback, setRandomFallback] = useState<string>("");

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  useEffect(() => {
    setRandomFallback(fallbackImages[0]);
  }, []);

  return (
    <div style={{width:'20px',height:'20px',marginRight : '2px'}}>
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      quality={100}
      width={20}
      height={20}
      className={className}
      onError={() => {
        setImgSrc(randomFallback);
      }}
      unoptimized={true}
    />
    </div>
  );
};

export default ImageWithFallback;
