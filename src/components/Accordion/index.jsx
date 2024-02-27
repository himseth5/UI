import './accordion.css';
import { useState } from 'react';

function Accordion(props) {
    const [isExpandable, setIsExpandable] = useState(false);
    const { accordionTitle, accordionContent } = props;

    const handleOnClick = () => {
        setIsExpandable(!isExpandable);

    }
    return (
        <div className="accordion-container" onClick={handleOnClick}>
            <div className='accordion-title-container'>
            <p className="accordion-title">{accordionTitle}</p>
            </div>
            {isExpandable && accordionContent &&
                <p className="accordion-content">{accordionContent}</p>
            }
        </div>
    )
}

export default Accordion;