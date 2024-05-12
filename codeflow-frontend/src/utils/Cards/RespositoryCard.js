const RepositoryCard = ({
  projectName,
  lastUpdated,
  numCollaborators,
  creationDate,
  onClick,
}) => {
  const formattedCreationDate = creationDate.split("T")[0];

  return (
    <div
      className="p-4 rounded-xl border mt-4 m-auto cursor-pointer w-9/12"
      onClick={onClick}
    >
      <div>
        <h1 className="text-4xl">{projectName}</h1>
      </div>
      <div className="flex justify-around mt-4">
        <p>Created Date: {formattedCreationDate}</p>
        <p>Last Updated: {lastUpdated ? <>{lastUpdated}</> : <>None</>}</p>
        <p>Number of Collaborators: {numCollaborators}</p>
      </div>
    </div>
  );
};

export default RepositoryCard;
