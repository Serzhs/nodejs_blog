import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useApiCall } from '../hooks/useApiCall';
import { H1 } from '../components/atoms/typography/typography';
import { Box } from '../components/atoms/box/box';
import { Input } from '../components/atoms/input/input';
import { Textarea } from '../components/atoms/textarea/textarea';
import { Button } from '../components/atoms/button/button';
import { FileUpload } from '../components/molecule/fileUpload/fileUpload';

type FormData = {
  title: string,
  description: string,
  thumbnail?: File
};

const initialData: FormData = {
  title: '',
  description: '',
};

const Create = () => {
  const [formData, setFormData] = useState<FormData>({ ...initialData });
  const history = useHistory();
  const { loading, apiCall } = useApiCall();

  const submitHandler = () => {
    if (!formData.thumbnail) {
      toast('Cover image is requiered', {
        type: 'error'
      });
      return;
    }

    const formDataObj = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        return;
      }
      formDataObj.append(key, value);
    });

    apiCall.post('/posts/create', formDataObj)
      .then((res) => {
        toast('Blog Post has been created', {
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
                <H1>
                  Create Post
                </H1>
              </div>
            </div>

            <Box>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitHandler();
                }}
              >
                <div className="row margin-bottom--15">
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
                <div className="row margin-bottom--15">
                  <div className="col-xs-12">
                    <FileUpload
                      label="Cover Image"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Create;
