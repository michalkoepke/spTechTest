import React, { useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        // error coming back from server
        throw Error("could not fetch the data from API");
      }

      return res.json();
    })

    .then((data) => {
      setIsPending(false);
      setData(data);
      setError(null);
    })

    .catch((err) => {
      setIsPending(false);
      setError(err.message);
    });
};

export default useFetch;
