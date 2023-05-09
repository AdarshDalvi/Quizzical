import './App.css'

export default function ShapeBlobs(props){
    let style1= {
        top: props.top,
        right: props.right
    }
    let style2= {
        left: props.left,
        bottom: props.bottom
    }
    return (
        <>
            <div className="blob-1" style={style1}></div>
            <div className="blob-2" style={style2}></div>
        </>
    )
}