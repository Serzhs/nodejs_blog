import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export type Post = {
  _id: string,
  createdAt: string,
  title: string,
  slug: string,
  description: string,
  posterUrl: string,
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:8000/posts').then((res) => {
      setPosts(res.data);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (<h1>Loading...</h1>);
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
          {posts.map(({ _id, title, slug }) => {
            return  (
              <div key={_id} className="col-xs-4 mb-3">
                <div className="card p-3">
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
