import './App.css'

export default function LoadingComponent(){
    return(
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh'}}>
            <div className="loading-spinner"></div>
            <h1 className='title' style={{marginTop:'15px'}}>Loading ...</h1>
        </div>
    )
}