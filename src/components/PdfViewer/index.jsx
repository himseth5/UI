import { useState, useCallback } from "react";

import Tooltip from '@mui/material/Tooltip';
import { FaArrowsAltH } from 'react-icons/fa'
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { MdZoomIn, MdZoomOut } from "react-icons/md";
import './pdfViewer.css'
import { Document, Page,  pdfjs } from "react-pdf";
//import worker for react-pdf to work
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();



function PdfViewer(props) {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [scale, setScale] = useState(1);
    const [pdfWidth, setPdfWidth] = useState(800);

    const { className,pdfurl, referenceTextInput } = props;

    //load pdf
    function handleDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    //outline
    function onItemClick({ pageNumber: itemPageNumber }) {
        setPageNumber(itemPageNumber);
    }

    //searchbox
    function handleInputChange(e) {
        setSearchTerm(e.target.value);
    }



    function handleReferenceText() {
        // setReferenceText({...referenceTextInput});
    }

    function highlightPattern(text, patterns) {
        // const combinedPattern = new RegExp(patterns.join('|'), 'gi');
        // return text.replace(combinedPattern, (match) => `<mark>${match}</mark>`);
        return text.replace(patterns, (match) => `<mark>${match}</mark>`);
    }

    const textRenderer = useCallback(
        (textItem) => highlightPattern(textItem.str, searchTerm),
        [searchTerm]
    );

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    const handleZoomIn = () => {
        setScale(scale < 2 ? scale + 0.1 : 1);
    };

    const handleZoomOut = () => {
        setScale(scale > 0 ? scale - 0.1 : 1);
    };

    function handlePdfWidth() {
        setPdfWidth(pdfWidth <= 1000 ? pdfWidth + 100 : 800);
    }


    return (
        <div className={className}>
            <div className="pdfViewer-function-container">
                <div className="pdf-viewer-title">sample.pdf</div>
                <div className="page-count-container">
                    <button className="page-controller-btn"
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}><CiCircleChevLeft title='Previous Page' className="page-controller-btn"/>
                    </button>
                    <p className="page-number">{pageNumber || (numPages ? 1 : '__')}/{numPages || '__'}</p>
                    <button 
                    type="button" className="page-controller-btn"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}><CiCircleChevRight title='Next Page' className="page-controller-btn" /></button>
                </div>
                <div className="pdf-icons-container">
                    <MdZoomIn className="pdf-icons" title='zoom in' onClick={handleZoomIn} />
                    <MdZoomOut className="pdf-icons" title='zoom out' onClick={handleZoomOut} />
                    <FaArrowsAltH className="pdf-icons" title='Increase pdf width' onClick={handlePdfWidth} />
                    {/* <input className='search-box' type="search" value={searchTerm} onChange={(e) => handleInputChange(e)} /> */}
                </div>
            </div>
            <div className="pdf-container">
                <Document file={pdfurl} onLoadSuccess={handleDocumentLoadSuccess} onLoadError={(error)=>console.log("error while loading pdf",error.message)}>
                  
                        <Page pageNumber={pageNumber}
                            customTextRenderer={textRenderer}
                            scale={scale}
                            width={pdfWidth} />
                    
                </Document>
            </div>




        </div>
    )
}

export default PdfViewer;