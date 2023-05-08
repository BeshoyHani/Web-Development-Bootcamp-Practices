export default function Contact({ title, img, alt, phoneNo, email }) {
    return (
        <div className="card">
            <div className="top">
                <h2 className="name">{title}</h2>
                <img className="card-img circle-img"
                    src={img}
                    alt={alt}
                />
            </div>
            <div className="bottom">
                <p>{phoneNo}</p>
                <p>{email}</p>
            </div>
        </div>
    );
}