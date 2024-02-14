export const sendToken = (res, user, message, status = 200) => {
  try{
    const token = user.getJWTToken();

  const options = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    sameSite: "none",
    httpOnly: true,
    secure: true,
  };

  res.cookie("token", token, options).json({
    success: true,
    message,
    user,
  });

  res.status(status);
  }catch(error){
    console.log(error);
  }
};
