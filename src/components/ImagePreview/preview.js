import React, { useState } from 'react';
import { Image } from 'antd';

export function FilePreview ({files}){
  const [visible, setVisible] = useState(false);
  
  
  return (
    <>
      <Image
        preview={{ visible: false }}
        width={200}
        src={files[0].file}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
        {files.map((item) =>{
              return(
                <Image src={item.file} />
              )
          })}
        </Image.PreviewGroup>
      </div>
    </>
  );
};


export function ThreadFilePreview ({files}){
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Image
        preview={{ visible: false }}
        width={500}
        src={files[0][0].file}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
        {files.map((item) =>{
              return(
                <Image src={item[0].file} />
              )
          })}
        </Image.PreviewGroup>
      </div>
    </>
  );
};
