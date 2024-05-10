import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/blog/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setBlog(res.data.blog); // Assuming the response data contains 'blog' property
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, [id]); // Adding 'id' to dependency array to fetch data when ID changes

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]); // Adding 'isAuthorized' and 'navigateTo' to dependency array

  return (
    <section className="blogDetail page">
      <div className="container">
        <h3>Blog Content</h3>
        <div className="banner">
          {Object.keys(blog).length > 0 ? (
            <>
              <p>
                Title: <span> {blog.title}</span>
              </p>
              <p>
                Content: <span>{blog.description}</span>
              </p>
              <p>
                Job Posted On: <span>{blog.techPostedOn}</span>
              </p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
