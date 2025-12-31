import Image from "next/image";

export function Lead({ children }) {
  return <p className="blog-lead">{children}</p>;
}

export function Highlight({ children }) {
  return <blockquote className="blog-highlight">{children}</blockquote>;
}

export function BlogImage({ src, alt, caption }) {
  return (
    <figure className="blog-figure">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={450}
        className="blog-image"
        style={{ width: "100%", height: "auto" }}
      />
      {caption && <figcaption className="blog-caption">{caption}</figcaption>}
    </figure>
  );
}

export const mdxComponents = {
  Lead,
  Highlight,
  BlogImage,
  h2: (props) => <h2 {...props} />,
  h3: (props) => <h3 {...props} />,
  p: (props) => <p {...props} />,
  ul: (props) => <ul {...props} />,
  ol: (props) => <ol {...props} />,
  li: (props) => <li {...props} />,
  a: (props) => <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined} />,
  strong: (props) => <strong {...props} />,
  em: (props) => <em {...props} />,
  code: (props) => <code {...props} />,
  pre: (props) => <pre {...props} />,
};
