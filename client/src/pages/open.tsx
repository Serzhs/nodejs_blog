import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { Post, Comment } from './home';
import { getImageSrc } from '../utils/getImageSrc';
import { useApiCall } from '../hooks/useApiCall';
import { Spinner } from '../components/atoms/spinner/spinner';
import { Image } from '../components/atoms/image/image';
import { H1, H2, H3, H4, P, Small } from '../components/atoms/typography/typography';
import { Divider } from '../components/atoms/divider/divider';
import { Box } from '../components/atoms/box/box';
import { Input } from '../components/atoms/input/input';
import { Textarea } from '../components/atoms/textarea/textarea';
import { Button } from '../components/atoms/button/button';
import { UserContext } from '../App';

type CommentInput = {
  author: string
  comment: string
};

const initialComment = {
  author: '',
  comment: ''
};

const initialPost = {
  _id: '',
  createdAt: '',
  title: '',
  slug: '',
  description: '',
  thumbnail: '',
  comments: []
};

const Open = () => {
  const [post, setPost] = useState<Post>(initialPost);
  const [commentInput, setCommentInput] = useState<CommentInput>({ ...initialComment });
  const history = useHistory();
  const { loading, apiCall } = useApiCall();
  const { slug } = useParams<{slug: string}>();

  const user = useContext(UserContext);

  useEffect(() => {
    apiCall.get(`/posts/${slug}`).then((res) => {
      setPost(res as Post);
    }).catch(() => {
      history.push('/404');
    });
  }, []);

  const addCommentHandler = () => {
    apiCall.post(`/comments/${slug}/create`, commentInput).then((res) => {
      post.comments.push(res as Comment);

      setPost({ ...post });

      setCommentInput({ ...initialComment });
    });
  };

  const { title, thumbnail, createdAt, description, comments } = post;

  const formatDate = (date: string) => {
    return date && format(new Date(date), 'yyyy-MM-dd');
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div className="row">
                  <div className="col-xs-12 end-xs">
                    <Small>
                      {formatDate(createdAt)}
                    </Small>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <H1>
                      {title}
                    </H1>
                    <div className="margin-bottom--15">
                      <Image
                        w={4}
                        h={2}
                        src={getImageSrc(thumbnail)}
                        alt={title}
                      />
                    </div>
                    <P>
                      {description}
                    </P>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <Divider />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <H3>
                      Comments
                    </H3>
                  </div>
                </div>
                <div className="row margin-bottom--15">
                  {comments.map(({
                    comment, author, _id, createdAt: commentTime
                  }) => {
                    return (
                      <div key={_id} className="col-xs-12 margin-bottom--10">
                        <Box small={true}>
                          <div className="row">
                            <div className="col-xs-8">
                              <H4>{author}</H4>
                            </div>
                            <div className="col-xs-4 end-xs">
                              <Small>
                                {formatDate(commentTime)}
                              </Small>
                            </div>
                            <div className="col-xs-12">
                              <Small>{comment}</Small>
                            </div>
                          </div>
                        </Box>
                      </div>
                    );
                  })}
                </div>
                {user?.user && (
                <div className="row">
                  <div className="col-xs-12">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        addCommentHandler();
                      }}
                    >
                      <div className="row">
                        <div className="col-xs-12">
                          <H3>Add comment</H3>
                        </div>
                      </div>
                      <div className="row margin-bottom--15">
                        <div className="col-xs-12">
                          <Input
                            type="text"
                            label="Username"
                            placeholder="Your name"
                            value={commentInput.author}
                            required={true}
                            maxLength={30}
                            onChange={(value) => {
                              setCommentInput({
                                ...commentInput,
                                author: value
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="row margin-bottom--25">
                        <div className="col-xs-12">
                          <Textarea
                            type="text"
                            label="Your comment"
                            placeholder="Your comment"
                            value={commentInput.comment}
                            required={true}
                            onChange={(value) => {
                              setCommentInput({
                                ...commentInput,
                                comment: value
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12">
                          <div>
                            <Button
                              type="submit"
                              disabled={loading}
                            >
                              Add Comment
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Open;
