const CloseIconElement = ({onMyClick}) => {
    return(
        <a className="user__form-button" onClick={onMyClick} title="Limpiar búsqueda">
            <svg viewBox="0 0 24 24" width={24} height={24}>
                <path
                    fill="#8696a0"
                    d="M17.25 7.8 16.2 6.75l-4.2 4.2-4.2-4.2L6.75 7.8l4.2 4.2-4.2 4.2 1.05 1.05 4.2-4.2 4.2 4.2 1.05-1.05-4.2-4.2 4.2-4.2z"
                />
            </svg>
        </a>
    )
}

export { CloseIconElement }