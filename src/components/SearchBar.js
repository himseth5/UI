import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

const SearchBar = ({ setSearchQuery }) => (
<form className="search-bar" >
    <Typography
      variant="h7"
      // noWrap  
      sx={{ mr: 2,  display: { xs: "none", md: "flex" } }}
    >
      Search
    </Typography>
    <TextField
      id="document"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value, "document");
      }}
      label="Enter a document name"
      variant="outlined"
      placeholder="Search..."
      size="small"
    
    />

    <TextField
      id="timestamp"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value,"time");
      }}
      // label="Enter a timestamp"
      variant="outlined"
      placeholder="Search..."
      size="small"
      type="Date"
    />
    <TextField
      id="Review"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value, "review");
      }}
      label="Enter Review Status"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
  </form>
);
    

export default SearchBar;
