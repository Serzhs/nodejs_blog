import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getImageSrc } from '../utils/getImageSrc';
import { Spinner } from '../components/atoms/spinner/spinner';
import { Card } from '../components/molecule/card/card';
import { useApiCall } from '../hooks/useApiCall';
import { H1 } from '../components/atoms/typography/typography';

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
  const [posts, setPosts] = useState<Post[]>([]);
  const { loading, apiCall } = useApiCall();

  const history = useHistory();

  useEffect(() => {
    apiCall.get('/posts').then((res) => {
      setPosts(res as Post[]);
    });
  }, []);

  const deleteHandler = (slug: string) => {
    apiCall.delete(`/posts/${slug}/delete`);

    const postClone = [...posts].filter((item) => {
      return slug !== item.slug;
    });

    setPosts(postClone);
  };

  return (
    <section>
      <div className="container">
        <div className="row margin-bottom--15">
          <div className="col-xs-12 center-xs">
            <H1>
              Janis Blog
            </H1>
          </div>
        </div>
        <div className="row">
          {loading && (
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
