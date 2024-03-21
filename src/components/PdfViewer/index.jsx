import "./pdfViewer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import { useState, useCallback, useEffect, useContext } from "react";

import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { MdZoomIn, MdZoomOut } from "react-icons/md";

import { Document, Page, pdfjs } from "react-pdf";
import { appContext } from "../../context/AppContext";
import "@react-pdf-viewer/search/lib/styles/index.css";

//import worker for react-pdf to work
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function PdfViewer(props) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [scale, setScale] = useState(1);
  const [pageContent, setPageContent] = useState("");
  const [highlightedText, setHighlightedText] = useState('');
  const [searchEntered, setSearchEntered] = useState(false);
  // const [pageText, setPageText] = useState("");
  const [searchFound,setSearchFound]= useState(false);

  const { className, pdfurl, referenceTextInput, pdfname } = props;
  const { pageNum } = useContext(appContext);

  // let searchFound = false;
  let newPageNumber = 0;
  let pageText = "";

  useEffect(() => {
    console.log("page no. in useEffect", pageNum);
    handlePageNumberClick(pageNum);
  }, [pageNum]);

  useEffect(() => {
    console.log("page no. here is:", pageNumber);
  }, [pageNumber]);

  ///navigate to page no. on click
  function handlePageNumberClick(pageNum) {
    console.log("handlepagenumber called");
    if (pageNum > numPages || pageNum < 0) {
      alert(`pageno.${pageNum} is not available in this pdf`);
      return;
    }
    setPageNumber(pageNum);
  }

  //load pdf
  function handleDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // function handleReferenceText() {
  //   // setReferenceText({...referenceTextInput});
  // }

  function highlightReferenceText(text, references) {
    const combinedPattern = new RegExp(references.join("|"), "gi");
    return text.replaceAll(
      combinedPattern,
      (match) => `<mark style="background-color:red">${match}</mark>`
    );
  }

  //search Functionality
  function handleInputChange(e) {
    setSearchTerm(e.target.value);
  }

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
       setSearchFound(false);
      pageText = highlightSearchTerm(pageContent, searchTerm);
      console.log("final page text:", pageText);
    }
  };

  function highlightSearchTerm(text, searchTerm) {
    let index = text.indexOf(searchTerm);
    console.log("index is:", index);
    console.log("text passed is:", text);
    console.log("pagecontent is:", pageContent);
    console.log("page no. is:", pageNumber);
    console.log("new Page no. is :", newPageNumber);
    if (index === -1) {
      handlePageChangeOnSearch();
    } else {
      setSearchFound(true);
      setHighlightedText(text.replaceAll(searchTerm, (match) => `<mark>${match}</mark>`));
    }
  }

  function handlePageChangeOnSearch() {
    setPageNumber((prevPageNumber) => {
      if (prevPageNumber < numPages && !searchFound) {
        newPageNumber = prevPageNumber + 1;
      }
      return newPageNumber;
    });
  }

  const textRenderer = useCallback(
    (textItem) => {
      // if (searchFound) {
      //   return;
      // }
      console.log("text in page is:", textItem.str);
      setPageContent((prevContent) => prevContent.concat(textItem.str));

      if (searchFound) {
        return highlightedText;
      }
      if (searchTerm && !searchFound) {
        highlightSearchTerm(textItem.str, searchTerm);
        // console.log("final page text:", pageText);
        // return pageText;
      }

      if (referenceTextInput.length > 0) {
        return highlightReferenceText(textItem.str, referenceTextInput);
      }

      //setPageText(textItem.str);
      console.log("final page text:", pageText);
      return pageText;
    },
    [referenceTextInput, pageNumber, highlightedText]
  );

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
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

  return (
    <div className={className}>
      <div className="pdfViewer-function-container">
        <div className="pdf-viewer-title">{pdfname}</div>
        <div className="page-count-container">
          <button
            className="page-controller-btn"
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            <CiCircleChevLeft
              title="Previous Page"
              className="page-controller-btn"
            />
          </button>
          <p className="page-number">
            {pageNumber || (numPages ? 1 : "__")}/{numPages || "__"}
          </p>
          <button
            type="button"
            className="page-controller-btn"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            <CiCircleChevRight
              title="Next Page"
              className="page-controller-btn"
            />
          </button>
        </div>
        <div className="pdf-icons-container">
          <MdZoomIn
            className="pdf-icons"
            title="zoom in"
            onClick={handleZoomIn}
          />
          <MdZoomOut
            className="pdf-icons"
            title="zoom out"
            onClick={handleZoomOut}
          />
          <input
            className="search-box"
            type="search"
            value={searchTerm}
            onChange={(e) => handleInputChange(e)}
            onKeyDown={handleEnterPress}
          />
        </div>
      </div>
      <div className="pdf-container">
        <Document
          file={pdfurl}
          onLoadSuccess={handleDocumentLoadSuccess}
          onLoadError={(error) =>
            console.log("error while loading pdf", error.message)
          }
        >
          <Page
            pageNumber={pageNumber}
            customTextRenderer={textRenderer}
            scale={scale}
            width={750}
          />
        </Document>
      </div>
    </div>
  );
}

export default PdfViewer;

// const searchPluginInstance=searchPlugin(
//   {
//     // Optional properties
//     enableShortcuts: true, // Enable keyboard shortcuts (Ctrl + F)
//     keyword: searchTerm, // Initial keyword to highlight
//     renderHighlights: (props) => {
//         // Customize the highlighted elements
//         // Example: return your custom highlighted components
//     },
//     onHighlightKeyword: (keyword) => {
//         // Invoked when a keyword is highlighted
//         // Example: perform additional actions
//     },
// }
// );

//handle searching and navigation
// const searchResults = useRef([]);
// const resultIndex = useRef(0);
// function searchPdf(pagesText, searchTerm) {
//   // Reset search results and result index
//   searchResults.current = [];
//   resultIndex.current = 0;

//   // Find all occurrences of the search term
//   for (let i = 0; i < pagesText.length; i++) {
//     if (pagesText[i].includes(searchTerm)) {
//       searchResults.current.push(i + 1);
//     }
//   }

//   // If no results, return
//   if (searchResults.current.length === 0) {
//     console.log('No matches found');
//     return;
//   }

//   // Go to the first result
//   goToNextResult();
// }

// function goToNextResult() {
//   setPageNumber(searchResults.current[resultIndex.current]);
//   resultIndex.current = (resultIndex.current + 1) % searchResults.current.length;
// }

// // Handle search and navigate on scroll
// useEffect(() => {
//   const handleScroll = (e) => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//       goToNextResult();
//     }
//   };

//   window.addEventListener('scroll', handleScroll);

//   return () => {
//     window.removeEventListener('scroll', handleScroll);
//   };
// }, [resultIndex]);
