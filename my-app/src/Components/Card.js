function Card(props) {
    return(
      <div className="Card d-flex row align-items-center">
        <div className="col-12 col-md-4">
            <img src={props.image} alt="" />
        </div>
        <div className="col-12 col-md-8 d-flex flex-column ps-md-4">
            <p className="name mt-2 mt-md-0">{props.name}</p>
            <p className="description mb-4">{props.description}</p>
            <div className="prices d-flex gap-3 gap-md-4">
                <p className="px-4 p-2">{props.price}</p>
                <p className="px-4 p-2">
                  {
                    props.loggedIn ? (
                      props.memberPrice
                    ) : (
                      <>Member price</>
                    )               
                  }
                </p>
            </div>  
        </div>
      </div>
    );
  }
export default Card;