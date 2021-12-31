import React from 'react'
import TextTrim from 'react-text-trim'

export default function Texttrim({msg}) {
    return (
        <TextTrim
            refId="TextTrim"
            text={msg}
            minLines={1}
            maxLines={5}
            showMoreLabel=""
            showLessLabel=""
            delimiter="..."
            fontSize={14}
            lineHeight={16}
            containerStyle={{}}
            textWrapperStyle={{}}
            buttonStyle={{}}
        />
    )
}
