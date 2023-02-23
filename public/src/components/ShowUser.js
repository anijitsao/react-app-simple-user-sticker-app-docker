// render from the ShowUser component
export default ({ name, designation }) => {
  return (
    <article className="user-info">
      <section className="user-initials">
        <div className="initial-contents">{name.substr(0, 2)}</div>
      </section>
      <section className="user-name">
        {name}
        <div className="user-designation">{designation}</div>
      </section>
    </article>
  );
};
