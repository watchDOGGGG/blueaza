import React from 'react'
import { Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function ProfileAvatar({src,size,name}) {
    return (
        <Avatar size={size} src={src} icon={<UserOutlined />}>{name}</Avatar>
    )
}
