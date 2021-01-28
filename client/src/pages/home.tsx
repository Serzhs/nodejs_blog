import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getImageSrc } from '../utils/getImageSrc';


export type Comment = {
  _id: string,
  author: string,
  comment: string,
  createdAt: string,
};

export type Post = {
  _id: string,
  createdAt: string,
  title: string,
  slug: string,
  description: string,
  thumbnail: string,
  comments: Comment[]
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const history = useHistory();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOST}/posts`).then((res) => {
      setPosts(res.data);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 center-xs">
              <h1>Loading...</h1>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const blogOpenHandler = (slug: string) => {
    history.push(`/post/${slug}`);
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 center-xs">
            <h1 className="mb-5">
              Blog posts
            </h1>
          </div>
        </div>
        <div className="row">
          {posts.map(({ _id, title, slug, thumbnail }) => {
            return  (
              <div key={_id} className="col-xs-4 mb-3">
                <div className="card p-3">
                  <img
                    src={getImageSrc(thumbnail)}
                    alt=""
                    width="100%"
                  />
                  <h2>
                    {title}
                  </h2>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => blogOpenHandler(slug)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
