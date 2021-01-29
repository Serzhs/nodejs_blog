import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const deletePost = async (slug: string) => {
    setLoading(true);
    await axios.delete(`${process.env.REACT_APP_HOST}/posts/${slug}/delete`).then(() => {
      toast('Blog has been deleted', {
        type: 'success'
      });
      history.push('/');
    }).finally(() => {
      setLoading(false);
    });
  };

  return [deletePost, loading] as const;
};
