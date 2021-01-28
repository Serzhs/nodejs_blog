import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { Post } from './home';
import { getImageSrc } from '../utils/getImageSrc';

const Open = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post>();
  const history = useHistory();

  const { slug } = useParams<{slug: string}>();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOST}/posts/${slug}`).then((res) => {
      setPost(res.data as Post);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const deleteHandler = () => {
    axios.delete(`${process.env.REACT_APP_HOST}/posts/delete/${slug}`).then(() => {
      toast('Blog has been deleted', {
        type: 'success'
      });
      history.push('/');
    });
  };

  const addCommentHandler = () => {
    axios.post(`${process.env.REACT_APP_HOST}/comments/${slug}/create`, {
      author: 'Arčis',
      comment: 'Lorem Ipsum'
    }).then((res) => {
      // setComments([
      //   ...comments,
      //   res.data as Comment
      // ]);
    });
  };


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

  if (!post) {
    history.push('/404');
    return <></>;
  }

  const { title, thumbnail, createdAt, description, comments } = post;

  const formatedDate = format(new Date(createdAt), 'yyyy-MM-dd');

  return (
    <section>
      <div className="container">
        <div className="row mb-4">
          <div className="col-xs-6 col-xs-offset-3 center-xs">
            <img
              src={getImageSrc(thumbnail)}
              alt=""
              className="w-100"
            />
            <h1 className="mb-5">
              {title}
            </h1>
            <div className="mb-5">
              <p>
                {description}
              </p>
            </div>
            <div className="d-flex center-xs middle-xs">
              <h6 className="mr-3">
                Added on {formatedDate}
              </h6>
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
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <h4>
              Comments
            </h4>
            {comments.map(({ comment, author, _id }) => {
              return (
                <div
                  key={_id}
                  className="shadow-none p-3 mb-5 bg-light rounded"
                >
                  <h6>{author}</h6>
                  <p>{comment}</p>
                </div>
              );
            })}
            <button
              type="button"
              onClick={addCommentHandler}
              className="btn btn-warning"
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Open;
