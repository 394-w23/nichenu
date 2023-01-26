import { queryHelpers } from '@testing-library/react'
import './Tag.css'
import { tagToColor, tagToBgColor,tagToName } from '../utils/helpers'

const Tag = ({ tagName }) => {
    // console.log(tagToColor[tagName])
    return (
        <div className="tag" style={{color: tagToColor[tagName],background: tagToBgColor[tagName]}}>{tagToName[tagName]}</div>
    )
}
export default Tag;