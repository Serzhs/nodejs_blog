import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Post } from './home';

const Open = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post>();
  const history = useHistory();

  const { slug } = useParams<{slug: string}>();

  useEffect(() => {
    axios.get(`http://localhost:8000/posts/${slug}`).then((res) => {
      setPost(res.data as Post);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const deleteHandler = () => {
    axios.delete(`http://localhost:8000/posts/delete/${slug}`).then(() => {
      toast('Blog has been deleted', {
        type: 'success'
      });
      history.push('/');
    });
  };


  if (loading) {
    return (<h1>Loading...</h1>);
  }

  if (!post) {
    history.push('/404');
    return <></>;
  }

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 center-xs">
            <h1 className="mb-5">
              {post.title}
            </h1>
            <div className="mb-5">
              <p>
                {post.description}
              </p>
              <h4>
                {post.createdAt}
              </h4>
            </div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteHandler}
            >
              Delete post
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Open;
