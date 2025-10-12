import {Link} from "react-router-dom";
import ToolTipModal from "../../Modal/ToolTipModal.jsx";
import {
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
    PaperClipIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/16/solid/index.js";
import {useTranslation} from "react-i18next";
import {capitalize} from "../../utils/helper.js";
import {DocumentTextIcon, DocumentChartBarIcon} from "@heroicons/react/24/solid/index.js";

const Action = ({show, edit, dump, attachment, check, reject, pdf, excel}) => {
    const {t} = useTranslation();
    return (
        <div className="flex gap-2 ">

            {check &&
                <div className="relative group">
                    <button onClick={check.onClick}>
                        <CheckCircleIcon className="w-5 cursor-pointer text-success" />
                    </button>
                     <ToolTipModal position="center" message={check.message || capitalize(t('leave'))} className="bg-primary"/>
                </div>
            }

            {reject &&
                <div className="relative group">
                    <button onClick={reject.onClick}>
                        <XCircleIcon className="w-5 cursor-pointer text-danger" />
                    </button>
                     <ToolTipModal position="center" message={reject.message || capitalize(t('reject'))} className="bg-primary"/>
                </div>
            }

            {attachment &&
                   <div className="relative group">
                    <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                        <PaperClipIcon className="w-5 cursor-pointer"/>
                    </a>
                     <ToolTipModal position="center" message={attachment.message || capitalize(t('attachment'))} className="bg-primary"/>
                </div>
            }

            {show &&
                <div className="relative group">
                    <Link to={show.to} onClick={show.onClick} className=" cursor-pointer">
                        <EyeIcon className="w-5 cursor-pointer"/>
                    </Link>
                     <ToolTipModal position="center" message={show.message || capitalize(t('show'))} className="bg-primary"/>
                </div>
            }

            {edit &&
                   <div className="relative group">
                    <Link to={edit.to} className="cursor-pointer">
                        <PencilSquareIcon className="w-5 cursor-pointer" />
                    </Link>
                     <ToolTipModal position="center" message={edit.message || capitalize(t('edit'))} className="bg-primary"/>
                </div>
            }

            {dump &&
                <div className="relative group">
                    <button onClick={dump.onClick} className={dump.disabled ? 'cursor-not-allowed' : 'cursor-pointer' } disabled={dump.disabled} >
                        <TrashIcon className="w-5 text-danger" />
                    </button>
                    {dump.disabled && <ToolTipModal position="right" message={dump.message} className="cursor-not-allowed"/>  }
                    {!dump.disabled && <ToolTipModal position="right" message={dump.message || capitalize(t('delete'))}/>  }
                </div>
            }

            {pdf &&
                <div className="relative group">
                    <Link to={pdf.to} onClick={pdf.onClick} className=" cursor-pointer">
                        <DocumentTextIcon className="w-5 cursor-pointer text-danger"/>
                    </Link>
                    <ToolTipModal position="center" message={pdf.message || capitalize(t('pdf'))} className="bg-primary"/>
                </div>
            }

            {excel &&
                <div className="relative group">
                    <Link to={excel.to} onClick={excel.onClick} className=" cursor-pointer">
                        <DocumentChartBarIcon className="w-5 cursor-pointer text-success"/>
                    </Link>
                    <ToolTipModal position="center" message={excel.message || capitalize(t('excel'))} className="bg-primary"/>
                </div>
            }
        </div>
    )
}

export default Action;