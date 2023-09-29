export const auth = async () => {
  const token = await JSON.parse(localStorage.getItem("token"));
  console.log(token);
  if (!token) {
    return false;
  }

  try {
    // send token info
    const findUser = await fetch(
      "http://localhost:3002/api/user-routes/check-token",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    // if successful, proceed with useEffect
    if (findUser.status === 200) {
        return true 
    //   const userFirstName = await findUser.json();
    //   console.log(userFirstName);
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
