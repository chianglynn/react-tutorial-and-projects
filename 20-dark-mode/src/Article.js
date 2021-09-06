import React, { useState } from 'react';
import moment from 'moment';

const Article = ({ title, date, length, snippet }) => {
  return (
    <article className="post">
      <h2>{title}</h2>
      <div className="post-info">
        <span>{moment(date).format('MMMM Do YYYY')}</span>
        <span>{length} mins read</span>
        <span>{snippet}</span>
      </div>
    </article>
  );
};

export default Article;