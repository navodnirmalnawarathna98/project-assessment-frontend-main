import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/blog/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setBlogs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>Weakly Technology Blogs</h1>
        <div className="banner">
          {blogs.blogs &&
            blogs.blogs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <Link to={`/blog/${element._id}`}>Read More...</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
