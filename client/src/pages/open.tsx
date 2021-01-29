import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { Post, Comment } from './home';
import { getImageSrc } from '../utils/getImageSrc';

type CommentInput = {
  author: string
  comment: string
};

const initialComment = {
  author: '',
  comment: ''
};

const Open = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post>();
  const [commentInput, setCommentInput] = useState<CommentInput>({ ...initialComment });
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
    axios.delete(`${process.env.REACT_APP_HOST}/posts/${slug}/delete`).then(() => {
      toast('Blog has been deleted', {
        type: 'success'
      });
      history.push('/');
    });
  };

  const addCommentHandler = () => {
    axios.post(`${process.env.REACT_APP_HOST}/comments/${slug}/create`, commentInput)
      .then((res) => {
        if (!post) {
          return;
        }

        post.comments.push(res.data as Comment);

        setPost({ ...post });

        setCommentInput({ ...initialComment });
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
    // history.push('/404');
    return <></>;
  }

  const { title, thumbnail, createdAt, description, comments } = post;

  const formatedDate = format(new Date(createdAt), 'yyyy-MM-dd');

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3 end-xs">
            <button
              type="button"
              className="btn btn-dark mb-4"
              onClick={() => history.push(`/edit/${slug}`)}
            >
              Edit
            </button>
          </div>
        </div>
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
          </div>
        </div>
        <div className="row">
          {comments.map(({ comment, author, _id }) => {
            return (
              <div
                key={_id}
                className="shadow-none p-3 mb-5 bg-light rounded col-xs-6 col-xs-offset-3"
              >
                <h6>{author}</h6>
                <p>{comment}</p>
              </div>
            );
          })}
        </div>
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addCommentHandler();
              }}
            >
              <h4>Add comment</h4>
              <label htmlFor="author" className="form-group mb-4 w-100">
                Name
                <input
                  type="text"
                  id="author"
                  className="form-control"
                  placeholder="You name"
                  value={commentInput.author}
                  required={true}
                  onChange={(e) => {
                    setCommentInput({
                      ...commentInput,
                      author: e.target.value
                    });
                  }}
                />
              </label>
              <label htmlFor="message" className="form-group w-100 mb-4">
                <textarea
                  name="message"
                  id="message"
                  placeholder="You comment"
                  className="form-control"
                  value={commentInput.comment}
                  required={true}
                  onChange={(e) => {
                    setCommentInput({
                      ...commentInput,
                      comment: e.target.value
                    });
                  }}
                />
              </label>
              <button
                type="submit"
                className="btn btn-warning"
              >
                Add Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Open;
