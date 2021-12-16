export const UserInfo = ({ userId, userInfo }) => {
  return (
    <>
      {userInfo
        .filter((val) => {
          if (val.id === Number(userId)) {
            return val;
          }
          return null;
        })
        .map((info) => {
          const {
            id,
            name,
            lastName,
            prefix,
            title,
            email,
            ip,
            jobArea,
            jobType,
            address,
            imageUrl,
            company,
          } = info;
          const { country, state, streetAddress, city, zipCode } = address;
          return (
            <div className="header" key={id}>
              <img src={`${imageUrl}/v=${id}`} alt={name} />
              <fieldset className="info-wrapper">
                <legend>Info</legend>
                <div className="user-identity">
                  <strong>
                    {prefix} {name} {lastName}
                  </strong>
                  <span>{title}</span>
                </div>
                <div className="user-detail-info">
                  <div className="user-detail">
                    <span className="detail-name">Email: </span>
                    {email}
                  </div>
                  <div className="user-detail">
                    <span className="detail-name">Ip Adress: </span>
                    {ip}
                  </div>
                  <div className="user-detail">
                    <span className="detail-name">Job Areal: </span>
                    {jobArea}
                  </div>
                  <div className="user-detail">
                    <span className="detail-name">Job Type: </span>
                    {jobType}
                  </div>
                </div>
              </fieldset>
              <fieldset className="adress-container">
                <legend>Adress</legend>
                <div className="company-name">
                  <strong>
                    {company.name} {company.suffix}
                  </strong>
                </div>
                <div className="user-detail">
                  <span className="detail-name">City: </span>
                  {city}
                </div>
                <div className="user-detail">
                  <span className="detail-name">Country: </span>
                  {country}
                </div>
                <div className="user-detail">
                  <span className="detail-name">State: </span>
                  {state}
                </div>
                <div className="user-detail">
                  <span className="detail-name">Street Adress: </span>
                  {streetAddress}
                </div>
                <div className="user-detail">
                  <span className="detail-name">Zip: </span>
                  {zipCode}
                </div>
              </fieldset>
            </div>
          );
        })}
    </>
  );
};
