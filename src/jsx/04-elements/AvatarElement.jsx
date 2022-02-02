const AvatarElement = ({name, title=''}) => {
    return(
        <div className="avatar" title={title}>
            <div className="avatar__img" >{name?.charAt(0)}</div>
        </div>
    )
}

export { AvatarElement }