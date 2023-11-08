import titlePic from '../images/title.png';
import logoPic from '../images/logoReal2.png'
import { userLogin } from '../utils/userdata';

export function Title() {
    return (
        <div className="Title">
            {/* <div className="RainyWords" >⠀</div> */}
            {/* <div className="RainyWords" >Rainy Eggs</div> */}
            {userLogin === 1 ? 
                null 
                :
                <img className="logoPic" src={logoPic}/>
            }
        </div>

    )
}