import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PageIndex = () => {
	const [data, setData] = useState<string[] | null>(null);

	useEffect(() => {
    fetch(
      `https://paginatortest-b315.restdb.io/rest/pages`,
      {
        method: "GET",
        headers: {
          "cache-control": "no-cache",
          "x-apikey": "5fdf9250ff9d67063814078f",
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json.map((page: { _id: string }) => page._id));
      });
  }, []);

	return <div>
		{
			data?.map((id) => (
				<p key={id}>
					<Link to={`/${id}`}>{id}</Link>
				</p>

			))
		}
	</div>
}

export default PageIndex