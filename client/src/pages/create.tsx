import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const initialData = {
  title: '',
  description: '',
  thumbnail: ''
};

const Create = () => {
  const [formData, setFormData] = useState({ ...initialData });

  const submitHandler = async () => {
    const formDataObj = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    axios.post('http://localhost:8000/posts/create', formDataObj)
      .then((res) => {
        toast('Blog Post has been created', {
          type: 'success'
        });
        setFormData({ ...initialData });
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
            <h1>
              Create Post
            </h1>
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
                  <input
                    type="file"
                    className="form-control-file"
                    id="thumbnail"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  />
                </label>
              </div>
              <button type="submit" className="btn btn-warning">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Create;
