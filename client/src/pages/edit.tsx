import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { Post } from './home';
import { getImageSrc } from '../utils/getImageSrc';
import { Spinner } from '../components/atoms/spinner/spinner';
import { useApiCall } from '../hooks/useApiCall';
import { Input } from '../components/atoms/input/input';
import { FileUpload } from '../components/molecule/fileUpload/fileUpload';
import { Textarea } from '../components/atoms/textarea/textarea';
import { Button } from '../components/atoms/button/button';
import { Box } from '../components/atoms/box/box';
import { UserContext } from '../App';

type FormData = {
  title: string,
  description: string,
  thumbnail?: File
};

const initialData: FormData = {
  title: '',
  description: '',
};

const Edit = () => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [thumbnailLink, setThumbnailLink] = useState('');
  const { slug } = useParams<{slug: string}>();
  const history = useHistory();
  const { loading, apiCall } = useApiCall();

  useEffect(() => {
    apiCall.get(`/posts/${slug}`).then((res) => {
      const { title, description, thumbnail } = res as Post;
      setThumbnailLink(getImageSrc(thumbnail));
      setFormData({ title, description });
    });
  }, []);


  const submitHandler = async () => {
    const formDataObj = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        return;
      }
      formDataObj.append(key, value);
    });

    apiCall.put(`/posts/${slug}/edit`, formDataObj)
      .then((res) => {
        toast('Blog Post has been updated', {
          type: 'success'
        });

        history.push('/');
      });
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <div className="row">
              <div className="col-xs-12">
                {loading ? <Spinner /> : (
                  <Box>
                    <form
                      className="w-100"
                      onSubmit={(e) => {
                        e.preventDefault();
                        submitHandler();
                      }}
                    >
                      <div className="row">
                        <div className="col-xs-12">
                          <Input
                            type="text"
                            label="Blog title"
                            placeholder="Title"
                            value={formData.title}
                            required={true}
                            onChange={(value) => {
                              setFormData({
                                ...formData,
                                title: value
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12">
                          <FileUpload
                            label="Cover Image"
                            imageSrc={thumbnailLink}
                            onChange={(file: File) => {
                              setFormData({ ...formData,
                                thumbnail: file
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="row margin-bottom--25">
                        <div className="col-xs-12">
                          <Textarea
                            type="text"
                            label="Blog description"
                            placeholder="Blog description"
                            value={formData.description}
                            required={true}
                            onChange={(value) => {
                              setFormData({
                                ...formData,
                                description: value
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
                              Create post
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </Box>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Edit;
