import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Posts = {
  createdAt: string,
  title: string,
  description: string,
  posterUrl: string,
};

const Home = () => {
  const [loading, setLoading] = useState<Posts>();
  const [posts, setPosts] = useState<Posts>();

  useEffect(() => {
    axios.get('http://localhost:8000/posts/').then((res) => {
      console.log(res);
    });
  }, []);


  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xs-3">
            Blog posts
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
