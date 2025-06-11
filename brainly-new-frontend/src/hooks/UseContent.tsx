import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

// ✅ Define content type
interface ContentType {
  _id: string;
  title: string;
  link: string;
  type: string;
}

function UseContent(): [
  ContentType[],
  () => void,
  (contentId: string) => Promise<void>
] {
  const [contents, setContents] = useState<ContentType[]>([]);

  function refresh() {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem('token') || '',
        },
      })
      .then((response) => {
        setContents(response.data.content);
      });
  }

  async function deleteContent(contentId: string) {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`, {
        headers: {
          Authorization: localStorage.getItem('token') || '',
        },
      });
      setContents((prev) =>
        prev.filter((content) => content._id !== contentId)
      );
    } catch (error) {
      console.error('Delete error:', error);
    }
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  return [contents, refresh, deleteContent];
}

export default UseContent;
