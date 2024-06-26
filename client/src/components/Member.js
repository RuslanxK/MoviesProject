import { useEffect, useState } from "react";
import { deleteItem, getAll } from "../utils";
import { useNavigate } from "react-router-dom";
import SubscriberWatched from "./SubscriberWatched";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../services";

const memberURL = `${baseUrl}/api/members`;
const subscriptionsURL = `${baseUrl}/api/subscriptions`;

function Member({ member, callback }) {
  const [subscriptions, setSubscriptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: subscriptions } = await getAll(subscriptionsURL);
      setSubscriptions(subscriptions);
    };

    fetchData();
  }, []);

  const deleteMember = async () => {
    const deletedMember = await deleteItem(memberURL, member._id);

    console.log(deletedMember.data);

    const foundSubscriptions = subscriptions.filter(
      (subscriber) => subscriber.memberid === member._id
    );

    if (foundSubscriptions) {
      foundSubscriptions.forEach((sub) => {
        const deletedData = deleteItem(subscriptionsURL, sub._id);
        console.log(deletedData.data);
      });
    }

    callback(true);
  };

  return (
    <div className="memberDiv">
      <div className="member-icons">
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => navigate(`/editmember/${member._id}`)}
          id="edit-icon"
        />

        <FontAwesomeIcon
          icon={faTrash}
          onClick={deleteMember}
          id="delete-icon"
        />
      </div>
      <br />
      <span>Name: {member.name}</span> <br />
      <span>Email : {member.email}</span>
      <br />
      <span>City: {member.city}</span>
      <SubscriberWatched member={member} />
    </div>
  );
}

export default Member;
