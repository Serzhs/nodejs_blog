import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import { getImageSrc } from '../utils/getImageSrc';
import { Spinner } from '../components/atoms/spinner/spinner';
import { Card } from '../components/molecule/card/card';
import { useDeletePost } from '../hooks/useDeletePost';

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
  const [deletePost, deletePostLoading] = useDeletePost();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOST}/posts`).then((res) => {
      setPosts(res.data);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const deleteHandler = (slug: string) => {
    deletePost(slug);
    const postClone = [...posts].filter((item) => {
      return slug !== item.slug;
    });

    setPosts(postClone);

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
          {loading || deletePostLoading && (
          <div className="col-xs-12 center-xs">
            <Spinner />
          </div>
          )}
          {posts.map(({ _id, title, slug, thumbnail }) => {
            return  (
              <div
                key={_id}
                className="col-xs-3"
              >
                <Card
                  title={title}
                  imgSrc={getImageSrc(thumbnail)}
                  onReadMore={() => history.push(`/post/${slug}`)}
                  onEditClick={() => history.push(`/edit/${slug}`)}
                  onDeleteClick={() => deleteHandler(slug)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
