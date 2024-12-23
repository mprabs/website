import React from "react";
import { Helmet } from "react-helmet";

interface MetaProps {
  title?: string;
  description?: string;
  tags?: string[];
}

const Meta = ({ title, description, tags = [] }: MetaProps) => {
  const defaultDescription = "Prabin Acharya is a skilled FrontEnd ReactJs Web Developer with expertise in modern web applications.";
  const defaultTags = ["ReactJs", "FrontEnd Developer", "Web Development", "Prabin Acharya"];
  const defaultSiteName = "Prabin Acharya | Front End ReactJs Web Developer";
  const defaultUrl = "https://prabinacharya.com/";
  const defaultImage = "https://prabinacharya.com/prabin.jpg";
  const defaultLocale = "en_US";
  const defaultTitle = "Prabin Acharya";

  return (
    <Helmet>
      <title>{title || defaultTitle}</title>

      <meta name="description" content={description || defaultDescription} />

      <meta name="keywords" content={tags.length > 0 ? tags.join(", ") : defaultTags.join(", ")} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={defaultUrl} />
      <meta property="og:site_name" content={defaultSiteName} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:image:secure_url" content={defaultImage} />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="609" />
      <meta property="og:image:alt" content="Prabin Acharya || Front End ReactJs Web Developer" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:locale" content={defaultLocale} />
      <meta name="google-site-verification" content="b64d5UTnHlLVy3MGjJxdzumuGS_5RFSC9qcMULXkcaQ" />
      <meta name="ahrefs-site-verification" content="56686629cace23f931eac2cd4623b1061ba1f591f96436191664b48727f51986" />

      <link rel="canonical" href={defaultUrl} />
    </Helmet>
  );
};

export default Meta;
