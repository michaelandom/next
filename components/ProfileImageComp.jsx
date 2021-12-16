/* eslint-disable @next/next/no-img-element */
function ProfileImageComp({imageSrc,style}) {
    return (
        <img
          src={imageSrc}
           alt=""
          className={style ?? "h-11 w-11 rounded-full mr-4"}
        />
    )
}

export default ProfileImageComp
