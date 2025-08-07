import {Link} from "react-router-dom";
import pencil from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import eye from "../../assets/icons/show.svg";
import ToolTipModal from "../../Modal/ToolTipModal.jsx";

const Action = ({show, edit, dump}) => {
    return (
        <div className="flex gap-6">

            {show &&
                <Link to={show.to} className=" cursor-pointer">
                    <img src={eye} className="w-4" />
                </Link>
            }

            {edit &&
                <Link to={edit.to} className="cursor-pointer">
                    <img src={pencil} className="w-4" />
                </Link>
            }

            {dump &&
                <div className="relative group">
                    <button onClick={dump.onClick} className={dump.disabled ? 'cursor-not-allowed' : 'cursor-pointer' } disabled={dump.disabled} >
                        <img src={trash} className="w-4" />
                    </button>
                    {dump.disabled && <ToolTipModal position="right" message={dump.message}/>  }
                </div>
            }



        </div>
    )
}

export default Action;