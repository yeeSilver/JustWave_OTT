import React from "react";
import { useLocation } from "react-router-dom";

export default function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get;
  return <div>Search</div>;
}
