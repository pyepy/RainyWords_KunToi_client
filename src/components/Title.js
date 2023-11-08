import titlePic from '../images/title.png';

export function Title() {
    return (
        <div className="Title">
           {/* <div className="RainyWords" >⠀</div> */}
           {/* <div className="RainyWords" >Rainy Eggs</div> */}
           <img className="RaintWords" src={titlePic}/>
        </div>

    )
}