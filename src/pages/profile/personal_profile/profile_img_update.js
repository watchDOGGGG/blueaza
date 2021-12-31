import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useSelector } from 'react-redux';
import { endpoint } from '../../../passer/key/endpoint/endpoint';

export default function ProfileImageUpdate() {
    const loggedInUser = useSelector(state => state.nav.loggedInUser)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [username, setName] = useState(loggedInUser?.username);
    const [fileList, setFileList] = useState([ ]);

  

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onSubmit = async() =>{
      const formData = new FormData();
      if(fileList.length > 0){
        formData.append('files', fileList[0].originFileObj)
      }
        if(username.length>0){
            formData.set('name',username)
        }else{
            formData.set('name',loggedInUser.username)
        }
        

      const initiate = await fetch(`${endpoint}/update/updateId`,{
          method: 'POST',
          headers: {passkey: localStorage.passkey},
          body: formData
      })

      const response = await initiate.json()
      if(response.error){
          return message.error(response.error)
      }
      return message.success(response.success)
  }
  return (
    <>
    <span className="pa1" onClick={showModal}>Edit</span>
      <Modal title="Update profile info." visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[]}>
              {/* image upload */}
              <div className="flex justify-center"> 
                  <div className="justify-center">
                  <ImgCrop rotate>
                      <Upload
                          listType="picture-card"
                          fileList={fileList}
                          onChange={onChange}
                          onPreview={onPreview}
                      >
                          {fileList.length < 1 && '+ Upload'}
                      </Upload>
                  </ImgCrop>
                  </div>
                  {/* name */}
                  <div className="justify-center">
                      <input onChange={e=>setName(e.target.value)} className="ba b--black-10 w-80 pa2 b f6" value={username} type="text" />
                  </div>
                  
              </div>
        {/* submit edit */}
        <div className="flex pointer grow w-100 justify-center mt2">
                     <div className="br1 w-30 tc bg-blue pa2" onClick={onSubmit}>
                     <span className="grow-1 tc" >save</span>
                     </div>
                  </div>
      </Modal>
    </>
  );
};

