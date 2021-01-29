import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { Post } from './home';
import { getImageSrc } from '../utils/getImageSrc';

type FormData = {
  title: string,
  description: string,
  thumbnail?: File
};

const Edit = () => {
  const [formData, setFormData] = useState<FormData>();
  const [thumbnailLink, setThumbnailLink] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{slug: string}>();
  const history = useHistory();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOST}/posts/${slug}`).then((res) => {
      const { title, description, thumbnail } = res.data as Post;
      setThumbnailLink(getImageSrc(thumbnail));
      setFormData({ title, description });
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

  if (!formData) {
    history.push('/404');
    return <></>;
  }

  const submitHandler = async () => {
    const formDataObj = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        return;
      }
      formDataObj.append(key, value);
    });

    axios.put(`${process.env.REACT_APP_HOST}/posts/${slug}/edit`, formDataObj)
      .then((res) => {
        toast('Blog Post has been updated', {
          type: 'success'
        });

        history.push('/');
      }).catch(() => {
        toast('Unexpected error', {
          type: 'error'
        });
      });
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <div className="row">
              <div className="col-xs-12">
                <form
                  className="w-100"
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitHandler();
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="name" className="w-100">Title
                      <input
                        className="form-control"
                        id="name"
                        placeholder="Blog title"
                        required={true}
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description" className="w-100">Title
                      <textarea
                        className="form-control"
                        id="description"
                        placeholder="Blog description"
                        required={true}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="thumbnail">
                      Upload Thumbnail
                      <br /><br />
                      <input
                        type="file"
                        className="form-control-file"
                        id="thumbnail"
                        onChange={(e) => {

                          if (!e.target.files) {
                            return;
                          }
                          setThumbnailLink(window.URL.createObjectURL(e.target.files[0]));

                          setFormData({ ...formData,
                            thumbnail: e.target.files[0]
                          });
                        }}
                      />
                    </label>
                    <img src={thumbnailLink} alt="" className="w-100 mb-4" />
                  </div>
                  <button type="submit" className="btn btn-warning">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Edit;
